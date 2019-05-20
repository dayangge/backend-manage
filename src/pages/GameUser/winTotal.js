import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, Button, Badge, Input, Modal, DatePicker, Table } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './userManage.less';
import TableForm from '../Forms/TableForm';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ gameManage, loading }) => ({
  gameManage,
  loading: loading.models.gameManage,
}))
@Form.create()
class winTotal extends PureComponent {
  state = {
    selectedRows: [],
    tableHeader: '今天',
    tableQuery: 'today',
    isShowMemberWinInfoModel: false,
  };

  columns = [
    {
      title: '玩家账号',
      dataIndex: 'userAccount',
    },
    {
      title: '玩家昵称',
      dataIndex: 'userNickname',
    },
    {
      title: '总输赢',
      dataIndex: 'winTotal',
    },
    {
      title: '最后登录时间',
      dataIndex: 'loginTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '查看详情',
      dataIndex: 'status',
      render: (text, record) => (
        <Fragment>
          <a
            onClick={() => {
              this.showMemberWinInfo(text, record);
            }}
          >
            查看详细信息
          </a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gameManage/fetchWin',
    });
  }

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { tableQuery } = this.state;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      query: tableQuery,
    };

    dispatch({
      type: 'gameManage/fetchWin',
      payload: params,
    });
  };
  /* 点击加载用户输赢详细信息 */

  showMemberWinInfo = (text, record) => {
    const { dispatch } = this.props;
    const { userID } = record;
    const params = {
      userID,
    };
    dispatch({
      type: 'gameManage/fetchWinDetail',
      payload: params,
    });
    this.setState({
      isShowMemberWinInfoModel: true,
    });
  };

  /* 重置所有表单 */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      tableHeader: '今天',
      tableQuery: 'today',
    });
    dispatch({
      type: 'gameManage/fetchWin',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      dispatch({
        type: 'gameManage/search',
        payload: values,
      });
    });
  };

  /* 一系列对于表格的操作 */

  handleQueryWinTotal = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableHeader: text,
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'gameManage/fetchWin',
      payload: { query },
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="查询方式">{getFieldDecorator('loginTime')(<RangePicker />)}</FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="用户名称">
              {getFieldDecorator('name')(<Input placeholder="请输入玩家账号" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderOperationForm() {
    const { tableHeader } = this.state;
    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={24} sm={24}>
          <span style={{ marginRight: 10, fontWeight: 'bold' }}>当前表格：{tableHeader}</span>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryWinTotal(e, 'today')}
          >
            今天
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryWinTotal(e, 'yesterday')}
          >
            昨天
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryWinTotal(e, 'week')}
          >
            本周
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryWinTotal(e, 'lastWeek')}
          >
            上周
          </Button>
        </Col>
      </Row>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      gameManage: { winData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper title="总输赢管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>{this.renderOperationForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={winData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <Modal
          title="查看输赢详情"
          visible={this.state.isShowMemberWinInfoModel} // eslint-disable-line
          width={800}
          onOk={() => {
            this.setState({
              isShowMemberWinInfoModel: false,
            });
          }}
          onCancel={() => {
            this.setState({
              isShowMemberWinInfoModel: false,
            });
          }}
        >
          <ShowMemberWinInfo />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default winTotal;

@connect(({ gameManage, loading }) => ({
  gameManage,
  loading: loading.models.gameManage,
}))
class ShowMemberWinInfo extends PureComponent {
  state = {
    pagination: {},
  };

  componentDidMount() {}

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });

    const query = {
      currentPage: pagination.current,
    };

    dispatch({
      type: 'gameManage/fetchWin',
      payload: query,
    });
  };

  render() {
    const columns = [
      {
        title: '玩家账号',
        dataIndex: 'userAccount',
      },
      {
        title: '玩家昵称',
        dataIndex: 'userNickname',
      },
      {
        title: '总输赢',
        dataIndex: 'winTotal',
      },
      {
        title: '游戏',
        dataIndex: 'game',
      },
      {
        title: '最后登录时间',
        dataIndex: 'loginTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];
    const {
      gameManage: { memberWinDetail },
    } = this.props;
    const { pagination } = this.state;
    return (
      <Fragment>
        {memberWinDetail ? (
          <Table
            columns={columns}
            dataSource={memberWinDetail.list}
            pagination={pagination}
            onChange={this.handleTableChange}
          />
        ) : (
          'loading'
        )}
      </Fragment>
    );
  }
}

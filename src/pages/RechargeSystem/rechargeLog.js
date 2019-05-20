import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, InputNumber, Button, Input, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './recharge.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const changeType = ['注册赠送', '输赢', '签到赠送'];
const queryMode = ['按用户账号', '按推广人', '按代理人', '按订单号', '按游戏ID'];

/* eslint react/no-multi-comp:0 */
@connect(({ userInfo, loading }) => ({
  userInfo,
  loading: loading.models.userInfo,
}))
@Form.create()
class rechargeLog extends PureComponent {
  state = {
    selectedRows: [],
    tableHeader: '今天',
    tableQuery: 'today',
    pagination: {},
  };

  columns = [
    {
      title: '下注记录',
      dataIndex: 'log',
    },
    {
      title: '充值时间',
      dataIndex: 'time1',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '服务类型',
      dataIndex: 'type',
      render(val) {
        return <span>{changeType[val]}</span>;
      },
    },
    {
      title: '用户账号',
      dataIndex: 'account',
    },
    {
      title: '充值代理账号',
      dataIndex: 'proxyAccount',
    },
    {
      title: '代理人',
      dataIndex: 'agent',
    },
    {
      title: '推广人',
      dataIndex: 'Promoter',
    },
    {
      title: '游戏ID',
      dataIndex: 'gameID',
    },
    {
      title: '订单号码',
      dataIndex: 'code',
    },
    {
      title: '订单金额',
      dataIndex: 'cost',
    },
    {
      title: '实际金额',
      dataIndex: 'cost1',
    },
    {
      title: '充值金币',
      dataIndex: 'gold',
    },
    {
      title: '充值前金币',
      dataIndex: 'gold1',
    },
    {
      title: '充值地址',
      dataIndex: 'ip',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetchUserRechargeLog',
    });
  }

  handleStandardTableChange = page => {
    const { dispatch } = this.props;
    const { tableQuery } = this.state;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
      query: tableQuery,
    };

    dispatch({
      type: 'userInfo/fetchUserRechargeLog',
      payload: params,
      callback: response => {
        const { pagination } = response;
        this.setState({
          pagination,
        });
      },
    });
  };
  /* 点击加载用户输赢详细信息 */

  /* 重置所有表单 */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      tableHeader: '今天',
      tableQuery: 'today',
    });
    dispatch({
      type: 'userInfo/fetchUserRechargeLog',
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
        type: 'userInfo/search',
        payload: values,
      });
    });
  };

  /* 一系列对于表格的操作 */

  handleQueryrechargeLog = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableHeader: text,
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetchUserRechargeLog',
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
          <Col md={8} sm={24}>
            <FormItem label="查询日期">{getFieldDecorator('date')(<RangePicker />)}</FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="查询方式" labelCol={{ sm: 6 }} wrapperCol={{ sm: 16 }}>
              {getFieldDecorator('mode')(
                <Select placeholder="选择查询方式" style={{ width: '100%' }}>
                  {queryMode.map(value => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="查询">
              {getFieldDecorator('gameCoinChange')(<Input placehold="清输入" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
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
            onClick={e => this.handleQueryrechargeLog(e, 'today')}
          >
            今天
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryrechargeLog(e, 'yesterday')}
          >
            昨天
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryrechargeLog(e, 'week')}
          >
            本周
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryrechargeLog(e, 'lastWeek')}
          >
            上周
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryrechargeLog(e, 'mouth')}
          >
            本月
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryrechargeLog(e, 'lastMouth')}
          >
            上月
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
      userInfo: { userRechargeLogData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const dataSource = userRechargeLogData.list;

    return (
      <PageHeaderWrapper title="查询充值记录">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <Table
              selectedRows={selectedRows}
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              pagination={this.state.pagination}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default rechargeLog;

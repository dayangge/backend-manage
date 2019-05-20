import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, Button, Badge, message, Modal } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './userManage.less';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['权停', '开启'];
const gameList = [
  '游戏',
  '大厅',
  '炸金花',
  '看牌牛牛',
  '通比牛牛',
  '百人牛牛',
  '中发白',
  '百人牌九',
  '百家乐',
  '龙凤斗',
  '不洗牌斗地主',
  '红黑大战',
  '水果拉霸',
  '李逵',
  '蛟龙出海',
  '时时彩',
];

/* eslint react/no-multi-comp:0 */
@connect(({ gameManage, loading }) => ({
  gameManage,
  loading: loading.models.gameManage,
}))
@Form.create()
class holdLineManage extends PureComponent {
  state = {
    selectedRows: [],
  };

  columns = [
    {
      title: '玩家ID',
      dataIndex: 'userID',
    },
    {
      title: '玩家账号',
      dataIndex: 'userAccount',
    },
    {
      title: '携带金币',
      dataIndex: 'gold',
      render: val => <Fragment>{`${val}个`}</Fragment>,
    },
    {
      title: '银行金币',
      dataIndex: 'bankGold',
      render: val => <Fragment>{`${val}个`}</Fragment>,
    },
    {
      title: '总输赢',
      dataIndex: 'winTotal',
    },
    {
      title: '所在游戏',
      dataIndex: 'inGame',
    },
    {
      title: '所在房间',
      dataIndex: 'inRoom',
    },
    {
      title: '最后登录IP',
      dataIndex: 'lastLoginAddress',
    },
    {
      title: 'IP归属地',
      dataIndex: 'address',
    },
    {
      title: '最后登录时间',
      dataIndex: 'loginTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '游戏时长',
      dataIndex: 'gameTime',
    },

    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gameManage/fetchHoldLineManage',
    });
  }

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'gameManage/fetchHoldLineManage',
      payload: params,
    });
  };

  /* 重置所有表单 */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'gameManage/fetchHoldLineManage',
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

  handleCancelHoldLine = () => {
    const { selectedRows } = this.state;
    const self = this;
    const words = [];
    if (selectedRows.length <= 0) {
      message.warning('请至少选择一项');
      return;
    }
    selectedRows.map(val => words.push(val.key));
    const params = {
      words,
    };
    const ui = words.join(',');
    confirm({
      title: '清除卡线',
      content: `你要删除${ui}？`,
      onOk() {
        self.handleDelete(params);
      },
      onCancel() {},
    });
  };

  handleDelete = params => {
    this.setState({
      selectedRows: [],
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
            <FormItem label="查询方式">
              {getFieldDecorator('name')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">玩家ID</Option>
                  <Option value="1">玩家账号</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="所在游戏">
              {getFieldDecorator('inGame')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {gameList.map(value => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              )}
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
    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={24} sm={24}>
          <Button icon="check-circle" type="primary" onClick={() => this.handleCancelHoldLine()}>
            清除卡线
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
      gameManage: { holdLineManageData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper title="卡线管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>{this.renderOperationForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={holdLineManageData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default holdLineManage;

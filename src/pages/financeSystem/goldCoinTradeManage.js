import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, InputNumber, Button, Input, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import router from 'umi/router';
import styles from './index.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const changeType = ['注册赠送', '输赢', '签到赠送'];

/* eslint react/no-multi-comp:0 */
@connect(({ financeGoldCoinTradeManage, userInfo, pervUrl, loading }) => ({
  financeGoldCoinTradeManage,
  userInfo,
  pervUrl,
  loading: loading.models.financeGoldCoinTradeManage,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    tableHeader: '今天',
    tableQuery: 'today',
    pagination: {},
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '卖家账号',
      dataIndex: 'userAccount',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '订单编号',
      dataIndex: 'orderNumber',
    },
    {
      title: '交易金币',
      dataIndex: 'tradeGold',
    },
    {
      title: '应付卖家',
      dataIndex: 'game',
    },
    {
      title: '游戏房间',
      dataIndex: 'roomName',
    },
    {
      title: '卡号',
      dataIndex: 'card',
    },
    {
      title: '提款姓名',
      dataIndex: 'Withdrawal',
    },
    {
      title: '申请时间',
      dataIndex: 'replayTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '交易状态',
      dataIndex: 'status',
    },
    {
      title: '收款信息',
      dataIndex: 'receiptInfo',
    },
    {
      title: '总充值',
      dataIndex: 'totalRecharge',
    },
    {
      title: '总提现',
      dataIndex: 'totalWithdrawal',
    },
    {
      title: '流水',
      dataIndex: 'bill',
    },
    {
      title: '任务奖励',
      dataIndex: 'taskGift',
    },
    {
      title: '管理操作',
      dataIndex: 'operation',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financeGoldCoinTradeManage/fetchLog',
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
      type: 'financeGoldCoinTradeManage/fetchLog',
      payload: params,
      callback: response => {
        const { pagination } = response;
        this.setState({
          pagination,
        });
      },
    });
  };

  /* 点击跳转 */
  previewItem = id => {
    const { dispatch, match } = this.props;
    const url = match.path;
    dispatch({
      type: 'pervUrl/saveUrl',
      payload: url,
    });
    dispatch({
      type: 'userInfo/saveID',
      payload: id,
    });
    router.push(`/userDetail/basicInfo`);
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
      type: 'financeGoldCoinTradeManage/fetchLog',
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
        type: 'financeGoldCoinTradeManage/search',
        payload: values,
      });
    });
  };

  /* 一系列对于表格的操作 */

  handleQueryGameLog = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableHeader: text,
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'financeGoldCoinTradeManage/fetchLog',
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
          <Col md={4} sm={24}>
            <FormItem label="用户查询">
              {getFieldDecorator('userAccount')(<Input placehold="请输入账号" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="所在房间">
              {getFieldDecorator('roomName')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {changeType.map(value => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="查询日期">{getFieldDecorator('logData')(<RangePicker />)}</FormItem>
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
            onClick={e => this.handleQueryGameLog(e, 'today')}
          >
            今天
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryGameLog(e, 'yesterday')}
          >
            昨天
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryGameLog(e, 'week')}
          >
            本周
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryGameLog(e, 'lastWeek')}
          >
            上周
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryGameLog(e, 'mouth')}
          >
            本月
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryGameLog(e, 'lastMouth')}
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
      financeGoldCoinTradeManage: { logData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const dataSource = logData.list;

    return (
      <PageHeaderWrapper title="金币交易管理">
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
            <div className="tableListOperator">{this.renderOperationForm()}</div>
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

export default Manage;

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
@connect(({ order, serviceLog, loading }) => ({
  order,
  serviceLog,
  loading: loading.models.order,
}))
@Form.create()
class orderLog extends PureComponent {
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
      title: '订单号码',
      dataIndex: 'code',
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
      title: '游戏ID',
      dataIndex: 'gameID',
    },
    {
      title: '上级代理',
      dataIndex: 'agent',
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
      title: '订单状态',
      dataIndex: 'task',
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
      type: 'order/fetchOrderLog',
    });
    dispatch({
      type: 'serviceLog/fetchRechargeService',
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
      type: 'order/fetchOrderLog',
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
      type: 'order/fetchOrderLog',
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

  handleQueryLog = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableHeader: text,
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'order/fetchOrderLog',
      payload: { query },
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
      serviceLog: { rechargeServiceData },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="查询日期">{getFieldDecorator('date')(<RangePicker />)}</FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="查询服务方式 " labelCol={{ sm: 6 }} wrapperCol={{ sm: 16 }}>
              {getFieldDecorator('modes')(
                <Select placeholder="查询服务方式" style={{ width: '100%' }}>
                  {rechargeServiceData.map(value => (
                    <Option key={value.id} value={value.id}>
                      {value.type}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
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
          <Button icon="check-circle" type="primary" onClick={e => this.handleQueryLog(e, 'today')}>
            今天
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryLog(e, 'yesterday')}
          >
            昨天
          </Button>
          <Button icon="check-circle" type="primary" onClick={e => this.handleQueryLog(e, 'week')}>
            本周
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryLog(e, 'lastWeek')}
          >
            上周
          </Button>
          <Button icon="check-circle" type="primary" onClick={e => this.handleQueryLog(e, 'mouth')}>
            本月
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryLog(e, 'lastMouth')}
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
      order: { orderLogData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const dataSource = orderLogData.list;

    return (
      <PageHeaderWrapper title="订单管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>{this.renderOperationForm()}</div>
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

export default orderLog;

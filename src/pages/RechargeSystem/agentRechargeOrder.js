import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Button, Input, Table, DatePicker, Select } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './recharge.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */
@connect(({ agentRecharge, loading }) => ({
  agentRecharge,
  loading: loading.models.agentRecharge,
}))
@Form.create()
class AgentRechargeOrder extends PureComponent {
  state = {
    selectedRows: [],
    pagination: {},
  };

  columns = [
    {
      title: '订单号',
      dataIndex: 'gameID',
    },
    {
      title: '充值金额',
      dataIndex: 'cost',
    },
    {
      title: '玩家ID',
      dataIndex: 'userID',
    },
    {
      title: '玩家账号',
      dataIndex: 'account',
    },
    {
      title: '代理账号',
      dataIndex: 'agent',
    },
    {
      title: '充值时间',
      dataIndex: 'time',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'agentRecharge/fetchAgentRecharge',
    });
  }

  handleStandardTableChange = page => {
    const { dispatch } = this.props;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
    };
    dispatch({
      type: 'agentRecharge/fetchAgentRecharge',
      payload: params,
      callback: response => {
        const { pagination } = response;
        this.setState({
          pagination,
        });
      },
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
        type: 'agentRecharge/fetchAgentRecharge',
        payload: values,
      });
    });
  };

  /* 一系列对于表格的操作 */

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="充值时间查询">{getFieldDecorator('time')(<RangePicker />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="输入查询">
              {getFieldDecorator('text')(<Input placeholder="请输入关键字" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="查询条件">
              {getFieldDecorator('query')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">订单号</Option>
                  <Option value="2">玩家ID</Option>
                  <Option value="3">代理账号</Option>
                  <Option value="4">玩家账号</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      agentRecharge: { agentRechargeData },
    } = this.props;
    const { selectedRows } = this.state;
    const dataSource = agentRechargeData.list;
    return (
      <PageHeaderWrapper title="代理充值订单">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              selectedRows={selectedRows}
              dataSource={dataSource}
              columns={this.columns}
              pagination={this.state.pagination}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AgentRechargeOrder;

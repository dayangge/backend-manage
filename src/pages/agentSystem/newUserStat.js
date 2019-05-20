import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Button, Input, DatePicker, Select } from 'antd';
import ETable from '@/components/Etable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

/* eslint react/no-multi-comp:0 */
@connect(({ agentSystemNewUser, loading }) => ({
  agentSystemNewUser,
  loading: loading.models.aagentSystemNewUser,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
  };

  columns = [
    {
      title: '代理号',
      dataIndex: 'account',
    },
    {
      title: '日期',
      dataIndex: 'time1',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '新用户数',
      dataIndex: 'newUser',
    },
    {
      title: '充值人数',
      dataIndex: 'rechargeNum',
    },
    {
      title: '首冲金额',
      dataIndex: 'firstRecharge',
    },
    {
      title: '充值次数',
      dataIndex: 'rechargeTimes',
    },
    {
      title: '充值总额',
      dataIndex: 'rechargeTotal',
    },
    {
      title: '提现总额',
      dataIndex: 'withdrawalTotal',
    },
    {
      title: '线下充值总额',
      dataIndex: 'offline',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'agentSystemNewUser/fetch',
    });
  }

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };
    dispatch({
      type: 'agentSystemNewUser/fetch',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  /* 保存行 */
  selectRow = (text, record) => {
    this.setState({
      row: record,
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
        type: 'agentSystemNewUser/fetch',
        payload: values,
      });
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
            <FormItem label="查询条件">
              {getFieldDecorator('userAccount')(<Input placeholder="请输入账号" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="日期查询">{getFieldDecorator('logData')(<RangePicker />)}</FormItem>
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

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      agentSystemNewUser: { userData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <PageHeaderWrapper title="新玩家统计">
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
            <ETable
              selectedRows={selectedRows}
              loading={loading}
              data={userData}
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

export default Manage;

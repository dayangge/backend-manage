import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Button, Input, DatePicker, Select } from 'antd';
import ETable from '@/components/Etable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

const FormItem = Form.Item;
const { MonthPicker } = DatePicker;

/* eslint react/no-multi-comp:0 */
@connect(({ agentSystemRechargeReport, pervUrl, agentID, loading }) => ({
  agentSystemRechargeReport,
  pervUrl,
  agentID,
  loading: loading.models.agentSystemRechargeReport,
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
      title: '时间',
      dataIndex: 'time1',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '在线总充值',
      dataIndex: 'recharge',
    },
    {
      title: '代理可见总充值',
      dataIndex: 'num',
    },
    {
      title: '充值汇率',
      dataIndex: 'rate',
    },
    {
      title: '充值手续费',
      dataIndex: 'rechargeFee',
    },
    {
      title: '实际充值',
      dataIndex: 'actual',
    },
    {
      title: '总提现',
      dataIndex: 'withdrawal',
    },
    {
      title: '单笔手续费',
      dataIndex: 'singleFee',
    },
    {
      title: '提现次数',
      dataIndex: 'withdrawalTimes',
    },
    {
      title: '提现手续费',
      dataIndex: 'withdrawalFee',
    },
    {
      title: '实际提现',
      dataIndex: 'actualWithdrawal',
    },
    {
      title: '实际收入',
      dataIndex: 'income',
    },
    {
      title: '线下总充值',
      dataIndex: 'offline',
    },
    {
      title: '代理可见线下总充值',
      dataIndex: 'agentVis',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'agentSystemRechargeReport/fetch',
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
      type: 'agentSystemRechargeReport/fetch',
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
        type: 'agentSystemRechargeReport/fetch',
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
            <FormItem label="代理号">
              {getFieldDecorator('userAccount')(<Input placehold="请输入账号" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="查询时间">{getFieldDecorator('logData')(<MonthPicker />)}</FormItem>
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
      agentSystemRechargeReport: { reportData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <PageHeaderWrapper title="充值报表">
        <Card bordered={false}>
          <div className="tableBox">
            <Row className={styles.box}>
              <Col className={styles.prompt}>
                提示：报表数据 <span className={styles.warningText}>不含今日</span>
              </Col>
              <Col>
                计算公式：充值手续费=总充值*充值汇率{' '}
                <span className={styles.redText}>实际充值=总充值-充值手续费</span>
                提现手续费=单笔手续费*提现次数{' '}
                <span className={styles.redText}>实际提现=总提现+提现手续费</span>
                实际收入=实际充值-实际提现
                <span className={styles.redText}>提成=实际收入*提成比例</span>
              </Col>
            </Row>
            <div className="tableBoxForm">{this.renderForm()}</div>
            <ETable
              selectedRows={selectedRows}
              loading={loading}
              data={reportData}
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

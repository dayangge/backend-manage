import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Button, Input, DatePicker, Select } from 'antd';
import ETable from '@/components/Etable';
import SearchButton from '@/components/SearchButton';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';
import { ROOM_CODE } from '../../utils/constant';

const { Option } = Select;
const FormItem = Form.Item;

const { RangePicker } = DatePicker;

/* eslint react/no-multi-comp:0 */
@connect(({ pushSystemPushWithdrawal, loading }) => ({
  pushSystemPushWithdrawal,
  loading: loading.models.pushSystemPushWithdrawal,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
    tableQuery: 'today',
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '订单编号',
      dataIndex: 'account',
    },
    {
      title: '推广ID',
      dataIndex: 'gameID',
    },
    {
      title: '推广账号',
      dataIndex: 'withdrawal',
    },
    {
      title: '提现金额',
      dataIndex: 'cost',
    },
    {
      title: '手续费',
      dataIndex: 'fee',
    },
    {
      title: '实际金额',
      dataIndex: 'actual',
    },
    {
      title: '银行名称',
      dataIndex: 'bankName',
    },
    {
      title: '银行卡号',
      dataIndex: 'card',
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
    },
    {
      title: '申请时间',
      dataIndex: 'time',
    },
    {
      title: '交易状态',
      dataIndex: 'status',
    },
    {
      title: '收款信息',
      dataIndex: 'info',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'pushSystemPushWithdrawal/fetch',
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
      type: 'pushSystemPushWithdrawal/fetch',
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

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'pushSystemPushWithdrawal/fetch',
      payload: {},
    });
  };

  handleQuery = (e, query) => {
    const { dispatch } = this.props;
    this.setState({
      tableQuery: query,
    });
    dispatch({
      type: 'pushSystemPushWithdrawal/fetch',
      payload: { query },
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
        type: 'pushSystemPushWithdrawal/fetch',
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
            <FormItem label="推广员查询">
              {getFieldDecorator('userAccount')(<Input placehold="请输入用户" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="日期查询">{getFieldDecorator('us')(<RangePicker />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="交易类型">
              {getFieldDecorator('u')(
                <Select>
                  <Option key={0} value={0}>
                    所有类型
                  </Option>
                  <Option key={1} value={1}>
                    等待付款
                  </Option>
                  <Option key={2} value={2}>
                    拒绝交易
                  </Option>
                  <Option key={3} value={3}>
                    交易成功
                  </Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                刷新
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
      pushSystemPushWithdrawal: { pushWithdrawalData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <PageHeaderWrapper title="推广提现管理">
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
            <SearchButton handleQueryLog={this.handleQuery} />
            <ETable
              selectedRows={selectedRows}
              loading={loading}
              data={pushWithdrawalData}
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

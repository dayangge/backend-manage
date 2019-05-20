import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Button, Input, DatePicker, Select } from 'antd';
import ETable from '@/components/Etable';
import SearchButton from '@/components/SearchButton';
import styles from './index.less';
import { ROOM_CODE } from '../../utils/constant';

const { Option } = Select;
const FormItem = Form.Item;

const { RangePicker } = DatePicker;

/* eslint react/no-multi-comp:0 */
@connect(({ agentDetailSubWithdrawal, pervUrl, agentID, loading }) => ({
  agentDetailSubWithdrawal,
  pervUrl,
  agentID,
  loading: loading.models.agentDetailSubWithdrawal,
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
      title: '订单号',
      dataIndex: 'game',
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
      title: '提现金额',
      dataIndex: 'withdrawal',
    },
    {
      title: '手续费',
      dataIndex: 'tax',
    },
    {
      title: '实际支付',
      dataIndex: 'gold',
    },
  ];

  componentDidMount() {
    const { dispatch, agentID } = this.props;
    const { id } = agentID;
    dispatch({
      type: 'agentDetailSubWithdrawal/fetch',
      payload: { id },
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
      type: 'agentDetailSubWithdrawal/fetch',
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
      type: 'agentDetailSubWithdrawal/fetch',
      payload: {},
    });
  };

  handleQuery = (e, query) => {
    const { dispatch } = this.props;
    this.setState({
      tableQuery: query,
    });
    dispatch({
      type: 'agentDetailSubWithdrawal/fetch',
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
        type: 'agentDetailSubWithdrawal/fetch',
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
            <FormItem label="用户查询">
              {getFieldDecorator('userAccount')(<Input placehold="请输入用户" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="日期查询">
              {getFieldDecorator('userAccount')(<RangePicker />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="查询方式">
              {getFieldDecorator('userAccount')(
                <Select>
                  <Option key={0} value={0}>
                    按用户账号
                  </Option>
                  <Option key={1} value={1}>
                    按游戏ID
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
      agentDetailSubWithdrawal: { subWithdrawalData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <Fragment>
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
            <SearchButton handleQueryLog={this.handleQuery} />
            <ETable
              selectedRows={selectedRows}
              loading={loading}
              data={subWithdrawalData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </Fragment>
    );
  }
}

export default Manage;

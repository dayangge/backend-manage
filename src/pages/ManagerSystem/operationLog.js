import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, InputNumber, Button, Input, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const changeType = ['登录', '新增单控', '修改绑定手机', '修改玩家详细信息'];

/* eslint react/no-multi-comp:0 */
@connect(({ managerOperationLog, loading }) => ({
  managerOperationLog,
  loading: loading.models.managerOperationLog,
}))
@Form.create()
class Log extends PureComponent {
  state = {
    selectedRows: [],
    tableQuery: 'today',
    pagination: {},
  };

  columns = [
    {
      title: '操作时间',
      dataIndex: 'time',
    },
    {
      title: '操作IP',
      dataIndex: 'ip',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '被操作人',
      dataIndex: 'new',
    },
    {
      title: '操作信息',
      dataIndex: 'info',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'managerOperationLog/fetchOperationLogList',
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
      type: 'managerOperationLog/fetchOperationLogList',
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
      tableQuery: 'today',
    });
    dispatch({
      type: 'managerOperationLog/fetchOperationLogList',
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
        type: 'givingLog/search',
        payload: values,
      });
    });
  };

  /* 一系列对于表格的操作 */

  handleQuerygivingLog = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'managerOperationLog/fetchOperationLogList',
      payload: { query },
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row className={styles.ManageTableList}>
          <Col md={4} sm={24}>
            <FormItem label="操作人">
              {getFieldDecorator('userAccount')(<Input placehold="请输入登录名" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('type')(
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
          <Col md={4} sm={24}>
            <FormItem label="ip地址">
              {getFieldDecorator('gameCoinChange')(<Input placehold="输入ip" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="查询日期">{getFieldDecorator('logData')(<RangePicker />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span>
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
      managerOperationLog: { operationLogListData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const dataSource = operationLogListData.list;

    return (
      <PageHeaderWrapper title="管理员操作日志">
        <Card bordered={false}>
          <div>{this.renderForm()}</div>
          <Table
            selectedRows={selectedRows}
            loading={loading}
            dataSource={dataSource}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handleStandardTableChange}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Log;

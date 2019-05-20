import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, InputNumber, Button, Input, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './userManage.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const changeType = ['注册赠送', '输赢', '签到赠送'];

/* eslint react/no-multi-comp:0 */
@connect(({ goldCoinLog, loading }) => ({
  goldCoinLog,
  loading: loading.models.goldCoinLog,
}))
@Form.create()
class goldCoinLog extends PureComponent {
  state = {
    selectedRows: [],
    tableHeader: '今天',
    tableQuery: 'today',
    pagination: {},
  };

  columns = [
    {
      title: '玩家账号',
      dataIndex: 'userAccount',
    },
    {
      title: '变化前携带的金币',
      dataIndex: 'takeGoldCoin',
    },
    {
      title: '变化前银行金币',
      dataIndex: 'bankGoldCoin',
    },
    {
      title: '金币变化数',
      dataIndex: 'goldCoinAmount',
    },
    {
      title: '变化类型',
      dataIndex: 'changeType',
      filters: [
        {
          text: changeType[0],
          value: 0,
        },
        {
          text: changeType[1],
          value: 1,
        },
        {
          text: changeType[2],
          value: 2,
        },
      ],
      render(val) {
        return <span>{changeType[val]}</span>;
      },
    },
    {
      title: '记录时间',
      dataIndex: 'logTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '记录IP',
      dataIndex: 'logIP',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'goldCoinLog/fetchGoldCoinLog',
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
      type: 'goldCoinLog/fetchGoldCoinLog',
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
      type: 'goldCoinLog/fetchGoldCoinLog',
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
        type: 'goldCoinLog/search',
        payload: values,
      });
    });
  };

  /* 一系列对于表格的操作 */

  handleQueryGoldCoinLog = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableHeader: text,
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'goldCoinLog/fetchGoldCoinLog',
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
            <FormItem label="玩家账号">
              {getFieldDecorator('userAccount')(<Input placehold="请输入账号" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="玩家账号">
              {getFieldDecorator('userAccount')(
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
            <FormItem label="金币变化大于">
              {getFieldDecorator('gameCoinChange')(<InputNumber placehold="输入数字" />)}
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
            onClick={e => this.handleQueryGoldCoinLog(e, 'today')}
          >
            今天
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryGoldCoinLog(e, 'yesterday')}
          >
            昨天
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryGoldCoinLog(e, 'week')}
          >
            本周
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryGoldCoinLog(e, 'lastWeek')}
          >
            上周
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryGoldCoinLog(e, 'mouth')}
          >
            本月
          </Button>
          <Button
            icon="check-circle"
            type="primary"
            onClick={e => this.handleQueryGoldCoinLog(e, 'lastMouth')}
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
      goldCoinLog: { goldCoinLogData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const dataSource = goldCoinLogData.list;

    return (
      <PageHeaderWrapper title="金币记录">
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

export default goldCoinLog;

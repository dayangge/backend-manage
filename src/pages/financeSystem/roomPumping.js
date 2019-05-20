import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, Button, Input, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import router from 'umi/router';
import styles from './index.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const changeType = ['所有状态', '等待付款', '拒绝交易', '交易完成'];

/* eslint react/no-multi-comp:0 */
@connect(({ financePlayerPumping, userInfo, pervUrl, loading }) => ({
  financePlayerPumping,
  userInfo,
  pervUrl,
  loading: loading.models.financePlayerPumping,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    pagination: {},
  };

  columns = [
    {
      title: '游戏房间',
      dataIndex: 'room',
    },
    {
      title: '玩家数量',
      dataIndex: 'number',
    },
    {
      title: '抽水金额',
      dataIndex: 'cost',
    },
    {
      title: '抽水详情',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financePlayerPumping/fetch',
    });
  }

  handleStandardTableChange = page => {
    const { dispatch } = this.props;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
    };

    dispatch({
      type: 'financePlayerPumping/fetch',
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
    dispatch({
      type: 'financePlayerPumping/fetch',
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
        type: 'financePlayerPumping/search',
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
          <Col md={4} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('userAccount')(<Input placehold="请输入账号" />)}
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

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      financePlayerPumping: { playerPumpingData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const dataSource = playerPumpingData.list;

    return (
      <PageHeaderWrapper title="玩家游戏抽水">
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
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

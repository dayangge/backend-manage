import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Button, Input, DatePicker } from 'antd';
import ETable from '@/components/Etable';
import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

/* eslint react/no-multi-comp:0 */
@connect(({ agentDetailSubPlayer, pervUrl, agentID, loading }) => ({
  agentDetailSubPlayer,
  pervUrl,
  agentID,
  loading: loading.models.agentDetailSubPlayer,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '玩家账号',
      dataIndex: 'account',
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
    },
    {
      title: '所属代理',
      dataIndex: 'affiliated',
    },
    {
      title: '账户金币',
      dataIndex: 'gold',
    },
    {
      title: '游戏时长',
      dataIndex: 'gameTime',
    },
    {
      title: '注册日期',
      dataIndex: 'time1',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '登录日期',
      dataIndex: 'time2',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '登录IP',
      dataIndex: 'ip',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
  ];

  componentDidMount() {
    const { dispatch, agentID } = this.props;
    const { id } = agentID;
    dispatch({
      type: 'agentDetailSubPlayer/fetch',
      payload: { id },
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
      type: 'agentDetailSubPlayer/fetch',
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
      type: 'agentDetailSubPlayer/fetch',
      payload: {},
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
        type: 'agentDetailSubPlayer/fetch',
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
            <FormItem label="代理账号">
              {getFieldDecorator('userAccount')(<Input placehold="请输入代理账号" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="注册时间">
              {getFieldDecorator('userAccount')(<RangePicker />)}
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
      agentDetailSubPlayer: { subPlayerData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <Fragment>
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
            <ETable
              selectedRows={selectedRows}
              loading={loading}
              data={subPlayerData}
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

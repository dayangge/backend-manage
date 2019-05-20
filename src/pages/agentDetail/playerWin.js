import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, Input, DatePicker, Badge, Button } from 'antd';
import ETable from '@/components/Etable';
import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const status = ['输', '赢'];
const statusMap = ['default', 'processing', 'success', 'error'];

/* eslint react/no-multi-comp:0 */
@connect(({ agentDetailWin, pervUrl, agentID, loading }) => ({
  agentDetailWin,
  pervUrl,
  agentID,
  loading: loading.models.agentDetailWin,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
  };

  columns = [
    {
      title: '玩家账号',
      dataIndex: 'account',
    },
    {
      title: '玩家昵称',
      dataIndex: 'nickname',
    },
    {
      title: '代理',
      dataIndex: 'agent',
    },
    {
      title: '总输赢',
      dataIndex: 'win',
    },
    {
      title: '统计时间',
      dataIndex: 'time',
    },
    {
      title: '输赢详情',
      dataIndex: 'status',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
  ];

  componentDidMount() {
    const { dispatch, agentID } = this.props;
    const { id } = agentID;
    dispatch({
      type: 'agentDetailWin/fetch',
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
      type: 'agentDetailWin/fetch',
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
      type: 'agentDetailWin/fetch',
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
        type: 'agentDetailWin/fetch',
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
              {getFieldDecorator('userAccount')(<Input placehold="请输入玩家账号" />)}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="时间查询">{getFieldDecorator('time')(<RangePicker />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="查询方式">
              {getFieldDecorator('code')(
                <Select>
                  <Option value={0} key={0}>
                    按下级代理人
                  </Option>
                  <Option value={1} key={1}>
                    按用户账号
                  </Option>
                  <Option value={2} key={2}>
                    按玩家昵称
                  </Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span>
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
      agentDetailWin: { winData },
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
              data={winData}
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

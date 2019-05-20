import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  Modal,
  Badge,
  message,
} from 'antd';
import ETable from '@/components/Etable';
import SearchButton from '@/components/SearchButton';
import styles from './index.less';
import { SERVICE_SHARE_INFO } from '../../utils/constant';

const { Option } = Select;
const FormItem = Form.Item;

const { RangePicker } = DatePicker;
const ButtonGroup = Button.Group;

/* eslint react/no-multi-comp:0 */
@connect(({ agentDetailSubRecharge, pervUrl, agentID, loading }) => ({
  agentDetailSubRecharge,
  pervUrl,
  agentID,
  loading: loading.models.agentDetailSubRecharge,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
  };

  columns = [
    {
      title: '订单号',
      dataIndex: 'key',
    },
    {
      title: '充值时间',
      dataIndex: 'time',
    },
    {
      title: '服务类型',
      dataIndex: 'type',
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
      title: '充值金额',
      dataIndex: 'cost',
    },
    {
      title: '充值汇率',
      dataIndex: 'rate',
    },
    {
      title: '实际收款',
      dataIndex: 'Receipt',
    },
    {
      title: '代理是否可见',
      dataIndex: 'status',
    },
  ];

  componentDidMount() {
    const { dispatch, agentID } = this.props;
    const { id } = agentID;
    dispatch({
      type: 'agentDetailSubRecharge/fetch',
      payload: { id },
    });
  }

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { tableQuery } = this.state;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
      query: tableQuery,
    };

    dispatch({
      type: 'agentDetailSubRecharge/fetch',
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
      type: 'agentDetailSubRecharge/fetch',
      payload: {},
    });
  };

  /*  /!* 查询不同时间表格 *!/
  handleQueryLog = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableHeader: text,
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'agentDetailSubRecharge/fetch',
      payload: { query },
    });
  };*/

  handleQuery = (e, query) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'agentDetailSubRecharge/fetch',
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
        type: 'agentDetailSubRecharge/fetch',
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
            <FormItem label="充值渠道">
              {getFieldDecorator('userAccount')(
                <Select>
                  {SERVICE_SHARE_INFO.map(val => (
                    <Option key={val.id} value={val.id}>
                      {val.name}
                    </Option>
                  ))}
                </Select>
              )}
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
                  <Option key={2} value={2}>
                    按订单号
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
      agentDetailSubRecharge: { subRechargeData },
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
              data={subRechargeData}
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

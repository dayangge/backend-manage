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
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;

const { RangePicker } = DatePicker;
const changeType = [
  { id: 0, name: '全部' },
  { id: 1, name: '运营商修改' },
  { id: 2, name: '游戏抽水' },
  { id: 3, name: '上级代理为我充值' },
  { id: 4, name: '为下级代理充值' },
  { id: 5, name: '申请结算扣金币' },
  { id: 6, name: '结算被拒返金币' },
  { id: 7, name: '为玩家充值' },
  { id: 8, name: '减少代理金币' },
  { id: 9, name: '减少玩家金币' },
  { id: 10, name: '上级代理减少金币' },
  { id: 11, name: '代理春节活动' },
  { id: 12, name: '代理下级代理活动' },
  { id: 13, name: '代理玩家活动' },
  { id: 14, name: '双向抽水' },
  { id: 15, name: '充值代理给玩家订单充值' },
];

/* eslint react/no-multi-comp:0 */
@connect(({ agentDetailGoldChange, pervUrl, agentID, loading }) => ({
  agentDetailGoldChange,
  pervUrl,
  agentID,
  loading: loading.models.agentDetailGoldChange,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '变化类型',
      dataIndex: 'type',
    },
    {
      title: '金币变化',
      dataIndex: 'gold',
    },
    {
      title: '金币变化前',
      dataIndex: 'tax',
    },
    {
      title: '金币变化后',
      dataIndex: 'round',
    },
    {
      title: '被操作账号',
      dataIndex: 'account',
    },
    {
      title: '日期',
      dataIndex: 'time1',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  componentDidMount() {
    const { dispatch, agentID } = this.props;
    const { id } = agentID;
    dispatch({
      type: 'agentDetailGoldChange/fetch',
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
      type: 'agentDetailGoldChange/fetch',
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
      type: 'agentDetailGoldChange/fetch',
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
        type: 'agentDetailGoldChange/fetch',
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
            <FormItem label="代理账号">
              {getFieldDecorator('userAccount')(
                <Select>
                  {changeType.map(val => (
                    <Option value={val.id}>{val.name}</Option>
                  ))}
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
      agentDetailGoldChange: { goldChangeData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <Fragment>
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
            <p>符合条件的金币变化总额：0金币</p>
            <ETable
              selectedRows={selectedRows}
              loading={loading}
              data={goldChangeData}
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

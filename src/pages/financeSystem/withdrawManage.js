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
  Badge,
  Modal,
  message,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const status = ['禁用', '开启'];

const statusMap = ['default', 'processing', 'success', 'error'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ financeWithdrawalManage, bankName, loading }) => ({
  financeWithdrawalManage,
  bankName,
  loading: loading.models.financeWithdrawalManage,
}))
@Form.create()
class Log extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
    isShowWithdrawalModel: false,
  };

  columns = [
    {
      title: '订单号',
      dataIndex: 'key',
    },
    {
      title: '流水号',
      dataIndex: 'game',
    },
    {
      title: '真实姓名',
      dataIndex: 'name',
    },
    {
      title: '银行名称',
      dataIndex: 'bank',
    },
    {
      title: '银行卡号',
      dataIndex: 'card',
    },
    {
      title: '开户行地址',
      dataIndex: 'address',
    },
    {
      title: '提现金额',
      dataIndex: 'cost',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
    },
    {
      title: '操作ip',
      dataIndex: 'operationIP',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '录入时间',
      dataIndex: 'newTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bankName/fetchBankName',
    });
    dispatch({
      type: 'financeWithdrawalManage/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'financeWithdrawalManage/fetch',
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

  deleteItem = () => {
    const { row } = this.state;
    console.log(row);
  };

  showWithdrawalModel = (text, record) => {
    this.setState({
      isShowWithdrawalModel: true,
    });
  };

  showAddSuper = () => {
    this.setState({
      isShowAddSuperModel: true,
    });
  };

  sendWithdrawal = () => {
    const data = this.withdrawalInfo.props.form.getFieldsValue();
    console.log(data);
  };

  sendAddSuper = () => {
    const data = this.addSuper.props.form.getFieldsValue();
    console.log(data);
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
        type: 'financeWithdrawalManage/fetch',
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
            <FormItem label="查询用户">{getFieldDecorator('name')(<Input />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderOperationForm() {
    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginBottom: 16 }}>
        <Col md={3} sm={24}>
          <Button icon="plus" type="primary" onClick={() => this.showAddSuper()}>
            提现卡配置
          </Button>
        </Col>
        <Col md={3} sm={24}>
          <Button icon="plus" type="primary" onClick={() => this.showWithdrawalModel()}>
            提现
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
      financeWithdrawalManage: { withdrawalManageData },
      bankName: { bankNameData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <PageHeaderWrapper title="提现管理">
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
            {this.renderOperationForm()}
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={withdrawalManageData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          destroyOnClose
          title="提现"
          visible={this.state.isShowWithdrawalModel} // eslint-disable-line
          onOk={() => {
            this.setState({
              isShowWithdrawalModel: false,
            });
            this.sendWithdrawal();
          }}
          onCancel={() => {
            this.setState({
              isShowWithdrawalModel: false,
            });
          }}
        >
          <Withdrawal
            wrappedComponentRef={inst => (this.withdrawalInfo = inst)}
            selectedItem={row}
          />
        </Modal>

        <Modal
          destroyOnClose
          title="添加"
          visible={this.state.isShowAddSuperModel} // eslint-disable-line
          onOk={() => {
            this.setState({
              isShowAddSuperModel: false,
            });
            this.sendAddSuper();
          }}
          onCancel={() => {
            this.setState({
              isShowAddSuperModel: false,
            });
          }}
        >
          <AddSuper wrappedComponentRef={inst => (this.addSuper = inst)} bank={bankNameData} />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Log;

@connect(({ websiteRuleManage, loading }) => ({
  websiteRuleManage,
  loading: loading.models.websiteRuleManage,
}))
@Form.create()
class AddSuper extends PureComponent {
  state = {};

  render() {
    const { form, bank } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="真实姓名" {...formItemLayout}>
            {getFieldDecorator('game', {})(<Input />)}
          </FormItem>
          <FormItem label="银行名称" {...formItemLayout}>
            {getFieldDecorator('gameDesc', {})(
              <Select>
                {bank.map(val => (
                  <Option value={val.id}>{val.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="银行卡号" {...formItemLayout}>
            {getFieldDecorator('ruleDesc', {})(<Input />)}
          </FormItem>
          <FormItem label="银行所在省" {...formItemLayout}>
            {getFieldDecorator('levelDesc', {})(<Input />)}
          </FormItem>
          <FormItem label="银行所在市" {...formItemLayout}>
            {getFieldDecorator('bankIn', {})(<Input />)}
          </FormItem>
          <FormItem label="开户行地址" {...formItemLayout}>
            {getFieldDecorator('bankAddress', {})(<TextArea />)}
          </FormItem>
          <FormItem label="禁用状态" {...formItemLayout}>
            {getFieldDecorator('status', {})(
              <RadioGroup>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>可用</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

@Form.create()
class Withdrawal extends PureComponent {
  state = {};

  render() {
    const { form, bank } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="优付平台" {...formItemLayout}>
            {getFieldDecorator('plat', {})(
              <Select>
                <Option value="1">天下付</Option>
                <Option value="2">45</Option>
                <Option value="3">优米付</Option>
                <Option value="4">如一</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="银行卡号" {...formItemLayout}>
            {getFieldDecorator('gameDesc', {})(
              <Select>
                <Option value={1}>1111111111</Option>
                <Option value={2}>2222222222</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="真实姓名" {...formItemLayout}>
            {getFieldDecorator('realName', {})(<Input />)}
          </FormItem>
          <FormItem label="银行名称" {...formItemLayout}>
            {getFieldDecorator('bankName', {})(<Input />)}
          </FormItem>
          <FormItem label="银行所在省" {...formItemLayout}>
            {getFieldDecorator('bankPv', {})(<Input />)}
          </FormItem>
          <FormItem label="银行所在市" {...formItemLayout}>
            {getFieldDecorator('bankIn', {})(<Input />)}
          </FormItem>
          <FormItem label="开户行地址" {...formItemLayout}>
            {getFieldDecorator('bankAddress', {})(<TextArea />)}
          </FormItem>
          <FormItem label="提现金额" {...formItemLayout}>
            {getFieldDecorator('dash', {})(<Input />)}
          </FormItem>
          <FormItem label="短信验证码" {...formItemLayout}>
            {getFieldDecorator('code', {})(<Input />)}
          </FormItem>
          <Button type="primary">获取验证码</Button>
        </Form>
      </div>
    );
  }
}

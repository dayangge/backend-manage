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
  Table,
  DatePicker,
  Select,
  Badge,
  Modal,
  message,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const { TextArea } = Input;

const status = ['禁用', '开启'];
const statusMap = ['default', 'processing', 'success', 'error'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ agentSystemAgentCheck, loading }) => ({
  agentSystemAgentCheck,
  loading: loading.models.agentSystemAgentCheck,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
    isShowModifyModel: false,
  };

  columns = [
    {
      title: '玩家ID',
      dataIndex: 'key',
    },
    {
      title: '玩家账号',
      dataIndex: 'account',
    },
    {
      title: '代理号',
      dataIndex: 'code',
    },
    {
      title: '代理名称',
      dataIndex: 'name',
    },
    {
      title: '支付宝',
      dataIndex: 'alipay',
    },
    {
      title: '微信',
      dataIndex: 'weixin',
    },
    {
      title: 'QQ',
      dataIndex: 'qq',
    },
    {
      title: '说明',
      dataIndex: 'info',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '申请时间',
      dataIndex: 'time1',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '处理时间',
      dataIndex: 'time1',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '处理人',
      dataIndex: 'operator',
    },
    {
      title: '操作',
      dataIndex: 'edit',
      render: (val, record, text) => {
        return (
          <Fragment>
            <Button
              type="primary"
              onClick={() => {
                this.showModifyInfo(text, record);
              }}
            >
              更新
            </Button>
          </Fragment>
        );
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'agentSystemAgentCheck/fetch',
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
      type: 'agentSystemAgentCheck/fetch',
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

  showModifyInfo = (text, record) => {
    this.setState({
      row: record,
      isShowModifyModel: true,
    });
  };

  showAddSuper = () => {
    this.setState({
      isShowAddSuperModel: true,
    });
  };

  cancelSuper = () => {
    const { selectedRows } = this.state;
    const self = this;
    const words = [];
    if (selectedRows.length <= 0) {
      message.warning('请至少选择一项');
      return;
    }
    selectedRows.map(val => words.push(val.cost));
    const params = {
      words,
    };
    const ui = words.join(',');
    confirm({
      title: '删除服务器',
      content: `你要删除${ui}？`,
      onOk() {
        self.handleDelete(params);
      },
      onCancel() {},
    });
  };

  handleDelete = params => {
    this.setState({
      selectedRows: [],
    });
  };

  sendModify = () => {
    const data = this.modifyInfo.props.form.getFieldsValue();
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
        type: 'agentSystemAgentCheck/fetch',
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
        <Row>
          <Col span={4}>
            <FormItem label="查询用户">{getFieldDecorator('name')(<Input />)}</FormItem>
          </Col>
          <Col span={4}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
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
            新赠
          </Button>
        </Col>
        <Col md={3} sm={24}>
          <Button icon="edit" type="primary" onClick={() => this.cancelSuper()}>
            删除
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
      agentSystemAgentCheck: { checkData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <PageHeaderWrapper title="代理审核管理">
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
            {this.renderOperationForm()}
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={checkData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          destroyOnClose
          title="修改"
          visible={this.state.isShowModifyModel} // eslint-disable-line
          onOk={() => {
            this.setState({
              isShowModifyModel: false,
            });
            this.sendModify();
          }}
          onCancel={() => {
            this.setState({
              isShowModifyModel: false,
            });
          }}
        >
          <ModifyInfo wrappedComponentRef={inst => (this.modifyInfo = inst)} selectedItem={row} />
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
          <AddSuper wrappedComponentRef={inst => (this.addSuper = inst)} />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Manage;

@Form.create()
class ModifyInfo extends PureComponent {
  componentDidMount() {}

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="ID" {...formItemLayout}>
            {getFieldDecorator('id', {
              rules: [{ required: true, message: '必填' }],
            })(<Input disabled />)}
          </FormItem>
          <FormItem label="游戏名称" {...formItemLayout}>
            {getFieldDecorator('game', {})(<Input />)}
          </FormItem>
          <FormItem label="游戏介绍" {...formItemLayout}>
            {getFieldDecorator('gameDesc', {})(<TextArea />)}
          </FormItem>
          <FormItem label="规则介绍" {...formItemLayout}>
            {getFieldDecorator('ruleDesc', {})(<TextArea />)}
          </FormItem>
          <FormItem label="等级介绍" {...formItemLayout}>
            {getFieldDecorator('levelDesc', {})(<TextArea />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

@Form.create()
class AddSuper extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="游戏名称" {...formItemLayout}>
            {getFieldDecorator('game', {})(
              <Select>
                <Option value={0}>炸金花</Option>
                <Option value={1}>百人牛牛</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="游戏介绍" {...formItemLayout}>
            {getFieldDecorator('gameDesc', {})(<TextArea />)}
          </FormItem>
          <FormItem label="规则介绍" {...formItemLayout}>
            {getFieldDecorator('ruleDesc', {})(<TextArea />)}
          </FormItem>
          <FormItem label="等级介绍" {...formItemLayout}>
            {getFieldDecorator('levelDesc', {})(<TextArea />)}
          </FormItem>
          <FormItem label="禁用状态" {...formItemLayout}>
            {getFieldDecorator('account', {})(
              <Select>
                <Option value={0}>正常</Option>
                <Option value={1}>禁用</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

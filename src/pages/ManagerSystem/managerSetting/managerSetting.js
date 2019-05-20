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
  Divider,
  Select,
  Badge,
  Popconfirm,
  Modal,
  InputNumber,
  message,
  Checkbox,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from '../index.less';

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
@connect(({ managerSetting, loading }) => ({
  managerSetting,
  loading: loading.models.managerSetting,
}))
@Form.create()
class Manager extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
    isShowModifyModel: false,
    isShowAddSuperModel: false,
  };

  columns = [
    {
      title: '用户账号',
      dataIndex: 'account',
    },
    {
      title: '用户角色',
      dataIndex: 'role',
    },
    {
      title: '登录次数',
      dataIndex: 'num',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: val => {
        if (val === 0) {
          return '启用';
        }
        return '禁用';
      },
    },
    {
      title: '上次登录时间',
      dataIndex: 'time',
    },

    {
      title: '最后登录地址',
      dataIndex: 'ip',
    },
    {
      title: '最后登录时间',
      dataIndex: 'time1',
    },
    {
      title: '操作',
      dataIndex: 'status1',
      render: (record, text) => {
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
      type: 'managerSetting/fetchManageSettingList',
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
      type: 'managerSetting/fetchManageSettingList',
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

  showModifyInfo = (text, record) => {
    console.log(text, record);
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
    selectedRows.map(val => words.push(val.title));
    const params = {
      words,
    };
    const ui = words.join(',');
    confirm({
      title: '删除',
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
        type: 'managerSetting/fetchManageSettingList',
        payload: values,
      });
    });
  };

  /* 一系列对于表格的操作 */

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
      managerSetting: { manageSettingListData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <div>
        <div className={styles.tableList}>
          {this.renderOperationForm()}
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={manageSettingListData}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </div>

        <Modal
          destroyOnClose
          title="更新"
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
          title="新增"
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
      </div>
    );
  }
}

export default Manager;

@Form.create()
class ModifyInfo extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedItem } = this.props;
    console.log(this.props);
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="登录账号" {...formItemLayout}>
            {getFieldDecorator('account', {
              initialValue: selectedItem.account,
            })(<Input />)}
          </FormItem>
          <FormItem label="登录密码" {...formItemLayout}>
            {getFieldDecorator('content', {})(<Input />)}
          </FormItem>
          <FormItem label="确认密码" {...formItemLayout}>
            {getFieldDecorator('define', {})(<Input />)}
          </FormItem>
          <FormItem label="手机密码" {...formItemLayout}>
            {getFieldDecorator('mobile', {
              initialValue: selectedItem.mobile,
            })(<Input />)}
          </FormItem>
          <FormItem label="用户角色" {...formItemLayout}>
            {getFieldDecorator('role', {})(
              <Select>
                <Option value={0}>超级管理员</Option>
                <Option value={1}>用户管理员</Option>
                <Option value={2}>网站管理员</Option>
                <Option value={3}>wangmaoyz</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="禁用状态" {...formItemLayout}>
            {getFieldDecorator('status', {})(
              <RadioGroup>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>禁用</Radio>
              </RadioGroup>
            )}
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
          <FormItem label="登录账号" {...formItemLayout}>
            {getFieldDecorator('account', {})(<Input />)}
          </FormItem>
          <FormItem label="登录密码" {...formItemLayout}>
            {getFieldDecorator('content', {})(<Input />)}
          </FormItem>
          <FormItem label="确认密码" {...formItemLayout}>
            {getFieldDecorator('define', {})(<Input />)}
          </FormItem>
          <FormItem label="手机密码" {...formItemLayout}>
            {getFieldDecorator('mobile', {})(<Input />)}
          </FormItem>
          <FormItem label="用户角色" {...formItemLayout}>
            {getFieldDecorator('role', {})(
              <Select>
                <Option value={0}>超级管理员</Option>
                <Option value={1}>用户管理员</Option>
                <Option value={2}>网站管理员</Option>
                <Option value={3}>wangmaoyz</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="禁用状态" {...formItemLayout}>
            {getFieldDecorator('status', {})(
              <RadioGroup>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>禁用</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

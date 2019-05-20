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
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from '../system.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const CheckoxGroup = Checkbox.Group;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ systemMachineManage, loading }) => ({
  systemMachineManage,
  loading: loading.models.systemMachineManage,
}))
@Form.create()
class SystemGameManageMoudle extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
    isShowModifyModel: false,
    isShowAddSuperModel: false,
  };

  columns = [
    {
      title: '模块标识',
      dataIndex: 'key',
    },
    {
      title: '模块名称',
      dataIndex: 'game',
    },
    {
      title: '服务端版本',
      dataIndex: 'service',
    },
    {
      title: '客户端版本',
      dataIndex: 'client',
    },
    {
      title: '操作',
      dataIndex: 'status1',
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
            <Divider type="vertical" />
          </Fragment>
        );
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemMachineManage/fetchSystemMachineManage',
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
      type: 'systemMachineManage/fetchSystemMachineManage',
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
        type: 'systemMachineManage/fetchSystemMachineManage',
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
          <Button icon="delete" type="primary" onClick={() => this.cancelSuper()}>
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
      systemMachineManage: { systemMachineManageData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <div title="模块管理">
        <div className={styles.tableList}>
          {this.renderOperationForm()}
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={systemMachineManageData}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </div>
        <Modal
          destroyOnClose
          title="修改额度"
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
          title="新增额度"
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

export default SystemGameManageMoudle;

@Form.create()
class ModifyInfo extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedItem } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="模块标识" {...formItemLayout}>
            {getFieldDecorator('key', {
              initialValue: selectedItem.key,
            })(<Input />)}
          </FormItem>
          <FormItem label="模块名称" {...formItemLayout}>
            {getFieldDecorator('name', {})(<Input />)}
          </FormItem>
          <FormItem label="数据库名" {...formItemLayout}>
            {getFieldDecorator('database', {})(<Input />)}
          </FormItem>
          <FormItem label="数据库地址" {...formItemLayout}>
            {getFieldDecorator('ip', {})(<Input />)}
          </FormItem>
          <FormItem label="服务端版本" {...formItemLayout}>
            {getFieldDecorator('password', {})(<Input />)}
          </FormItem>
          <FormItem label="客户端版本" {...formItemLayout}>
            {getFieldDecorator('code', {})(<Input />)}
          </FormItem>
          <FormItem label="服务端名称" {...formItemLayout}>
            {getFieldDecorator('code1', {})(<Input />)}
          </FormItem>
          <FormItem label="客户端名称" {...formItemLayout}>
            {getFieldDecorator('code2', {})(<Input />)}
          </FormItem>
          <FormItem label="支持类型" {...formItemLayout}>
            {getFieldDecorator('code3', {})(
              <CheckoxGroup>
                <Checkbox value="1">金币类型</Checkbox>
                <Checkbox value="2">点值类型</Checkbox>
                <Checkbox value="3">定是比赛</Checkbox>
                <Checkbox value="4">训练类型</Checkbox>
                <Checkbox value="5">即时比赛</Checkbox>
              </CheckoxGroup>
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
          <FormItem label="模块标识" {...formItemLayout}>
            {getFieldDecorator('key', {})(<Input />)}
          </FormItem>
          <FormItem label="模块名称" {...formItemLayout}>
            {getFieldDecorator('name', {})(<Input />)}
          </FormItem>
          <FormItem label="数据库名" {...formItemLayout}>
            {getFieldDecorator('database', {})(<Input />)}
          </FormItem>
          <FormItem label="数据库地址" {...formItemLayout}>
            {getFieldDecorator('ip', {})(<Input />)}
          </FormItem>
          <FormItem label="服务端版本" {...formItemLayout}>
            {getFieldDecorator('password', {})(<Input />)}
          </FormItem>
          <FormItem label="客户端版本" {...formItemLayout}>
            {getFieldDecorator('code', {})(<Input />)}
          </FormItem>
          <FormItem label="服务端名称" {...formItemLayout}>
            {getFieldDecorator('code1', {})(<Input />)}
          </FormItem>
          <FormItem label="客户端名称" {...formItemLayout}>
            {getFieldDecorator('code2', {})(<Input />)}
          </FormItem>
          <FormItem label="支持类型" {...formItemLayout}>
            {getFieldDecorator('code3', {})(
              <CheckoxGroup>
                <Checkbox value="1">金币类型</Checkbox>
                <Checkbox value="2">点值类型</Checkbox>
                <Checkbox value="3">定是比赛</Checkbox>
                <Checkbox value="4">训练类型</Checkbox>
                <Checkbox value="5">即时比赛</Checkbox>
              </CheckoxGroup>
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

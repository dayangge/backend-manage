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
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from '../system.less';

const FormItem = Form.Item;
const { confirm } = Modal;
const status = ['禁用', '开启'];
const statusMap = ['default', 'processing', 'success', 'error'];
const { Option } = Select;
const RadioGroup = Radio.Group;

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
class SystemGameType extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
    isShowModifyModel: false,
  };

  columns = [
    {
      title: '类型标识',
      dataIndex: 'key',
    },
    {
      title: '类型名称',
      dataIndex: 'game',
    },
    {
      title: '挂接',
      dataIndex: 'port',
    },
    {
      title: '排序',
      dataIndex: 'userID',
    },
    {
      title: '禁用状态',
      dataIndex: 'status',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
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

  render() {
    const {
      systemMachineManage: { systemMachineManageData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <div title="类型管理">
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

export default SystemGameType;

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
          <FormItem label="类型标识" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: selectedItem.key,
            })(<Input />)}
          </FormItem>
          <FormItem label="类型名称" {...formItemLayout}>
            {getFieldDecorator('ip', {})(<Input />)}
          </FormItem>
          <FormItem label="挂接" {...formItemLayout}>
            {getFieldDecorator('port', {})(
              <Select defaultValue="1">
                <Option value="1">无挂接</Option>
                <Option value="2">炸金花</Option>
                <Option value="3">看牌牛牛</Option>
                <Option value="4">通比牛牛</Option>
                <Option value="5">中发白</Option>
                <Option value="6">百人牌九</Option>
                <Option value="7">百家乐</Option>
                <Option value="8">龙凤斗</Option>
                <Option value="9">不洗牌斗地主</Option>
                <Option value="10">红黑大战</Option>
                <Option value="11">水果拉霸</Option>
                <Option value="12">李逵</Option>
                <Option value="13">蛟龙出海</Option>
                <Option value="14">时时彩</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="排序" {...formItemLayout}>
            {getFieldDecorator('account', {})(<Input />)}
          </FormItem>
          <FormItem label="禁用状态" {...formItemLayout}>
            {getFieldDecorator('status', {
              initialValue: selectedItem.status,
            })(
              <RadioGroup>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
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
          <FormItem label="类型标识" {...formItemLayout}>
            {getFieldDecorator('name', {})(<Input />)}
          </FormItem>
          <FormItem label="类型名称" {...formItemLayout}>
            {getFieldDecorator('ip', {})(<Input />)}
          </FormItem>
          <FormItem label="挂接" {...formItemLayout}>
            {getFieldDecorator('port', {})(
              <Select defaultValue="1">
                <Option value="1">无挂接</Option>
                <Option value="2">炸金花</Option>
                <Option value="3">看牌牛牛</Option>
                <Option value="4">通比牛牛</Option>
                <Option value="5">中发白</Option>
                <Option value="6">百人牌九</Option>
                <Option value="7">百家乐</Option>
                <Option value="8">龙凤斗</Option>
                <Option value="9">不洗牌斗地主</Option>
                <Option value="10">红黑大战</Option>
                <Option value="11">水果拉霸</Option>
                <Option value="12">李逵</Option>
                <Option value="13">蛟龙出海</Option>
                <Option value="14">时时彩</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="排序" {...formItemLayout}>
            {getFieldDecorator('account', {})(<Input />)}
          </FormItem>
          <FormItem label="禁用状态" {...formItemLayout}>
            {getFieldDecorator('password', {})(
              <RadioGroup>
                <Radio value={1}>禁用</Radio>
                <Radio value={2}>正常</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

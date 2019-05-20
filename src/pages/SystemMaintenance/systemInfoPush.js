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

import styles from './system.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

const status = ['禁用', '开启'];
const statusMap = ['default', 'processing', 'success', 'error'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ systemInfoPush, loading }) => ({
  systemInfoPush,
  loading: loading.models.systemInfoPush,
}))
@Form.create()
class SystemInfoPush extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
  };

  columns = [
    {
      title: '推送用户',
      dataIndex: 'pushUser',
    },
    {
      title: '推送设备',
      dataIndex: 'pushDevice',
    },
    {
      title: '推送内容',
      dataIndex: 'pushContent',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
    },
    {
      title: '操作时间',
      dataIndex: 'time',
    },
    {
      title: '操作IP',
      dataIndex: 'ip',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemInfoPush/fetchSystemInfoPush',
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
      type: 'systemInfoPush/fetchSystemInfoPush',
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
        type: 'systemInfoPush/fetchSystemInfoPush',
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
            <FormItem label="地址查询">{getFieldDecorator('palt')(<Input />)}</FormItem>
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
            新赠
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
      systemInfoPush: { systemInfoPushData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <PageHeaderWrapper title="推送消息管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {this.renderOperationForm()}
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={systemInfoPushData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

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
      </PageHeaderWrapper>
    );
  }
}

export default SystemInfoPush;

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
          <FormItem label="推送用户" {...formItemLayout}>
            {getFieldDecorator('pushUser', {})(<Input />)}
          </FormItem>
          <FormItem label="推送内容" {...formItemLayout}>
            {getFieldDecorator('pushContent', {})(<TextArea />)}
          </FormItem>
          <FormItem label="推送方式" {...formItemLayout}>
            {getFieldDecorator('push', {})(
              <RadioGroup>
                <Radio value={1}>即时推送</Radio>
                <Radio value={2}>定时推送</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

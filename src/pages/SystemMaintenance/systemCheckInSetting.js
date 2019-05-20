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
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './system.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;

const status = ['禁用', '开启'];
const statusMap = ['default', 'processing', 'success', 'error'];
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
class SystemMachineManage extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemMachineManage/fetchSystemMachineManage',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {
      systemMachineManage: { systemMachineManageData },
      loading,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 4 },
    };
    return (
      <PageHeaderWrapper title="签到设置">
        <Card bordered={false}>
          <div>
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem label="机器名称" {...formItemLayout}>
                {getFieldDecorator('name', {})(<Input />)}
              </FormItem>
              <FormItem label="地址" {...formItemLayout}>
                {getFieldDecorator('ip', {})(<Input />)}
              </FormItem>
              <FormItem label="端口" {...formItemLayout}>
                {getFieldDecorator('port', {})(<Input />)}
              </FormItem>
              <FormItem label="账号" {...formItemLayout}>
                {getFieldDecorator('account', {})(<Input />)}
              </FormItem>
              <FormItem label="密码" {...formItemLayout}>
                {getFieldDecorator('password', {})(<Input />)}
              </FormItem>
              <FormItem label="机器码" {...formItemLayout}>
                {getFieldDecorator('code', {})(<Input />)}
              </FormItem>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SystemMachineManage;

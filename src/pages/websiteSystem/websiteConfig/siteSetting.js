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
  message,
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */
@connect(({ websiteConfig, loading }) => ({
  websiteConfig,
  loading: loading.models.websiteConfig,
}))
@Form.create()
class Contact extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'websiteConfig/fetchContactConfig',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        message.info('保存成功: ', values);
      }
    });
  };

  render() {
    const {
      websiteConfig: { contactConfig },
    } = this.props;

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };
    return (
      <Card bordered={false}>
        <div>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem label="键名" {...formItemLayout} style={{ marginBottom: 4 }}>
              {getFieldDecorator('keyName', {
                initialValue: contactConfig.keyName,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="名称" {...formItemLayout} style={{ marginBottom: 4 }}>
              {getFieldDecorator('keyText', {
                initialValue: contactConfig.keyText,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="键名" {...formItemLayout} style={{ marginBottom: 4 }}>
              {getFieldDecorator('content', {
                initialValue: contactConfig.content,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="字段1" {...formItemLayout} style={{ marginBottom: 4 }}>
              {getFieldDecorator('field1', {
                initialValue: contactConfig.field1,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="字段2" {...formItemLayout} style={{ marginBottom: 4 }}>
              {getFieldDecorator('field2', {
                initialValue: contactConfig.field2,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="字段3" {...formItemLayout} style={{ marginBottom: 4 }}>
              {getFieldDecorator('field3', {
                initialValue: contactConfig.field3,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="字段4" {...formItemLayout} style={{ marginBottom: 4 }}>
              {getFieldDecorator('field4', {
                initialValue: contactConfig.field4,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="字段5" {...formItemLayout} style={{ marginBottom: 4 }}>
              {getFieldDecorator('field5', {
                initialValue: contactConfig.field5,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="字段6" {...formItemLayout} style={{ marginBottom: 4 }}>
              {getFieldDecorator('field6', {
                initialValue: contactConfig.field6,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="字段7" {...formItemLayout} style={{ marginBottom: 4 }}>
              {getFieldDecorator('field7', {
                initialValue: contactConfig.field7,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="字段8" {...formItemLayout} style={{ marginBottom: 4 }}>
              {getFieldDecorator('field8', {
                initialValue: contactConfig.field8,
              })(<Input disabled />)}
            </FormItem>

            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form>
        </div>
      </Card>
    );
  }
}

export default Contact;

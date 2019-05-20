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
  Divider,
  Select,
  InputNumber,
  Radio,
  Checkbox,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

const status = ['禁用', '开启'];
const statusMap = ['default', 'processing', 'success', 'error'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ agentSystemAgentDomain, loading }) => ({
  agentSystemAgentDomain,
  loading: loading.models.agentSystemAgentDomain,
}))
@Form.create()
class Setting extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'agentSystemAgentDomain/fetch',
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
      agentSystemAgentDomain: { agentDomainData },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 4 },
    };
    return (
      <PageHeaderWrapper title="代理域名设置">
        <Card bordered={false} title="代理系统-代理域名设置">
          <div>
            {loading ? (
              ''
            ) : (
              <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem label="代理域名设置" {...formItemLayout}>
                  {getFieldDecorator('saleTime', {
                    rules: [{ required: true, message: '不能为空' }],
                    initialValue: agentDomainData.domain,
                  })(<Input />)}
                </FormItem>
                <FormItem label="注册推广码" {...formItemLayout}>
                  {getFieldDecorator('saleGold', {
                    rules: [{ required: true, message: '至少填一个' }],
                  })(<Input />)}
                </FormItem>
                <Row className={styles['item-list']}>
                  <Col span={4}>域名</Col>
                  <Col span={4}>xxx.xxx.com</Col>
                </Row>
                <FormItem label="首页推广码）" {...formItemLayout}>
                  {getFieldDecorator('trade', {
                    rules: [{ required: true, message: '至少填一个' }],
                  })(<Input />)}
                </FormItem>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form>
            )}
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Setting;

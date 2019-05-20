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
  TimePicker,
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
@connect(({ financeAgentSetting, loading }) => ({
  financeAgentSetting,
  loading: loading.models.financeAgentSetting,
}))
@Form.create()
class Setting extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financeAgentSetting/fetch',
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
      financeAgentSetting: { agentData },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 4 },
    };
    return (
      <PageHeaderWrapper title="代理设置">
        <Card bordered={false} title="财务系统-金币交易设置">
          <div className={styles.goldCoinTrade}>
            {loading ? (
              ''
            ) : (
              <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem label="系统是否开启" {...formItemLayout}>
                  {getFieldDecorator('isOpen', {
                    initialValue: agentData.isOpen,
                    rules: [{ required: true }],
                  })(
                    <RadioGroup>
                      <Radio value={1}>开启</Radio>
                      <Radio value={0}>关闭</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="每周开放日期" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator('openDate', {
                    rules: [{ required: true, message: '至少选一个' }],
                  })(
                    <CheckboxGroup>
                      <Checkbox value={0}>周日</Checkbox>
                      <Checkbox value={1}>周一</Checkbox>
                      <Checkbox value={2}>周二</Checkbox>
                      <Checkbox value={3}>周三</Checkbox>
                      <Checkbox value={4}>周四</Checkbox>
                      <Checkbox value={5}>周五</Checkbox>
                      <Checkbox value={6}>周六</Checkbox>
                    </CheckboxGroup>
                  )}
                </FormItem>

                <FormItem label="每日开放时间" {...formItemLayout}>
                  {getFieldDecorator('openTime', {
                    initialValue: moment(agentData.openTime, 'HH:mm'),
                    rules: [{ required: true }],
                  })(<TimePicker format="HH:mm" />)}
                </FormItem>
                <FormItem label="每日关闭时间" {...formItemLayout}>
                  {getFieldDecorator('closeTime', {
                    initialValue: moment(agentData.closeTime, 'HH:mm'),
                    rules: [{ required: true }],
                  })(<TimePicker format="HH:mm" />)}
                </FormItem>
                <FormItem label="每日申请次数（不限制次数请设置0）" {...formItemLayout}>
                  {getFieldDecorator('times', {
                    initialValue: agentData.times,
                    rules: [{ required: true }],
                  })(
                    <InputNumber
                      formatter={value => `${value}次`}
                      parser={value => value.replace('次', '')}
                    />
                  )}
                </FormItem>

                <FormItem label="结算价格" {...formItemLayout}>
                  {getFieldDecorator('period', {
                    rules: [{ required: true, message: '必须输入' }],
                  })(
                    <InputNumber
                      formatter={value => `${value}元`}
                      parser={value => value.replace('元', '')}
                    />
                  )}
                </FormItem>
                <FormItem label="每次最少结算金额" {...formItemLayout}>
                  {getFieldDecorator('saleTime', {
                    rules: [{ required: true, message: '必须填' }],
                  })(
                    <InputNumber
                      formatter={value => `${value}金币`}
                      parser={value => value.replace('金币', '')}
                    />
                  )}
                </FormItem>
                <FormItem label="结算手续费" {...formItemLayout}>
                  {getFieldDecorator('saleGold', {
                    rules: [{ required: true, message: '！！！' }],
                  })(
                    <InputNumber
                      formatter={value => `${value}%`}
                      parser={value => value.replace('%', '')}
                    />
                  )}
                </FormItem>
                <FormItem label="最低手续费" {...formItemLayout}>
                  {getFieldDecorator('lessGold', {
                    rules: [{ required: true, message: '！！！' }],
                  })(
                    <InputNumber
                      formatter={value => `${value}元`}
                      parser={value => value.replace('元', '')}
                    />
                  )}
                </FormItem>
                <FormItem label="上下级代理抽水比例的最小间隔" {...formItemLayout}>
                  {getFieldDecorator('pumping', {
                    rules: [{ required: true, message: '！！！' }],
                  })(
                    <InputNumber
                      formatter={value => `${value}%`}
                      parser={value => value.replace('%', '')}
                    />
                  )}
                </FormItem>
                <FormItem label="上下级代理最高抽水比例" {...formItemLayout}>
                  {getFieldDecorator('morePumping', {
                    rules: [{ required: true, message: '！！！' }],
                  })(
                    <InputNumber
                      formatter={value => `${value}%`}
                      parser={value => value.replace('%', '')}
                    />
                  )}
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

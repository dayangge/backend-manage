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
@connect(({ financeGoldCoinTradeSetting, loading }) => ({
  financeGoldCoinTradeSetting,
  loading: loading.models.financeGoldCoinTradeSetting,
}))
@Form.create()
class Setting extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financeGoldCoinTradeSetting/fetchGoldCoinTrade',
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
      financeGoldCoinTradeSetting: { goldCoinTradeData },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 4 },
    };
    return (
      <PageHeaderWrapper title="金币交易设置">
        <Card bordered={false} title="财务系统-金币交易设置">
          <div className={styles.goldCoinTrade}>
            {loading ? (
              ''
            ) : (
              <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem label="系统是否开启" {...formItemLayout}>
                  {getFieldDecorator('isOpen', {
                    initialValue: goldCoinTradeData.isOpen,
                    rules: [{ required: true }],
                  })(
                    <RadioGroup>
                      <Radio value={1}>开启</Radio>
                      <Radio value={0}>关闭</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="锁定金币出售" {...formItemLayout}>
                  {getFieldDecorator('isLock', {
                    initialValue: goldCoinTradeData.isLock,
                    rules: [{ required: true }],
                  })(
                    <RadioGroup>
                      <Radio value={1}>出售</Radio>
                      <Radio value={0}>不出售</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem label="玩家领取金币需要玩游戏的最少局数" {...formItemLayout}>
                  {getFieldDecorator('limitRound', {
                    initialValue: goldCoinTradeData.limitRound,
                    rules: [{ required: true }],
                  })(
                    <InputNumber
                      formatter={value => `${value}局`}
                      parser={value => value.replace('局', '')}
                    />
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
                <FormItem label="开发时段" {...formItemLayout}>
                  {getFieldDecorator('period', {
                    rules: [{ required: true, message: '至少选一个' }],
                  })(<RangePicker />)}
                </FormItem>
                <FormItem label="每天限制出售次数" {...formItemLayout}>
                  {getFieldDecorator('saleTime', {
                    rules: [{ required: true, message: '至少选一个' }],
                  })(<Input />)}
                </FormItem>
                <FormItem label="金币出售价格（x金币=1元）" {...formItemLayout}>
                  {getFieldDecorator('saleGold', {
                    rules: [{ required: true, message: '至少选一个' }],
                  })(<Input />)}
                </FormItem>
                <FormItem label="最少出售金币" {...formItemLayout}>
                  {getFieldDecorator('leastGold', {
                    rules: [{ required: true, message: '至少选一个' }],
                  })(<Input />)}
                </FormItem>
                <FormItem label="交易手续费）" {...formItemLayout}>
                  {getFieldDecorator('trade', {
                    rules: [{ required: true, message: '至少选一个' }],
                  })(<Input />)}
                </FormItem>
                <FormItem label="最低手续费" {...formItemLayout}>
                  {getFieldDecorator('least', {})(<Input />)}
                </FormItem>
                <FormItem
                  label="最低银行金币（玩家银行金币只有大于此设置才能进入交易页面）"
                  {...formItemLayout}
                >
                  {getFieldDecorator('bank', {})(<Input />)}
                </FormItem>
                <FormItem label="交易金额倍数" {...formItemLayout}>
                  {getFieldDecorator('times', {})(<Input />)}
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

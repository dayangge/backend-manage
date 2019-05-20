import React, { Component, Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Modal, Form, Input, message, Select, Checkbox, Row, Col, Icon } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

@connect(({ pushSystemWithdrawalConfig, loading }) => ({
  pushSystemWithdrawalConfig,
  loading: loading.effects.pushSystemWithdrawalConfig,
}))
@Form.create()
class detailInfo extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'pushSystemWithdrawalConfig/fetch',
    });
  }

  handleSubmitDetail = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      console.log(fieldsValue);

      dispatch({
        type: 'pushSystemWithdrawalConfig/submit',
        payload: fieldsValue,
      });
    });
  };

  render() {
    const {
      pushSystemWithdrawalConfig: { configData },
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
    };
    return (
      <PageHeaderWrapper title="推广提现配置">
        <Form onSubmit={this.handleSubmitDetail} layout="vertical" {...formItemLayout}>
          <FormItem label="系统是否开启" style={{ marginBottom: 4 }}>
            {getFieldDecorator('agentType', {})(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={2}>关闭</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
            label="每周开放日期"
            style={{ marginBottom: 4 }}
          >
            {getFieldDecorator('permission', {
              initialValue: configData.permission,
            })(
              <CheckboxGroup>
                <Checkbox value={0}>周一</Checkbox>
                <Checkbox value={1}>周二</Checkbox>
                <Checkbox value={2}>周三</Checkbox>
                <Checkbox value={3}>周四</Checkbox>
                <Checkbox value={4}>周五</Checkbox>
                <Checkbox value={5}>周六</Checkbox>
                <Checkbox value={6}>周日</Checkbox>
              </CheckboxGroup>
            )}
          </FormItem>
          <Row className={styles.configText}>
            <Col span={4}>开放时段：</Col>
            <Col span={2}>
              <FormItem style={{ marginBottom: 4 }} wrapperCol={{ sm: { span: 24 } }}>
                {getFieldDecorator('time1', {
                  initialValue: configData.mark,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={1} style={{ textAlign: 'center' }}>
              --
            </Col>
            <Col span={2}>
              <FormItem style={{ marginBottom: 4 }} wrapperCol={{ sm: { span: 24 } }}>
                {getFieldDecorator('time2', {
                  initialValue: configData.mark,
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="每天限制出售" style={{ marginBottom: 4 }}>
            {getFieldDecorator('sort', {
              initialValue: configData.sort,
            })(<Input addonAfter="次（不限制次数请设置为0" />)}
          </FormItem>
          <FormItem label="最低提现金额" style={{ marginBottom: 4 }}>
            {getFieldDecorator('s', {
              initialValue: configData.sort,
            })(<Input addonAfter="金币" />)}
          </FormItem>
          <FormItem label="交易手续费" style={{ marginBottom: 4 }}>
            {getFieldDecorator('fee', {
              initialValue: configData.sort,
            })(<Input addonAfter="%交易金额" />)}
          </FormItem>
          <FormItem label="最低手续费" style={{ marginBottom: 4 }}>
            {getFieldDecorator('lastFee', {
              initialValue: configData.sort,
            })(<Input addonAfter="元" />)}
          </FormItem>
          <FormItem label="交易金额倍数" style={{ marginBottom: 4 }}>
            {getFieldDecorator('sort', {
              initialValue: configData.sort,
            })(<Input addonAfter="倍" />)}
          </FormItem>

          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            提交
          </Button>
          <Button type="primary" onClick={this.cancelModify}>
            取消
          </Button>
        </Form>
      </PageHeaderWrapper>
    );
  }
}

export default detailInfo;

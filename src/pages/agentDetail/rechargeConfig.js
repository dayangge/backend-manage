import React, { Component, Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Modal, Form, Input, message, Select, Checkbox, DatePicker } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ agentID, agentDetailDetail, loading }) => ({
  agentID,
  agentDetailDetail,
  loading: loading.effects.agentDetailDetail,
}))
@Form.create()
class detailInfo extends Component {
  componentDidMount() {
    const { dispatch, agentID } = this.props;
    const { id } = agentID;
    const params = {
      id,
    };
    dispatch({
      type: 'agentDetailDetail/fetch',
      payload: params,
    });
  }

  handleSubmitDetail = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      console.log(fieldsValue);

      dispatch({
        type: 'agentDetailDetail/submit',
        payload: fieldsValue,
      });
    });
  };

  render() {
    const {
      agentDetailDetail: { agentDetailData },
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
    };
    return (
      <Card title="代理充值设置（提示：在线充值和线下充值都生效）">
        <Form onSubmit={this.handleSubmitDetail} layout="vertical" {...formItemLayout}>
          <FormItem label="玩家范围（累计充值达到填写数额的玩家）" style={{ marginBottom: 4 }}>
            {getFieldDecorator('limit', {
              initialValue: agentDetailData.account,
            })(<Input />)}
          </FormItem>
          <FormItem label="时间范围" style={{ marginBottom: 4 }}>
            {getFieldDecorator('password', {})(<RangePicker />)}
          </FormItem>
          <FormItem
            label="单笔充值（在此范围内的玩家在时间段内单笔充值达到指定数额不显示）"
            style={{ marginBottom: 4 }}
          >
            {getFieldDecorator('realName', {
              rules: [{ required: true, message: '请输入姓名！' }],
              initialValue: agentDetailData.realName,
            })(<Input />)}
          </FormItem>
          <FormItem label="QQ号码" style={{ marginBottom: 4 }}>
            {getFieldDecorator('qq', {
              initialValue: agentDetailData.qq,
            })(<Input />)}
          </FormItem>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            提交
          </Button>
        </Form>
      </Card>
    );
  }
}

export default detailInfo;

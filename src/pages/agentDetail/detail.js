import React, { Component, Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Modal, Form, Input, message, Select, Checkbox, Row, Col, Icon } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from './index.less';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

@connect(({ agentID, agentDetailDetail, loading }) => ({
  agentID,
  agentDetailDetail,
  loading: loading.effects.agentDetailDetail,
}))
@Form.create()
class detailInfo extends Component {
  state = {
    rechargeModal: false,
  };

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

  rechargeGold = () => {
    this.setState({
      rechargeModal: true,
    });
  };

  sendRecharge = () => {
    const data = this.modifyInfo.props.form.getFieldsValue();
    message.info(JSON.stringify(data));
  };

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
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
    };
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmitDetail} layout="vertical" {...formItemLayout}>
          <FormItem label="代理账号" style={{ marginBottom: 4 }}>
            {getFieldDecorator('account', {
              initialValue: agentDetailData.account,
            })(<Input />)}
          </FormItem>
          <FormItem label="代理密码" style={{ marginBottom: 4 }}>
            {getFieldDecorator('password', {
              initialValue: agentDetailData.password,
            })(<Input />)}
          </FormItem>
          <FormItem label="真实姓名" style={{ marginBottom: 4 }}>
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
          <FormItem label="名称" style={{ marginBottom: 4 }}>
            {getFieldDecorator('name', {
              initialValue: agentDetailData.name,
            })(<Input />)}
          </FormItem>
          <FormItem label="微信号" style={{ marginBottom: 4 }}>
            {getFieldDecorator('weixin', {
              initialValue: agentDetailData.weixin,
            })(<Input />)}
          </FormItem>
          <FormItem label="代理类别" style={{ marginBottom: 4 }}>
            {getFieldDecorator('agentType', {})(
              <Select>
                <Option value={1}>抽水提成</Option>
                <Option value={2}>银商</Option>
                <Option value={3}>充值提成</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="开户行名称" style={{ marginBottom: 4 }}>
            {getFieldDecorator('bankName', {
              initialValue: agentDetailData.banName,
            })(<Input />)}
          </FormItem>
          <FormItem label="开户行账号" style={{ marginBottom: 4 }}>
            {getFieldDecorator('bankAccount', {
              initialValue: agentDetailData.bankAccount,
            })(<Input />)}
          </FormItem>
          <FormItem label="开户行地址" style={{ marginBottom: 4 }}>
            {getFieldDecorator('bankAddress', {
              initialValue: agentDetailData.bankAddress,
            })(<Input />)}
          </FormItem>
          <Row style={{ marginBottom: 10, marginTop: 6, vertical: 'baseline' }}>
            <Col style={{ color: '#000' }} span={4}>
              资产
            </Col>
            <Col span={2}>{agentDetailData.asset}金币</Col>
            <Col span={4}>
              <Button onClick={this.rechargeGold} type="primary">
                充值
              </Button>
            </Col>
          </Row>
          <FormItem label="抽水比例" style={{ marginBottom: 4 }}>
            {getFieldDecorator('pumpingRate', {
              initialValue: agentDetailData.pumpingRate,
            })(<Input />)}
          </FormItem>
          <FormItem label="状态" style={{ marginBottom: 4 }}>
            {getFieldDecorator('status', {
              initialValue: agentDetailData.status,
            })(
              <Select>
                <Option key={0} value={0}>
                  正常
                </Option>
                <Option key={1} value={1}>
                  停用
                </Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="绑定域名" style={{ marginBottom: 4 }}>
            {getFieldDecorator('bindDomain', {
              initialValue: agentDetailData.bindDomain,
            })(<Input />)}
          </FormItem>
          <FormItem
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12 }}
            label="查看权限"
            style={{ marginBottom: 4 }}
          >
            {getFieldDecorator('permission', {
              initialValue: agentDetailData.permission,
            })(
              <CheckboxGroup>
                <Checkbox value={0}>玩家充值记录</Checkbox>
                <Checkbox value={1}>玩家游戏记录</Checkbox>
                <Checkbox value={2}>玩家提现记录</Checkbox>
                <Checkbox value={3}>查看总输赢</Checkbox>
                <Checkbox value={4}>代理公告</Checkbox>
                <Checkbox value={5}>资料修改</Checkbox>
                <Checkbox value={6}>玩家管理</Checkbox>
                <Checkbox value={7}>我的报表</Checkbox>
                <Checkbox value={8}>我的抽水记录</Checkbox>
                <Checkbox value={9}>金币变化记录</Checkbox>
                <Checkbox value={10}>提款</Checkbox>
                <Checkbox value={11}>提款记录</Checkbox>
                <Checkbox value={12}>充值提成报表</Checkbox>
                <Checkbox value={13}>在线玩家</Checkbox>
              </CheckboxGroup>
            )}
          </FormItem>
          <FormItem label="备注" style={{ marginBottom: 4 }}>
            {getFieldDecorator('mark', {
              initialValue: agentDetailData.mark,
            })(<Input />)}
          </FormItem>
          <FormItem label="排序号" style={{ marginBottom: 4 }}>
            {getFieldDecorator('sort', {
              initialValue: agentDetailData.sort,
            })(<Input />)}
          </FormItem>

          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            提交
          </Button>
          <Button type="primary" onClick={this.cancelModify}>
            取消
          </Button>
        </Form>
        <Modal
          destroyOnClose
          title="充值"
          visible={this.state.rechargeModal} // eslint-disable-line
          onOk={() => {
            this.setState({
              rechargeModal: false,
            });
            this.sendRecharge();
          }}
          onCancel={() => {
            this.setState({
              rechargeModal: false,
            });
          }}
        >
          <ModifyInfo
            wrappedComponentRef={inst => (this.modifyInfo = inst)}
            item={agentDetailData.asset}
          />
        </Modal>
      </Fragment>
    );
  }
}

export default detailInfo;

@Form.create()
class ModifyInfo extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { item } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="充值金币数量" {...formItemLayout}>
            {getFieldDecorator('gold', {
              initialValue: item,
            })(<Input />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

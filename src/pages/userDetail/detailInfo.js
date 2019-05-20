import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Badge,
  Table,
  Divider,
  Button,
  Modal,
  Form,
  Input,
  message,
  Select,
  Checkbox,
  Row,
  Col,
  Icon,
} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from './userDetail.less';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

@connect(({ userInfo, loading }) => ({
  userInfo,
  loading: loading.effects.userInfo,
}))
@Form.create()
class detailInfo extends Component {
  state = {
    modify: false,
  };

  componentDidMount() {
    const { dispatch, userInfo } = this.props;
    const { userID } = userInfo;
    const params = {
      id: userID,
    };
    dispatch({
      type: 'userInfo/fetchDetailInfo',
      payload: params,
    });
  }

  modifyDetailInfo = () => {
    this.setState({
      modify: true,
    });
  };

  cancelModify = () => {
    this.setState({
      modify: false,
    });
  };

  handleSubmitDetail = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      console.log(fieldsValue);

      dispatch({
        type: 'userInfo/submit',
        payload: fieldsValue,
      });
      this.setState({
        modify: false,
      });
    });
  };

  render() {
    const {
      userInfo: { detailInfoData },
    } = this.props;
    const { modify } = this.state;
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
        {modify ? (
          <Form onSubmit={this.handleSubmitDetail} layout="vertical" {...formItemLayout}>
            <FormItem label="ID号码" style={{ marginBottom: 4 }}>
              {getFieldDecorator('id', {
                initialValue: detailInfoData.id,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="账号" style={{ marginBottom: 4 }}>
              {getFieldDecorator('status', {
                initialValue: detailInfoData.account,
              })(<Input disabled />)}
            </FormItem>
            <FormItem label="真实姓名" style={{ marginBottom: 4 }}>
              {getFieldDecorator('realName', {
                rules: [{ required: true, message: '请输入姓名！' }],
                initialValue: detailInfoData.realName,
              })(<Input />)}
            </FormItem>
            <FormItem label="银行卡号" style={{ marginBottom: 4 }}>
              {getFieldDecorator('bankCard', {
                initialValue: detailInfoData.bankCard,
              })(<Input />)}
            </FormItem>
            <FormItem label="银行名称" style={{ marginBottom: 4 }}>
              {getFieldDecorator('bankName', {
                initialValue: detailInfoData.realName,
              })(<Input />)}
            </FormItem>
            <FormItem label="银行地址" style={{ marginBottom: 4 }}>
              {getFieldDecorator('bankAddress', {
                initialValue: detailInfoData.bankAddress,
              })(<Input />)}
            </FormItem>
            <FormItem label="QQ号码" style={{ marginBottom: 4 }}>
              {getFieldDecorator('QQ', {
                initialValue: detailInfoData.QQ,
              })(<Input />)}
            </FormItem>
            <FormItem label="电子邮箱" style={{ marginBottom: 4 }}>
              {getFieldDecorator('email', {
                initialValue: detailInfoData.email,
              })(<Input />)}
            </FormItem>
            <FormItem label="支付宝" style={{ marginBottom: 4 }}>
              {getFieldDecorator('alipay', {
                initialValue: detailInfoData.alipay,
              })(<Input />)}
            </FormItem>
            <FormItem label="手机号码" style={{ marginBottom: 4 }}>
              {getFieldDecorator('mobile', {
                initialValue: detailInfoData.moblie,
              })(<Input />)}
            </FormItem>
            <FormItem label="居住地址" style={{ marginBottom: 4 }}>
              {getFieldDecorator('local', {
                initialValue: detailInfoData.local,
              })(<Input />)}
            </FormItem>
            <FormItem label="备注" style={{ marginBottom: 4 }}>
              {getFieldDecorator('mark', {
                initialValue: detailInfoData.mark,
              })(<Input />)}
            </FormItem>

            <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
              提交
            </Button>
            <Button type="primary" onClick={this.cancelModify}>
              取消
            </Button>
          </Form>
        ) : (
          <div className={styles.detail}>
            <Row className={styles['detail-item']}>
              <Col sm={4}>ID号码：</Col>
              <Col sm={4}>{detailInfoData.id}</Col>
            </Row>
            <Row className={styles['detail-item']}>
              <Col sm={4}>账号：</Col> <Col sm={4}>{detailInfoData.account}</Col>
            </Row>
            <Row className={styles['detail-item']}>
              <Col sm={4}>真实姓名</Col> <Col sm={4}>{detailInfoData.realName}</Col>
            </Row>
            <Row className={styles['detail-item']}>
              <Col sm={4}>银行卡号：</Col> <Col sm={4}>{detailInfoData.bankCard}</Col>
            </Row>
            <Row className={styles['detail-item']}>
              <Col sm={4}>银行名称：</Col> <Col sm={4}>{detailInfoData.bankName}</Col>
            </Row>
            <Row className={styles['detail-item']}>
              <Col sm={4}>银行地址：</Col> <Col sm={4}>{detailInfoData.bankAddress}</Col>
            </Row>
            <Row className={styles['detail-item']}>
              <Col sm={4}>QQ号码：</Col> <Col sm={4}>{detailInfoData.QQ}</Col>
            </Row>
            <Row className={styles['detail-item']}>
              <Col sm={4}>电子邮箱：</Col> <Col sm={4}>{detailInfoData.email}</Col>
            </Row>
            <Row className={styles['detail-item']}>
              <Col sm={4}>支付宝：</Col> <Col sm={4}>{detailInfoData.alipay}</Col>
            </Row>
            <Row className={styles['detail-item']}>
              <Col sm={4}>手机号码：</Col> <Col sm={4}>{detailInfoData.mobile}</Col>
            </Row>
            <Row className={styles['detail-item']}>
              <Col sm={4}>居住地址：</Col> <Col sm={4}>{detailInfoData.local}</Col>
            </Row>
            <Row className={styles['detail-item']}>
              <Col sm={4}>备注：</Col> <Col sm={4}>{detailInfoData.mark}</Col>
            </Row>
            <Button type="primary" onClick={this.modifyDetailInfo}>
              修改
            </Button>
          </div>
        )}
      </Fragment>
    );
  }
}

export default detailInfo;

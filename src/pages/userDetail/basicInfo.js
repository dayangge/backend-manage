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
} from 'antd';
import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

@connect(({ userInfo, loading }) => ({
  userInfo,
  loading: loading.effects.userInfo,
}))
class basicInfo extends Component {
  state = {
    isShowEditUserInfoModal: false,
    isShowPermissionInfoModal: false,
  };

  componentDidMount() {
    const { dispatch, userInfo } = this.props;
    const { userID } = userInfo;
    const params = {
      id: userID,
    };
    dispatch({
      type: 'userInfo/fetchUserInfo',
      payload: params,
    });
  }

  /* 控制表单显示 */
  handleEditUserInfoModal = () => {
    this.setState({
      isShowEditUserInfoModal: true,
    });
  };

  handleEditPermissionModal = () => {
    this.setState({
      isShowPermissionInfoModal: true,
    });
  };

  /* 发送表单信息 */
  addUserInfo = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/add',
      payload: {
        desc: fields.desc,
      },
    });
    console.log(fields);
    message.success('添加成功');
    this.handleModalVisible();
  };

  addPermission = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/add',
      payload: {
        desc: fields.desc,
      },
    });
    console.log(fields);
    message.success('添加成功');
    this.handlePermissionVisible();
  };

  /* 修改表单modal显示状态 */
  handleModalVisible = flag => {
    this.setState({
      isShowEditUserInfoModal: !!flag,
    });
  };

  handlePermissionVisible = flag => {
    this.setState({
      isShowPermissionInfoModal: !!flag,
    });
  };

  render() {
    const { isShowEditUserInfoModal, isShowPermissionInfoModal } = this.state;
    /* 修改用户信息 */
    const parentMethods = {
      addUserInfo: this.addUserInfo,
      handleModalVisible: this.handleModalVisible,
    };
    /* 修改权限信息 */
    const permissionParentMethods = {
      addPermission: this.addPermission,
      handlePermissionVisible: this.handlePermissionVisible,
    };
    return (
      <Fragment>
        <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
          <Description term="ID号码">335219</Description>
          <Description term="原账号">1395245622</Description>
          <Description term="推广人">dsefegf</Description>
          <Description term="修改个人信息">
            <Button icon="edit" type="primary" onClick={() => this.handleEditUserInfoModal()}>
              修改
            </Button>
          </Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="登录信息" style={{ marginBottom: 32 }}>
          <Description term="网站登录次数">1</Description>
          <Description term="大厅登录次数">1</Description>
          <Description term="在线时长共计">1小时22分22秒</Description>
          <Description term="游戏时长共计">1小时</Description>
          <Description term="最后登录地址">146.88.206.152 美国</Description>
          <Description term="登录机器">185SEFGSF54SEDFD5</Description>
          <Description term="注册机器">-----</Description>
          <Description term="注册来源">WEB</Description>
          <Description term="注册时间">2019-04-25 13:00:00</Description>
          <Description term="注册地址">146.22.22.22 美国</Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
          <Description term=" 玩家权限">无限制</Description>
          <Description term="操作">
            <Button icon="edit" type="primary" onClick={() => this.handleEditPermissionModal()}>
              修改用户权限
            </Button>
          </Description>
        </DescriptionList>

        <AddUserInfoForm {...parentMethods} modalVisible={isShowEditUserInfoModal} />

        <AddPermissionInfoForm
          {...permissionParentMethods}
          permissionVisible={isShowPermissionInfoModal}
        />
      </Fragment>
    );
  }
}

export default basicInfo;

const AddUserInfoForm = Form.create()(props => {
  const { modalVisible, form, addUserInfo, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      addUserInfo(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="修改个人信息"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="真实姓名">
        {form.getFieldDecorator('name')(<Input placeholder="请输入" disabled />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账号">
        {form.getFieldDecorator('account', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户昵称">
        {form.getFieldDecorator('nickname', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="登录密码">
        {form.getFieldDecorator('password')(<Input placeholder="不输入则不修改" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="保险柜密码">
        {form.getFieldDecorator('safeBox')(<Input placeholder="不输入则不修改" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="绑定手机">
        {form.getFieldDecorator('mobile', {
          rules: [{ required: true, message: '请输入正确手机号！', min: 11 }],
        })(<Input placeholder="请输入手机号" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="个性签名">
        {form.getFieldDecorator('signature', {
          rules: [{ required: true, message: '别瞎写', min: 5 }],
        })(<Input placeholder="别瞎写" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性别">
        {form.getFieldDecorator('gender')(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="0">男</Option>
            <Option value="1">女</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选项">
        {form.getFieldDecorator('setAccount')(
          <CheckboxGroup>
            <Checkbox value="0">冻结账号</Checkbox>
            <Checkbox value="1">安全关闭</Checkbox>
            <Checkbox value="2">设为机器人</Checkbox>
          </CheckboxGroup>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="锁定机器">
        {form.getFieldDecorator('lock')(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="0">未锁定</Option>
            <Option value="1">客户端锁定</Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  );
});

const AddPermissionInfoForm = Form.create()(props => {
  const { permissionVisible, form, addUserInfo, handlePermissionVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      addUserInfo(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="修改权限信息"
      visible={permissionVisible}
      onOk={okHandle}
      onCancel={() => handlePermissionVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="真实姓名">
        {form.getFieldDecorator('name')(<Input placeholder="请输入" disabled />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户身份">
        {form.getFieldDecorator('userRole')(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="0">普通玩家</Option>
            <Option value="1">管理员</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="玩家权限">
        {form.getFieldDecorator('playerPermission')(
          <CheckboxGroup>
            <Checkbox value="0">不能进行游戏</Checkbox>
            <Checkbox value="1">不能旁观游戏</Checkbox>
            <Checkbox value="2">不能发送私聊</Checkbox>
            <Checkbox value="3">不能大厅聊天</Checkbox>
            <Checkbox value="4">不能游戏聊天</Checkbox>
            <Checkbox value="5">不能进行转账</Checkbox>
            <Checkbox value="6">游戏踢出用户</Checkbox>
            <Checkbox value="7">游戏比赛用户</Checkbox>
            <Checkbox value="8">游戏作弊用户</Checkbox>
          </CheckboxGroup>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="玩家权限">
        {form.getFieldDecorator('managerPermission')(
          <CheckboxGroup>
            <Checkbox value="0">允许进行游戏</Checkbox>
            <Checkbox value="1">允许禁止旁观</Checkbox>
            <Checkbox value="2">允许禁止私聊</Checkbox>
            <Checkbox value="3">允许禁止房间聊天</Checkbox>
            <Checkbox value="4">允许游戏禁止聊天</Checkbox>
            <Checkbox value="5">允许踢出用户</Checkbox>
            <Checkbox value="6">允许解散游戏</Checkbox>
            <Checkbox value="7">允许发布消息</Checkbox>
            <Checkbox value="8">允许管理房间</Checkbox>
            <Checkbox value="9">允许管理机器人</Checkbox>
          </CheckboxGroup>
        )}
      </FormItem>
    </Modal>
  );
});

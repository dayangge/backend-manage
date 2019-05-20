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
  Select,
  Modal,
  Badge,
  message,
} from 'antd';
import ETable from '@/components/Etable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const { TextArea } = Input;

const status = ['停用', '正常'];
const statusMap = ['default', 'processing', 'success', 'error'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ agentDetailSubAgent, pervUrl, agentID, loading }) => ({
  agentDetailSubAgent,
  pervUrl,
  agentID,
  loading: loading.models.agentDetailSubAgent,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
  };

  columns = [
    {
      title: '代理账号',
      dataIndex: 'account',
    },
    {
      title: '真实姓名',
      dataIndex: 'name',
    },
    {
      title: 'QQ号码',
      dataIndex: 'qq',
    },
    {
      title: '金币',
      dataIndex: 'gold',
    },
    {
      title: '抽水比例',
      dataIndex: 'rate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '注册时期',
      dataIndex: 'time1',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '代理级别',
      dataIndex: 'level',
    },
    {
      title: '最后登录日期',
      dataIndex: 'time2',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '管理代理账号',
      dataIndex: 'edit',
      render: (val, record, text) => {
        return (
          <Fragment>
            <Button
              type="primary"
              onClick={() => {
                this.showModify(text, record);
              }}
            >
              操作
            </Button>
          </Fragment>
        );
      },
    },
  ];

  componentDidMount() {
    const { dispatch, agentID } = this.props;
    const { id } = agentID;
    dispatch({
      type: 'agentDetailSubAgent/fetch',
      payload: { id },
    });
  }

  showModify = () => {
    this.setState({
      isShowModifyInfoModel: true,
    });
  };

  sendModifyInfo = () => {
    const data = this.modifyInfo.props.form.getFieldsValue();
    message.info(JSON.stringify(data));
  };

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };

    dispatch({
      type: 'agentDetailSubAgent/fetch',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  /* 保存行 */
  selectRow = (text, record) => {
    this.setState({
      row: record,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'agentDetailSubAgent/fetch',
      payload: {},
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      dispatch({
        type: 'agentDetailSubAgent/fetch',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={4} sm={24}>
            <FormItem label="代理账号">
              {getFieldDecorator('userAccount')(<Input placehold="请输入代理账号" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                刷新
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      agentDetailSubAgent: { subAgentData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <Fragment>
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
            <ETable
              selectedRows={selectedRows}
              loading={loading}
              data={subAgentData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <Modal
          destroyOnClose
          title="操作"
          visible={this.state.isShowModifyInfoModel} // eslint-disable-line
          onOk={() => {
            this.setState({
              isShowModifyInfoModel: false,
            });
            this.sendModifyInfo();
          }}
          onCancel={() => {
            this.setState({
              isShowModifyInfoModel: false,
            });
          }}
        >
          <ModifyInfo wrappedComponentRef={inst => (this.modifyInfo = inst)} />
        </Modal>
      </Fragment>
    );
  }
}

export default Manage;

@Form.create()
class ModifyInfo extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="游戏名称" {...formItemLayout}>
            {getFieldDecorator('game', {})(
              <Select>
                <Option value={0}>炸金花</Option>
                <Option value={1}>百人牛牛</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="游戏介绍" {...formItemLayout}>
            {getFieldDecorator('gameDesc', {})(<TextArea />)}
          </FormItem>
          <FormItem label="规则介绍" {...formItemLayout}>
            {getFieldDecorator('ruleDesc', {})(<TextArea />)}
          </FormItem>
          <FormItem label="等级介绍" {...formItemLayout}>
            {getFieldDecorator('levelDesc', {})(<TextArea />)}
          </FormItem>
          <FormItem label="禁用状态" {...formItemLayout}>
            {getFieldDecorator('account', {})(
              <Select>
                <Option value={0}>正常</Option>
                <Option value={1}>禁用</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

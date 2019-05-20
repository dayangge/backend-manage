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
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const { TextArea } = Input;

const status = ['停用', '正常'];
const statusMap = ['default', 'processing', 'success', 'error'];

/* eslint react/no-multi-comp:0 */
@connect(({ agentDetailRechargeComm, pervUrl, agentID, loading }) => ({
  agentDetailRechargeComm,
  pervUrl,
  agentID,
  loading: loading.models.agentDetailRechargeComm,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
  };

  columns = [
    {
      title: '时间',
      dataIndex: 'time',
    },
    {
      title: '总充值',
      dataIndex: 'recharge',
    },
    {
      title: '总充值（代理可见）',
      dataIndex: 'total',
    },
    {
      title: '充值汇率',
      dataIndex: 'rate',
    },
    {
      title: '充值手续费',
      dataIndex: 'fee',
    },
    {
      title: '实际充值',
      dataIndex: 'real',
    },
    {
      title: '总提现',
      dataIndex: 'withdrawal',
    },
    {
      title: '单笔手续费',
      dataIndex: 'cost',
    },
    {
      title: '提现次数',
      dataIndex: 'times',
    },
    {
      title: '提现手续费',
      dataIndex: 'withdrawalFee',
    },
    {
      title: '实际提现',
      dataIndex: 'realWithdrawal',
    },
    {
      title: '实际收入',
      dataIndex: 'income',
    },
    {
      title: '提成比例',
      dataIndex: 'commissionRate',
    },
    {
      title: '提成',
      dataIndex: 'commission',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
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
      type: 'agentDetailRechargeComm/fetch',
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
      type: 'agentDetailRechargeComm/fetch',
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
      type: 'agentDetailRechargeComm/fetch',
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
        type: 'agentDetailRechargeComm/fetch',
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
      agentDetailRechargeComm: { commData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <Fragment>
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
            <Row className={styles.box}>
              <Col>
                提示：报表数据 <span className={styles.warningText}>不含今日</span>
              </Col>
              <Col>
                计算公式：充值手续费=总充值*充值汇率{' '}
                <span className={styles.redText}>实际充值=总充值-充值手续费</span>
                提现手续费=单笔手续费*提现次数{' '}
                <span className={styles.redText}>实际提现=总提现+提现手续费</span>
                实际收入=实际充值-实际提现
                <span className={styles.redText}>提成=实际收入*提成比例</span>
              </Col>
            </Row>
            <ETable
              selectedRows={selectedRows}
              loading={loading}
              data={commData}
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

import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Modal,
  InputNumber,
  Checkbox,
  TimePicker,
  message,
  DatePicker,
  Badge,
  Divider,
  Table,
  Popconfirm,
  Tabs,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './recharge.less';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;
const CheckboxGroup = Checkbox.Group;

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['开启', '权停'];
const roomList = [
  '炸金花-体验场',
  '大厅-初级场',
  '炸金花-初级场',
  '看牌牛牛-初级场',
  '通比牛牛-初级场',
  '百人牛牛-初级场',
  '中发白-初级场',
  '百人牌九-初级场',
  '百家乐-初级场',
  '龙凤斗-初级场',
  '不洗牌斗地主-初级场',
  '红黑大战-初级场',
  '水果拉霸-初级场',
  '李逵-初级场',
  '蛟龙出海-初级场',
  '时时彩-初级场',
];

/* eslint react/no-multi-comp:0 */
@connect(({ rechargeAmount, loading }) => ({
  rechargeAmount,
  loading: loading.models.rechargeAmount,
}))
@Form.create()
class rechargeA extends PureComponent {
  state = {
    isShowModifyModel: false,
    isShowAddSuperModel: false,
    selectedRows: [],
    row: {},
  };

  columns = [
    {
      title: '金额',
      dataIndex: 'cost',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'edit',
      render: (text, record) => (
        <Fragment>
          <a
            onClick={() => {
              this.showModifyInfo(text, record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除?"
            onConfirm={() => {
              this.close();
            }}
          >
            <a
              onClick={() => {
                this.selectRow(text, record);
              }}
            >
              关闭
            </a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rechargeAmount/fetchRechargeAmount',
    });
  }

  showModifyInfo = (text, record) => {
    this.setState({
      row: record,
      isShowModifyModel: true,
    });
  };

  showAddSuper = () => {
    this.setState({
      isShowAddSuperModel: true,
    });
  };

  selectRow = (text, record) => {
    this.setState({
      row: record,
    });
  };

  close = () => {
    const { row } = this.state;
    console.log(row);
  };

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'robotSetting/fetchRobotInfo',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  sendModify = () => {
    const data = this.modifyInfo.props.form.getFieldsValue();
    console.log(data);
  };

  sendAddSuper = () => {
    const data = this.addSuper.props.form.getFieldsValue();
    console.log(data);
  };

  cancelSuper = () => {
    const { selectedRows } = this.state;
    const self = this;
    const words = [];
    if (selectedRows.length <= 0) {
      message.warning('请至少选择一项');
      return;
    }
    selectedRows.map(val => words.push(val.cost));
    const params = {
      words,
    };
    const ui = words.join(',');
    confirm({
      title: '删除额度',
      content: `你要删除${ui}额度？`,
      onOk() {
        self.handleDelete(params);
      },
      onCancel() {},
    });
  };

  handleDelete = params => {
    this.setState({
      selectedRows: [],
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline" style={{ marginBottom: 10 }}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="房间">
              {getFieldDecorator('room')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderOperationForm() {
    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginBottom: 16 }}>
        <Col md={3} sm={24}>
          <Button icon="plus" type="primary" onClick={() => this.showAddSuper()}>
            新赠
          </Button>
        </Col>
        <Col md={3} sm={24}>
          <Button icon="edit" type="primary" onClick={() => this.cancelSuper()}>
            删除
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    const {
      rechargeAmount: { rechargeAmountData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;

    return (
      <PageHeaderWrapper title="机器人配置">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {this.renderOperationForm()}
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={rechargeAmountData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <Modal
          destroyOnClose
          title="修改额度"
          visible={this.state.isShowModifyModel} // eslint-disable-line
          onOk={() => {
            this.setState({
              isShowModifyModel: false,
            });
            this.sendModify();
          }}
          onCancel={() => {
            this.setState({
              isShowModifyModel: false,
            });
          }}
        >
          <ModifyInfo wrappedComponentRef={inst => (this.modifyInfo = inst)} selectedItem={row} />
        </Modal>

        <Modal
          destroyOnClose
          title="新增额度"
          visible={this.state.isShowAddSuperModel} // eslint-disable-line
          onOk={() => {
            this.setState({
              isShowAddSuperModel: false,
            });
            this.sendAddSuper();
          }}
          onCancel={() => {
            this.setState({
              isShowAddSuperModel: false,
            });
          }}
        >
          <AddSuper wrappedComponentRef={inst => (this.addSuper = inst)} />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default rechargeA;

@Form.create()
class ModifyInfo extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedItem } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="金额" {...formItemLayout}>
            {getFieldDecorator('cost', {
              initialValue: selectedItem.cost,
            })(<Input />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

@Form.create()
class AddSuper extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="输入额度" {...formItemLayout}>
            {getFieldDecorator('cost', {})(<InputNumber />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

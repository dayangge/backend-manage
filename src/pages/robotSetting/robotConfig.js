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

import styles from './robotSetting.less';

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
@connect(({ robotSetting, loading }) => ({
  robotSetting,
  loading: loading.models.robotSetting,
}))
@Form.create()
class robotConfig extends PureComponent {
  state = {
    isShowModifyModel: false,
    isShowAddSuperModel: false,
    selectedRows: [],
    row: {},
  };

  columns = [
    {
      title: '房间',
      dataIndex: 'room',
    },
    {
      title: '机器数目',
      dataIndex: 'number',
    },
    {
      title: '服务模式',
      dataIndex: 'task',
    },
    {
      title: '进入时间',
      dataIndex: 'gameTime',
    },
    {
      title: '离开时间',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '携带最少分数',
      dataIndex: 'n1',
    },
    {
      title: '携带最大分数',
      dataIndex: 'n2',
    },
    {
      title: '进入最小间隔',
      dataIndex: 'n3',
    },
    {
      title: '进入最大间隔',
      dataIndex: 'n4',
    },
    {
      title: '离开最小间隔',
      dataIndex: 'n5',
    },
    {
      title: '离开最大间隔',
      dataIndex: 'n6',
    },
    {
      title: '换桌最小局数',
      dataIndex: 'n7',
    },
    {
      title: '换桌最大局数',
      dataIndex: 'n8',
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
            <Icon type="edit" />
          </a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'robotSetting/fetchRobotInfo',
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

  handleGameLogTableChange = pagination => {
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

  /* 重置所有表单 */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'robotSetting/fetchRobotInfo',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
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
        type: 'robotSetting/fetchRobotInfo',
        payload: values,
      });
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
    selectedRows.map(val => words.push(val.key));
    const params = {
      words,
    };
    const ui = words.join(',');
    confirm({
      title: '取消授权',
      content: `你要删除${ui}机器人？`,
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

  renderForm() {
    return this.renderSimpleForm();
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
          <Button icon="delete" type="primary" onClick={() => this.cancelSuper()}>
            取消授权
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    const {
      robotSetting: { robotInfoData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;

    return (
      <PageHeaderWrapper title="机器人配置">
        <Card bordered={false}>
          {this.renderForm()}
          <div className={styles.tableList}>
            {this.renderOperationForm()}
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={robotInfoData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <Modal
          destroyOnClose
          title="查看输赢详情"
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
          title="添加权限"
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

export default robotConfig;

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
          <FormItem label="房间类型" {...formItemLayout}>
            {getFieldDecorator('key', {
              initialValue: selectedItem.room,
            })(<Input disabled />)}
          </FormItem>
          <FormItem label="机器人数目" {...formItemLayout}>
            {getFieldDecorator('userID', {
              initialValue: selectedItem.userID,
            })(<InputNumber />)}
          </FormItem>
          <FormItem label="服务模式" {...formItemLayout}>
            {getFieldDecorator('service', {
              initialValue: [`${selectedItem.task}`],
            })(
              <CheckboxGroup>
                <Checkbox value="0">相互模拟型</Checkbox>
                <Checkbox value="1">被动挨打</Checkbox>
                <Checkbox value="2">主动陪打</Checkbox>
                <Checkbox value="3">串场模式</Checkbox>
              </CheckboxGroup>
            )}
          </FormItem>
          <FormItem label="进入时间" {...formItemLayout}>
            {getFieldDecorator('inTime', {
              initialValue: moment('12:08:23', 'HH:mm:ss'),
            })(<TimePicker />)}
          </FormItem>
          <FormItem label="进入时间" {...formItemLayout}>
            {getFieldDecorator('outTime', {
              initialValue: moment('23:59:59', 'HH:mm:ss'),
            })(<TimePicker />)}
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem label="携带分数" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('score', {
                  initialValue: '10',
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={4}>
              <span className={styles.inputUnit}>分</span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="进入间隔" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('inInterval', {
                  initialValue: 10,
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={4}>
              <span className={styles.inputUnit}>分</span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="离开间隔" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('outInterval', {
                  initialValue: 10,
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={4}>
              <span className={styles.inputUnit}>分</span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="换桌局数" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('tableRound', {
                  initialValue: 10,
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={4}>
              <span className={styles.inputUnit}>分</span>
            </Col>
          </Row>
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
          <FormItem label="房间类型" {...formItemLayout}>
            {getFieldDecorator('key', {
              initialValue: '炸金花-体验场',
            })(
              <Select>
                {roomList.map(val => (
                  <Option value={val}>{val}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="机器人数目" {...formItemLayout}>
            {getFieldDecorator('userID', {})(<InputNumber />)}
          </FormItem>
          <FormItem label="服务模式" {...formItemLayout}>
            {getFieldDecorator('service', {})(
              <CheckboxGroup>
                <Checkbox value="0">相互模拟型</Checkbox>
                <Checkbox value="1">被动挨打</Checkbox>
                <Checkbox value="2">主动陪打</Checkbox>
                <Checkbox value="3">串场模式</Checkbox>
              </CheckboxGroup>
            )}
          </FormItem>
          <FormItem label="进入时间" {...formItemLayout}>
            {getFieldDecorator('inTime', {
              initialValue: moment('12:08:23', 'HH:mm:ss'),
            })(<TimePicker />)}
          </FormItem>
          <FormItem label="进入时间" {...formItemLayout}>
            {getFieldDecorator('outTime', {
              initialValue: moment('23:59:59', 'HH:mm:ss'),
            })(<TimePicker />)}
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem label="携带分数" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('score', {
                  initialValue: '10',
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={4}>
              <span className={styles.inputUnit}>分</span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="进入间隔" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('inInterval', {
                  initialValue: 10,
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={4}>
              <span className={styles.inputUnit}>分</span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="离开间隔" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('outInterval', {
                  initialValue: 10,
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={4}>
              <span className={styles.inputUnit}>分</span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="换桌局数" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('tableRound', {
                  initialValue: 10,
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={4}>
              <span className={styles.inputUnit}>分</span>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

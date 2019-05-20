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
  Table,
  DatePicker,
  Divider,
  Select,
  Badge,
  Popconfirm,
  Modal,
  InputNumber,
  message,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const { TextArea } = Input;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ taskManage, loading }) => ({
  taskManage,
  loading: loading.models.taskManage,
}))
@Form.create()
class taskManage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
    isShowModifyModel: false,
  };

  columns = [
    {
      title: '任务标识',
      dataIndex: 'key',
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
    },
    {
      title: '任务类型',
      dataIndex: 'taskType',
    },
    {
      title: '所属游戏',
      dataIndex: 'game',
    },
    {
      title: '时间限制（单位：秒）',
      dataIndex: 'timeLimit',
    },
    {
      title: '录入日期',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      dataIndex: 'status1',
      render: (val, record, text) => {
        return (
          <Fragment>
            <Button
              type="primary"
              onClick={() => {
                this.showModifyInfo(text, record);
              }}
            >
              更新
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除?"
              onConfirm={() => {
                this.deleteItem();
              }}
            >
              <Button
                onClick={() => {
                  this.selectRow(text, record);
                }}
              >
                删除
              </Button>
            </Popconfirm>
          </Fragment>
        );
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'taskManage/fetchTaskManage',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'taskManage/fetchTaskManage',
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

  deleteItem = () => {
    const { row } = this.state;
    console.log(row);
  };

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
      title: '删除服务器',
      content: `你要删除${ui}？`,
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

  sendModify = () => {
    const data = this.modifyInfo.props.form.getFieldsValue();
    console.log(data);
  };

  sendAddSuper = () => {
    const data = this.addSuper.props.form.getFieldsValue();
    console.log(data);
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
        type: 'taskManage/fetchTaskManage',
        payload: values,
      });
    });
  };

  /* 一系列对于表格的操作 */

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={4} sm={24}>
            <FormItem label="查询用户">{getFieldDecorator('name')(<Input />)}</FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="查询方式">
              {getFieldDecorator('type')(
                <Select>
                  <Option value="1">用户账号</Option>
                  <Option value="2">游戏ID</Option>
                  <Option value="3">用户标识</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="选择时期">{getFieldDecorator('date')(<DatePicker />)}</FormItem>
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
          <Button icon="delete" type="primary" onClick={() => this.cancelSuper()}>
            删除
          </Button>
        </Col>
      </Row>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      taskManage: { taskManageData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <PageHeaderWrapper title="任务管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {this.renderOperationForm()}
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={taskManageData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <Modal
          destroyOnClose
          title="修改"
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
          title="添加"
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

export default taskManage;

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
          <FormItem label="任务名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '必填' }],
              initialValue: '斗地主',
            })(<Input />)}
          </FormItem>
          <FormItem label="任务类型" {...formItemLayout}>
            {getFieldDecorator('ip', {})(<Input />)}
          </FormItem>

          <FormItem label="可领取任务的用户类型" {...formItemLayout}>
            {getFieldDecorator('port', {})(
              <Select>
                <Option value={1}>普通玩家</Option>
                <Option value={2}>会员玩家</Option>
              </Select>
            )}
          </FormItem>

          <FormItem label="所属游戏" {...formItemLayout}>
            {getFieldDecorator('account', {})(
              <Select>
                <Option value={1}>普通玩家</Option>
                <Option value={2}>会员玩家</Option>
              </Select>
            )}
          </FormItem>

          <FormItem label="普通玩家奖励金币" {...formItemLayout}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '必填' }],
            })(<InputNumber />)}
          </FormItem>

          <FormItem label="时间限制" {...formItemLayout}>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '必填' }],
            })(<Input />)}
          </FormItem>

          <FormItem label="目标局数" {...formItemLayout}>
            {getFieldDecorator('round', {
              rules: [{ required: true, message: '必填' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="任务描述" {...formItemLayout}>
            {getFieldDecorator('desc', {})(<TextArea />)}
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
          <FormItem label="任务名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '必填' }],
              initialValue: '斗地主',
            })(<Input />)}
          </FormItem>
          <FormItem label="任务类型" {...formItemLayout}>
            {getFieldDecorator('ip', {})(<Input />)}
          </FormItem>
          <FormItem label="可领取任务的用户类型" {...formItemLayout}>
            {getFieldDecorator('port', {})(
              <Select>
                <Option value="1">普通玩家</Option>
                <Option value="2">会员玩家</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="所属游戏" {...formItemLayout}>
            {getFieldDecorator('account', {})(
              <Select>
                <Option value={1}>普通玩家</Option>
                <Option value={2}>会员玩家</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="普通玩家奖励金币" {...formItemLayout}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '必填' }],
            })(<InputNumber />)}
          </FormItem>
          <FormItem label="时间限制" {...formItemLayout}>
            {getFieldDecorator('time', {
              rules: [{ required: true, message: '必填' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="目标局数" {...formItemLayout}>
            {getFieldDecorator('round', {
              rules: [{ required: true, message: '必填' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="任务描述" {...formItemLayout}>
            {getFieldDecorator('code1', {})(<TextArea />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

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

import styles from './controlSystem.less';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;
const TabPane = Tabs.TabPane;

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['开启', '权停'];

/* eslint react/no-multi-comp:0 */
@connect(({ controlSystem, loading }) => ({
  controlSystem,
  loading: loading.models.controlSystem,
}))
@Form.create()
class superControl extends PureComponent {
  state = {
    isShowModifyModel: false,
    isShowAddSuperModel: false,
    selectedRows: [],
    row: {},
  };

  columns = [
    {
      title: '超权账号',
      dataIndex: 'account',
    },
    {
      title: '超权ID',
      dataIndex: 'key',
    },
    {
      title: '跟踪ID',
      dataIndex: 'userID',
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
            更新
          </a>
        </Fragment>
      ),
    },
  ];

  columns2 = [
    {
      title: '操作方式',
      dataIndex: 'key',
    },
    {
      title: '超权ID',
      dataIndex: 'room',
    },
    {
      title: '跟踪ID',
      dataIndex: 'userID',
    },
    {
      title: '管理员',
      dataIndex: 'operator',
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'controlSystem/fetchUserControl',
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
      type: 'controlSystem/fetchUserControl',
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
      type: 'controlSystem/fetchUserControl',
      payload: params,
    });
  };

  /* 重置所有表单 */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'controlSystem/fetchUserControl',
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
        type: 'controlSystem/fetchUserControl',
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
      content: `你要删除${ui}授权？`,
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
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="超权ID">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="跟踪ID">
              {getFieldDecorator('status')(<Input placeholder="请输入" />)}
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
      controlSystem: { userControlData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;

    return (
      <PageHeaderWrapper title="超权管理">
        <Card bordered={false}>
          {this.renderForm()}
          <Tabs defaultActiveKey="1">
            <TabPane tab="百人游戏" key="1">
              <div className={styles.tableList}>
                {this.renderOperationForm()}
                <StandardTable
                  selectedRows={selectedRows}
                  loading={loading}
                  data={userControlData}
                  columns={this.columns}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleStandardTableChange}
                />
              </div>
            </TabPane>
            <TabPane tab="游戏日志" key="2">
              <div className={styles.tableList}>
                <StandardTable
                  selectedRows={selectedRows}
                  loading={loading}
                  data={userControlData}
                  columns={this.columns2}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleGameLogTableChange}
                />
              </div>
            </TabPane>
          </Tabs>
        </Card>

        <Modal
          destroyOnClose
          title="修改信息"
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

export default superControl;

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
          <FormItem label="超权ID" {...formItemLayout}>
            {getFieldDecorator('key', {
              initialValue: selectedItem.key,
            })(<Input disabled />)}
          </FormItem>
          <FormItem label="跟踪ID" {...formItemLayout}>
            {getFieldDecorator('userID', {
              initialValue: selectedItem.userID,
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
          <FormItem label="超权ID" {...formItemLayout}>
            {getFieldDecorator('win')(<Input />)}
          </FormItem>
          <FormItem label="跟踪ID" {...formItemLayout}>
            {getFieldDecorator('task')(<Input />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

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
  Badge,
  Button,
  Modal,
  message,
  DatePicker,
  Table,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './userManage.less';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;
const status = ['是', '否'];
const statusMap = ['default', 'processing', 'success', 'error'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="限制IP地址"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="限制IP地址">
        {form.getFieldDecorator('restrictedIP', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="失效时间">
        {form.getFieldDecorator('invalidTime', {
          rules: [{ required: true, message: '请输入至少失效时间！' }],
        })(<DatePicker placeholder="请输入失效时间" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
        {form.getFieldDecorator('mark', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ restrictedMachineCode, loading }) => ({
  restrictedMachineCode,
  loading: loading.models.restrictedMachineCode,
}))
@Form.create()
class restrictedMachineCodeTable extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    isShowMachineCodeListInfoModel: false,
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '管理',
      dataIndex: 'userAccount',
    },
    {
      title: '限制机器',
      dataIndex: 'registerNumber',
    },
    {
      title: '限制登录',
      dataIndex: 'status',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '限制注册',
      dataIndex: 'winRound',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '失效时间',
      dataIndex: 'oldTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '录入时间',
      dataIndex: 'newTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '备注',
      dataIndex: 'mark',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'restrictedMachineCode/fetchRestrictedMachineCode',
    });
  }

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'restrictedMachineCode/fetchRestrictedMachineCode',
      payload: params,
    });
  };

  /* 展示list信息 */
  showIPlist = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restrictedMachineCode/fetchMachineCodeList',
    });
    this.setState({
      isShowMachineCodeListInfoModel: true,
    });
  };

  /* 重置所有表单 */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'restrictedMachineCode/fetchRestrictedMachineCode',
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

      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleDeleteCharacter = () => {
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
      title: '删除机器码',
      content: `你要删除${ui}机器码？`,
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

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restrictedMachineCode/addRestrictedMachineCode',
      payload: {},
      callback: dispatch({
        type: 'restrictedMachineCode/fetchRestrictedMachineCode',
        payload: {},
      }),
    });
    message.success('添加成功');
    this.handleModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderOperationForm() {
    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={3} sm={24}>
          <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            新建
          </Button>
        </Col>
        <Col md={3} sm={24}>
          <Button icon="delete" type="primary" onClick={() => this.handleDeleteCharacter(true)}>
            删除
          </Button>
        </Col>
        <Col md={3} sm={24}>
          <Button icon="edit" type="primary" onClick={() => this.showIPlist()}>
            IP地址注册数
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
      restrictedMachineCode: { restrictedMachineCodeData },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="限制IP地址">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>{this.renderOperationForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={restrictedMachineCodeData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <Modal
          title="查看限制IP"
          visible={this.state.isShowMachineCodeListInfoModel} // eslint-disable-line
          width={800}
          onOk={() => {
            this.setState({
              isShowMachineCodeListInfoModel: false,
            });
          }}
          onCancel={() => {
            this.setState({
              isShowMachineCodeListInfoModel: false,
            });
          }}
        >
          <RestrictedIPList />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default restrictedMachineCodeTable;

@connect(({ restrictedMachineCode, loading }) => ({
  restrictedMachineCode,
  loading: loading.models.restrictedMachineCode,
}))
class RestrictedIPList extends PureComponent {
  state = {
    selectedRows: [],
  };

  componentDidMount() {}

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });

    const query = {
      currentPage: pagination.current,
    };

    dispatch({
      type: 'restrictedMachineCode/fetchRestrictedMachineCodeList',
      payload: query,
    });
  };

  handleOperation = () => {
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
      title: '删除字符',
      content: `你要删除${ui}ip`,
      onOk() {
        self.handleDelete(params);
      },
      onCancel() {},
    });
  };

  handleDelete = params => {
    console.log(params);
    this.setState({
      selectedRows: [],
    });
  };

  render() {
    const columns = [
      {
        title: '排名',
        dataIndex: 'key',
      },
      {
        title: '机器码',
        dataIndex: 'ip',
      },
      {
        title: '注册人数',
        dataIndex: 'registerNumber',
      },
      {
        title: '限制登录',
        dataIndex: 'status',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '限制注册',
        dataIndex: 'winRound',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '限制失效的时间',
        dataIndex: 'loginTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];
    const {
      restrictedMachineCode: { restrictedMachineCodeData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    return (
      <Fragment>
        <div className={styles.tableListOperator}>
          <Row style={{ marginBottom: '10px' }}>
            <Col md={3} sm={24}>
              <Button icon="delete" type="primary" onClick={() => this.handleOperation()}>
                永久限制登录注册
              </Button>
            </Col>
          </Row>
        </div>
        {restrictedMachineCodeData ? (
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={restrictedMachineCodeData}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleTableChange}
          />
        ) : (
          'loading'
        )}
      </Fragment>
    );
  }
}

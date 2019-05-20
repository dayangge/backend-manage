import React, { PureComponent } from 'react';
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
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './userManage.less';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

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
      title="限制字符"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="限制字符">
        {form.getFieldDecorator('character', {
          rules: [{ required: true }],
        })(<Input placeholder="请输入限制字符" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="失效时间">
        {form.getFieldDecorator('invalidTime', {
          rules: [{ required: true, message: '请输入至少失效时间！' }],
        })(<DatePicker placeholder="请输入失效时间" />)}
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ restrictedCharacter, loading }) => ({
  restrictedCharacter,
  loading: loading.models.restrictedCharacter,
}))
@Form.create()
class restrictedCharacter extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
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
      title: '限制字符',
      dataIndex: 'character',
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
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'restrictedCharacter/fetchRestrictedCharacter',
    });
  }

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'restrictedCharacter/fetchRestrictedCharacter',
      payload: params,
    });
  };

  /* 重置所有表单 */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'restrictedCharacter/fetchRestrictedCharacter',
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
      title: '删除字符',
      content: `你要删除${ui}这些字符`,
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
      type: 'restrictedCharacter/addRestrictedCharacter',
      payload: {},
      callback: dispatch({
        type: 'restrictedCharacter/fetchRestrictedCharacter',
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
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
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
      </Row>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      restrictedCharacter: { restrictedCharacterData },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="用户管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>{this.renderOperationForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={restrictedCharacterData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default restrictedCharacter;

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Button, Input, DatePicker, Select, Modal, Badge } from 'antd';
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
@connect(({ agentSystemManage, pervUrl, agentID, loading }) => ({
  agentSystemManage,
  pervUrl,
  agentID,
  loading: loading.models.agentSystemManage,
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
      title: '微信号',
      dataIndex: 'weixin',
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
                this.turnToModifyPage(text, record);
              }}
            >
              详细信息
            </Button>
          </Fragment>
        );
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'agentSystemManage/fetch',
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
      type: 'agentSystemManage/fetch',
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

  turnToModifyPage = (id, record) => {
    const { dispatch, match } = this.props;
    const url = match.path;
    dispatch({
      type: 'pervUrl/saveAgentUrl',
      payload: url,
    });
    dispatch({
      type: 'agentID/saveAgentID',
      payload: id,
    });
    router.push(`/agentDetail/detail?id=${id}`);
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
        type: 'agentSystemManage/fetch',
        payload: values,
      });
    });
  };

  renderOperationForm() {
    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginBottom: 16 }}>
        <Col md={3} sm={24}>
          <Button icon="plus" type="primary" onClick={() => this.turnToAddPage()}>
            新增
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
      agentSystemManage: { agentManageListData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <PageHeaderWrapper title="代理管理">
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableListOperator">{this.renderOperationForm()}</div>
            <ETable
              selectedRows={selectedRows}
              loading={loading}
              data={agentManageListData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

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

export default Manage;

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

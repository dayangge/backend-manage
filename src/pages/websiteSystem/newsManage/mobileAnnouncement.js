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
  Checkbox,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from '../index.less';

const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const { TextArea } = Input;
const status = ['禁用', '开启'];
const statusMap = ['default', 'processing', 'success', 'error'];

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ websiteNewsManage, loading }) => ({
  websiteNewsManage,
  loading: loading.models.websiteNewsManage,
}))
@Form.create()
class Mobile extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
    isShowModifyModel: false,
    isShowAddSuperModel: false,
  };

  columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '类别',
      dataIndex: 'type',
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '置顶',
      dataIndex: 'status',
      render: val => {
        if (val === 0) {
          return '是';
        }
        return '否';
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '时间',
      dataIndex: 'time',
    },
    {
      title: '操作',
      dataIndex: 'status1',
      render: (val, record, text) => {
        if (val === 0) {
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
                title="确定发布?"
                onConfirm={() => {
                  this.openNews();
                }}
              >
                <Button
                  onClick={() => {
                    this.selectRow(text, record);
                  }}
                >
                  发布
                </Button>
              </Popconfirm>
            </Fragment>
          );
        }
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
              title="确定关闭?"
              onConfirm={() => {
                this.closeNews();
              }}
            >
              <Button
                type="danger"
                onClick={() => {
                  this.selectRow(text, record);
                }}
              >
                关闭
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
      type: 'websiteNewsManage/fetchWebsiteNewsManage',
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
      type: 'websiteNewsManage/fetchWebsiteNewsManage',
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

  openNews = () => {
    const { row } = this.state;
    console.log(row);
    message.info('发布成功');
  };

  closeNews = () => {
    const { row } = this.state;
    console.log(row);
    message.info('关闭成功');
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
    selectedRows.map(val => words.push(val.title));
    const params = {
      words,
    };
    const ui = words.join(',');
    confirm({
      title: '删除',
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
        type: 'websiteNewsManage/fetchWebsiteNewsManage',
        payload: values,
      });
    });
  };

  /* 一系列对于表格的操作 */

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

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      websiteNewsManage: { websiteNewsManageData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    console.log(this.props);
    return (
      <div>
        <div className={styles.tableList}>
          {this.renderOperationForm()}
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={websiteNewsManageData}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </div>

        <Modal
          destroyOnClose
          title="更新"
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
          title="新增"
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
      </div>
    );
  }
}

export default Mobile;

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
          <FormItem label="标题" {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: selectedItem.title,
            })(<Input />)}
          </FormItem>
          <FormItem label="内容" {...formItemLayout}>
            {getFieldDecorator('content', {
              initialValue: selectedItem.content,
            })(<TextArea />)}
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
          <FormItem label="标题" {...formItemLayout}>
            {getFieldDecorator('title', {})(<Input />)}
          </FormItem>
          <FormItem label="内容" {...formItemLayout}>
            {getFieldDecorator('content', {})(<TextArea />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

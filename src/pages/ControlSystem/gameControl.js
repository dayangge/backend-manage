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
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './controlSystem.less';

const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['开启', '权停'];

/* eslint react/no-multi-comp:0 */
@connect(({ controlSystem, loading }) => ({
  controlSystem,
  loading: loading.models.controlSystem,
}))
@Form.create()
class gameControl extends PureComponent {
  state = {
    isShowModifyModel: false,
    selectedRows: [],
    row: {},
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'key',
    },
    {
      title: '房间名',
      dataIndex: 'room',
    },
    {
      title: '房间损耗（不含今日）',
      dataIndex: 'win',
    },
    {
      title: '今日房间损耗',
      dataIndex: 'task',
    },
    {
      title: '机器人胜率',
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
      title: '操作',
      dataIndex: 'edit',
      render: (text, record) => (
        <Fragment>
          <a
            onClick={() => {
              this.showModifyInfo(text, record);
            }}
          >
            修改
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
      type: 'controlSystem/fetchUserControl',
    });
  }

  handleOperation = () => {};

  showModifyInfo = (text, record) => {
    this.setState({
      row: record,
      isShowModifyModel: true,
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

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      controlSystem: { userControlData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;

    return (
      <PageHeaderWrapper title="游戏控制">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={userControlData}
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
      </PageHeaderWrapper>
    );
  }
}

export default gameControl;

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
          <FormItem label="修改比率" {...formItemLayout}>
            {getFieldDecorator('rate', {
              initialValue: selectedItem.rate,
            })(<Input />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

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
  Select,
  Badge,
  Popconfirm,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './recharge.less';

const { Option } = Select;
const FormItem = Form.Item;

const status = ['禁用', '开启'];
const statusMap = ['default', 'processing', 'success', 'error'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ rechargeChannel, loading }) => ({
  rechargeChannel,
  loading: loading.models.rechargeChannel,
}))
@Form.create()
class RechargeChannel extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
  };

  columns = [
    {
      title: '排序',
      dataIndex: 'key',
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '渠道名称',
      dataIndex: 'payList',
    },
    {
      title: '操作',
      dataIndex: 'status1',
      render: (val, record, text) => {
        if (val === 1) {
          return (
            <Popconfirm
              title="确定关闭?"
              onConfirm={() => {
                this.openToClose();
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
          );
        }
        return (
          <Popconfirm
            title="确定开启?"
            onConfirm={() => {
              this.closeToOpen();
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                this.selectRow(text, record);
              }}
            >
              开启
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rechargeChannel/fetchRechargeChannel',
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
      type: 'rechargeChannel/fetchRechargeChannel',
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

  closeToOpen = () => {
    const { row } = this.state;
    console.log(row);
  };

  openToClose = () => {
    const { row } = this.state;
    console.log(row);
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
        type: 'rechargeChannel/fetchRechargeChannel',
        payload: values,
      });
    });
  };

  /* 一系列对于表格的操作 */

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      rechargeChannel: { rechargeChannelData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    return (
      <PageHeaderWrapper title="充值渠道">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={rechargeChannelData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default RechargeChannel;

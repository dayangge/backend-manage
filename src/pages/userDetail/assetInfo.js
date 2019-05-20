import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Badge,
  Table,
  Divider,
  Button,
  Modal,
  Form,
  Input,
  message,
  Select,
  Checkbox,
} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import moment from 'moment';
import styles from './userDetail.less';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

@connect(({ userInfo, loading }) => ({
  userInfo,
  loading: loading.effects.userInfo,
}))
class assetInfo extends Component {
  state = {
    pagination: {},
  };

  columns = [
    {
      title: '时间',
      dataIndex: 'time',
    },
    {
      title: '游戏',
      dataIndex: 'game',
    },
    {
      title: '房间',
      dataIndex: 'room',
    },
    {
      title: '登录地址',
      dataIndex: 'loginIP',
    },
  ];

  componentDidMount() {
    const { dispatch, userInfo } = this.props;
    const { userID } = userInfo;
    const params = {
      id: userID,
    };
    dispatch({
      type: 'userInfo/fetchTable',
      payload: params,
    });
  }

  handleStandardTableChange = page => {
    const { dispatch } = this.props;
    /* const { tableQuery } = this.state; */
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
      /* query: tableQuery */
    };

    dispatch({
      type: 'userInfo/fetchTable',
      payload: params,
      callback: response => {
        const { pagination } = response;
        this.setState({
          pagination,
        });
      },
    });
  };

  render() {
    const {
      userInfo: { table },
      loading,
    } = this.props;
    const { list } = table;
    return (
      <Fragment>
        <DescriptionList size="large" title="财富信息" style={{ marginBottom: 32 }}>
          <Description term="ID号码">335219</Description>
          <Description term="账号">1395245622</Description>
          <Description term="携带金额">00.00</Description>
          <Description term="保险柜金额">好几个亿</Description>
          <Description term="赢局">0</Description>
          <Description term="输局">100</Description>
          <Description term="和局">0</Description>
          <Description term="逃局">52</Description>
          <Description term="游戏税收">52.00</Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="登录信息" style={{ marginBottom: 32 }}>
          <Description term="网站登录次数">1</Description>
          <Description term="登录房间次数">1</Description>
          <Description term="大厅登录次数">1</Description>
          <Description term="在线时长共计">1小时22分22秒</Description>
          <Description term="游戏时长共计">1小时</Description>
          <Description term="最后登录地址">146.88.206.152 美国</Description>
          <Description term="登录机器">185SEFGSF54SEDFD5</Description>
          <Description term="注册机器">-----</Description>
          <Description term="注册来源">WEB</Description>
          <Description term="注册时间">2019-04-25 13:00:00</Description>
          <Description term="注册地址">146.22.22.22 美国</Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        <DescriptionList size="large" title="卡线信息" style={{ marginBottom: 32 }}>
          <Table
            loading={loading}
            dataSource={list}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handleStandardTableChange}
          />
        </DescriptionList>
      </Fragment>
    );
  }
}

export default assetInfo;

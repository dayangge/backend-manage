import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Button, Input, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './userManage.less';

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */
@connect(({ gameCoinLog, loading }) => ({
  gameCoinLog,
  loading: loading.models.gameCoinLog,
}))
@Form.create()
class GameCoinLog extends PureComponent {
  state = {
    selectedRows: [],
    pagination: {},
  };

  columns = [
    {
      title: '游戏ID',
      dataIndex: 'gameID',
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
    },
    {
      title: '用户昵称',
      dataIndex: 'userNickname',
    },
    {
      title: '携带游戏币',
      dataIndex: 'takeGameCoin',
    },
    {
      title: '保险柜游戏币',
      dataIndex: 'strongboxGameCoin',
    },
    {
      title: '携带+保险柜',
      dataIndex: 'totalGameCoin',
    },
    {
      title: '税收',
      dataIndex: 'tax',
    },
    {
      title: '总局',
      dataIndex: 'totalRound',
    },
    {
      title: '赢局',
      dataIndex: 'winRound',
    },
    {
      title: '输局',
      dataIndex: 'lossRound',
    },
    {
      title: '和局',
      dataIndex: 'tie',
    },
    {
      title: '逃局',
      dataIndex: 'runRound',
    },
    {
      title: '登录次数',
      dataIndex: 'loginTimes',
    },
    {
      title: '游戏时长',
      dataIndex: 'gameTime',
    },
    {
      title: '在线时长',
      dataIndex: 'onlineTime',
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
    },
    {
      title: '最后登录地址',
      dataIndex: 'lastLoginAddress',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gameCoinLog/fetchGameCoinLog',
    });
  }

  handleStandardTableChange = page => {
    const { dispatch } = this.props;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
    };
    dispatch({
      type: 'gameCoinLog/fetchGameCoinLog',
      payload: params,
      callback: response => {
        const { pagination } = response;
        this.setState({
          pagination,
        });
      },
    });
  };

  /* 重置所有表单 */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'gameCoinLog/fetchGameCoinLog',
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
        type: 'gameCoinLog/search',
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
          <Col md={6} sm={24}>
            <FormItem label="用户名称">
              {getFieldDecorator('name')(<Input placeholder="请输入玩家账号" />)}
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

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      gameCoinLog: { gameCoinLog },
    } = this.props;
    const { selectedRows } = this.state;
    const dataSource = gameCoinLog.list;
    return (
      <PageHeaderWrapper title="游戏币记录">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              selectedRows={selectedRows}
              dataSource={dataSource}
              columns={this.columns}
              pagination={this.state.pagination}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default GameCoinLog;

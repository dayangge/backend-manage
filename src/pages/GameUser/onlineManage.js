import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, Button, Badge } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SimpleCountDown from '@/components/SimpleCountDown';

import styles from './userManage.less';

const targetTime = 10;

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['权停', '开启'];
const gameList = [
  '游戏',
  '大厅',
  '炸金花',
  '看牌牛牛',
  '通比牛牛',
  '百人牛牛',
  '中发白',
  '百人牌九',
  '百家乐',
  '龙凤斗',
  '不洗牌斗地主',
  '红黑大战',
  '水果拉霸',
  '李逵',
  '蛟龙出海',
  '时时彩',
];

/* eslint react/no-multi-comp:0 */
@connect(({ onlineManage, loading }) => ({
  onlineManage,
  loading: loading.models.onlineManage,
}))
@Form.create()
class onlineManage extends PureComponent {
  state = {
    selectedRows: [],
    pause: false,
    pauseText: '暂停',
  };

  columns = [
    {
      title: '玩家ID',
      dataIndex: 'userID',
    },
    {
      title: '玩家账号',
      dataIndex: 'userAccount',
    },
    {
      title: '携带金币',
      dataIndex: 'gold',
      render: val => <Fragment>{`${val}个`}</Fragment>,
    },
    {
      title: '银行金币',
      dataIndex: 'bankGold',
      render: val => <Fragment>{`${val}个`}</Fragment>,
    },
    {
      title: '总输赢',
      dataIndex: 'winTotal',
    },
    {
      title: '总充值',
      dataIndex: 'rechargeTotal',
    },
    {
      title: '提现总额',
      dataIndex: 'withdrawTotal',
    },
    {
      title: '任务奖励',
      dataIndex: 'rewards',
      render: val => <Fragment>{`${val}元`}</Fragment>,
    },
    {
      title: '代理商',
      dataIndex: 'agent',
    },
    {
      title: '所在游戏',
      dataIndex: 'inGame',
    },
    {
      title: '所在房间',
      dataIndex: 'inRoom',
    },
    {
      title: '最后登录IP',
      dataIndex: 'lastLoginAddress',
    },
    {
      title: 'IP归属地',
      dataIndex: 'address',
    },
    {
      title: '最后登录时间',
      dataIndex: 'loginTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '游戏时间',
      dataIndex: 'gameTime',
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
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'onlineManage/fetchOnlineManage',
    });
  }

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'onlineManage/fetchOnlineManage',
      payload: params,
    });
  };

  /* 刷新表格所有表单 */
  handleFormReflush = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'onlineManage/fetchOnlineManage',
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
        type: 'onlineManage/search',
        payload: values,
      });
    });
  };

  /* 一系列对于表格的操作 */

  handleSetSpecial = () => {};

  handleCancelSpecial = () => {};

  handleDisbandTable = () => {};

  handleOutHall = () => {};

  handleFreeze = () => {};

  handleThaw = () => {};

  handleGivingGold = () => {};

  handleGivingSmartAccount = () => {};

  handleModifyAddress = () => {};

  /* 控制倒计时 */
  handleControlPause = () => {
    const { pause } = this.state;
    if (pause) {
      this.setState({
        pause: false,
        pauseText: '暂停',
      });
    } else {
      this.setState({
        pause: true,
        pauseText: '开始',
      });
    }
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="查询方式">
              {getFieldDecorator('name')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">玩家ID</Option>
                  <Option value="1">玩家账号</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="所在游戏">
              {getFieldDecorator('inGame')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {gameList.map(value => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <SimpleCountDown lastTime={targetTime} isPause={this.state.pause} />
              <Button style={{ marginLeft: 8 }} onClick={this.handleControlPause}>
                {this.state.pauseText}
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
        <Col md={24} sm={24}>
          <Button icon="check-circle" type="primary" onClick={() => this.handleSetSpecial(true)}>
            设为特殊
          </Button>
          <Button icon="edit" type="primary" onClick={() => this.handleCancelSpecial(true)}>
            取消特殊
          </Button>
          <Button icon="edit" type="primary" onClick={() => this.handleDisbandTable(true)}>
            解散桌子
          </Button>

          <Button icon="edit" type="primary" onClick={() => this.handleOutHall(true)}>
            踢出
          </Button>

          <Button icon="edit" type="primary" onClick={() => this.handleFreeze(true)}>
            冻结
          </Button>

          <Button icon="check-circle" type="primary" onClick={() => this.handleThaw(true)}>
            解冻
          </Button>

          <Button icon="pay-circle" type="primary" onClick={() => this.handleGivingGold(true)}>
            赠送游戏币
          </Button>

          <Button icon="skin" type="primary" onClick={() => this.handleGivingSmartAccount(true)}>
            赠送靓号
          </Button>

          <Button icon="environment" type="primary" onClick={() => this.handleModifyAddress(true)}>
            修改归属地
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
      onlineManage: { onlineManageData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper title="在线管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>{this.renderOperationForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={onlineManageData}
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

export default onlineManage;

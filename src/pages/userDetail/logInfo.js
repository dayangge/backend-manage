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
  Row,
  Col,
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

const tableMap = {
  accountLog: '历史账号修改记录',
  nicknameLog: '历史昵称修改记录',
  passwordLog: '历史密码修改记录',
  inOutLog: '进出记录',
  gameLog: '游戏记录',
  safeBoxLog: '保险柜记录',
  chargeLog: '充值记录',
  goldLog: '金币变化记录',
  withdrawLog: '提现记录',
  winLog: '游戏总输赢记录',
};

@connect(({ userInfo, loading }) => ({
  userInfo,
  loading: loading.effects.userInfo,
}))
class assetInfo extends Component {
  state = {
    pagination: {},
    tableType: '',
    tableHeader: '今天',
    tableQuery: 'today',
  };

  columns1 = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '日期',
      dataIndex: 'date',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'IP',
      dataIndex: 'loginIP',
    },
    {
      title: '历史账号',
      dataIndex: 'account',
    },
    {
      title: '操作管理员',
      dataIndex: 'operation',
    },
  ];

  columns2 = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '日期',
      dataIndex: 'date',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'IP',
      dataIndex: 'loginIP',
    },
    {
      title: '历史昵称',
      dataIndex: 'nickname',
    },
    {
      title: '操作管理员',
      dataIndex: 'operator',
    },
  ];

  columns3 = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '日期',
      dataIndex: 'date',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'IP',
      dataIndex: 'loginIP',
    },
    {
      title: '登录密码',
      dataIndex: 'password',
    },
    {
      title: '保险柜密码',
      dataIndex: 'safeBox',
    },
    {
      title: '操作管理员',
      dataIndex: 'operator',
    },
  ];

  columns4 = [
    {
      title: '进入时间',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '进入机器',
      dataIndex: 'machineCode',
    },
    {
      title: '进入地址',
      dataIndex: 'loginIP',
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
      title: '游戏币',
      dataIndex: 'gameCoin',
    },
    {
      title: '离开时间',
      dataIndex: 'date',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '离开原因',
      dataIndex: 'outReason',
    },
    {
      title: '游戏币变化',
      dataIndex: 'gameChange',
    },
    {
      title: '税收',
      dataIndex: 'tax',
    },
    {
      title: '游戏时长',
      dataIndex: 'gameTime',
    },
    {
      title: '在线时长时长',
      dataIndex: 'onlineTime',
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
      title: '操作管理员',
      dataIndex: 'operator',
    },
  ];

  columns5 = [
    {
      title: '插入时间',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
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
      title: '桌子',
      dataIndex: 'totalRound',
    },
    {
      title: '用户数',
      dataIndex: 'winRound',
    },
    {
      title: '机器人数',
      dataIndex: 'lossRound',
    },
    {
      title: '损耗',
      dataIndex: 'tie',
    },
    {
      title: '税收',
      dataIndex: 'tax',
    },
    {
      title: '是否机器人',
      dataIndex: 'isMachine',
    },
    {
      title: '椅子编号',
      dataIndex: 'tableID',
    },
    {
      title: '开始时间',
      dataIndex: 'date',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '结束时间',
      dataIndex: 'loginTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  columns6 = [
    {
      title: '插入时间',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '汇款人',
      dataIndex: 'account',
    },
    {
      title: '收款人',
      dataIndex: 'nickname',
    },
    {
      title: '交易类型',
      dataIndex: 'totalRound',
    },
    {
      title: '汇款人现金',
      dataIndex: 'winRound',
    },
    {
      title: '汇款人银行',
      dataIndex: 'lossRound',
    },
    {
      title: '收款人现金',
      dataIndex: 'tie',
    },
    {
      title: '收款人银行',
      dataIndex: 'tax',
    },
    {
      title: '交易游戏币',
      dataIndex: 'isMachine',
    },
    {
      title: '服务费',
      dataIndex: 'tableID',
    },
    {
      title: '操作场所',
      dataIndex: 'operator',
    },
    {
      title: '操作地址',
      dataIndex: 'ip',
    },
    {
      title: '游戏',
      dataIndex: 'game',
    },
    {
      title: '房间',
      dataIndex: 'room',
    },
  ];

  columns7 = [
    {
      title: '下注记录',
      dataIndex: 'totalRound',
    },
    {
      title: '充值时间',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },

    {
      title: '服务类型',
      dataIndex: 'nickname',
    },
    {
      title: '用户账号',
      dataIndex: 'account',
    },
    {
      title: '充值代理账号',
      dataIndex: 'winRound',
    },
    {
      title: '代理人',
      dataIndex: 'lossRound',
    },
    {
      title: '推广人',
      dataIndex: 'tie',
    },
    {
      title: '游戏ID',
      dataIndex: 'gameID',
    },
    {
      title: '订单号码',
      dataIndex: 'isMachine',
    },
    {
      title: '订单金额',
      dataIndex: 'tableID',
    },
    {
      title: '实际付款金额',
      dataIndex: 'operator',
    },
    {
      title: '充值金币',
      dataIndex: 'ip',
    },
    {
      title: '充值前金币',
      dataIndex: 'game',
    },
    {
      title: '充值地址',
      dataIndex: 'room',
    },
  ];

  columns8 = [
    {
      title: '变化前携带金币',
      dataIndex: 'tie',
    },
    {
      title: '变化前银行金币',
      dataIndex: 'tax',
    },
    {
      title: '金币变化数',
      dataIndex: 'isMachine',
    },
    {
      title: '变化类型',
      dataIndex: 'tableID',
    },
    {
      title: '记录时间',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '记录IP',
      dataIndex: 'ip',
    },
  ];

  columns9 = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '订单编号',
      dataIndex: 'totalRound',
    },
    {
      title: '卖家账号',
      dataIndex: 'account',
    },
    {
      title: '交易金币',
      dataIndex: 'winRound',
    },
    {
      title: '应付卖家',
      dataIndex: 'lossRound',
    },
    {
      title: '银行性质',
      dataIndex: 'tie',
    },
    {
      title: '卡号',
      dataIndex: 'gameID',
    },
    {
      title: '提款姓名',
      dataIndex: 'isMachine',
    },
    {
      title: '申请时间',
      dataIndex: 'tableID',
    },
    {
      title: '申请时间',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '交易状态',
      dataIndex: 'game',
    },
    {
      title: '收款信息',
      dataIndex: 'room',
    },
    {
      title: '总充值',
      dataIndex: 'total',
    },
    {
      title: '总提现',
      dataIndex: 'withdraw',
    },
    {
      title: '流水',
      dataIndex: 'sale',
    },
    {
      title: '任务奖励',
      dataIndex: 'task',
    },
    {
      title: '管理操作',
      dataIndex: 'operator',
    },
  ];

  columns10 = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '游戏',
      dataIndex: 'game',
    },
    {
      title: '总输赢',
      dataIndex: 'total',
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

  /* 有时间参数的表格 */
  handleQueryGameLog = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableHeader: text,
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetchTable',
      payload: { query },
    });
  };

  handleQuerySafeBoxLog = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableHeader: text,
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetchTable',
      payload: { query },
    });
  };

  handleQueryChargeLog = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableHeader: text,
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetchTable',
      payload: { query },
    });
  };

  handleQueryGoldLog = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableHeader: text,
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetchTable',
      payload: { query },
    });
  };

  handleQueryWithdrawLog = (e, query) => {
    const text = e.target.innerText;
    this.setState({
      tableHeader: text,
      tableQuery: query,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetchTable',
      payload: { query },
    });
  };

  /* 点击切换每个表格的页数 */
  handleAccountLogTableChange = page => {
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

  handleNicknameLogTableChange = page => {
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

  handlePasswordLogTableChange = page => {
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

  handleInOutLogTableChange = page => {
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

  handleGameLogTableChange = page => {
    const { dispatch } = this.props;
    const { tableQuery } = this.state;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
      query: tableQuery,
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

  handleSafeBoxLogTableChange = page => {
    const { dispatch } = this.props;
    const { tableQuery } = this.state;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
      query: tableQuery,
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

  handleChargeLogTableChange = page => {
    const { dispatch } = this.props;
    const { tableQuery } = this.state;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
      query: tableQuery,
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

  handleGoldLogTableChange = page => {
    const { dispatch } = this.props;
    const { tableQuery } = this.state;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
      query: tableQuery,
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

  handleWithdrawLogTableChange = page => {
    const { dispatch } = this.props;
    const { tableQuery } = this.state;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
      query: tableQuery,
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

  handleWinLogTableChange = page => {
    const { dispatch } = this.props;
    const { tableQuery } = this.state;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
      query: tableQuery,
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

  /* 点击，请求不同的表格且切换 */
  showAccountLog = () => {
    const { dispatch } = this.props;
    /* const { tableQuery } = this.state; */
    this.setState({
      tableType: 'accountLog',
      pagination: {},
    });
    dispatch({
      type: 'userInfo/fetchTable',
    });
  };

  showNicknameLog = () => {
    const { dispatch } = this.props;
    /* const { tableQuery } = this.state; */
    this.setState({
      tableType: 'nicknameLog',
      pagination: {},
    });
    dispatch({
      type: 'userInfo/fetchTable',
    });
  };

  showPasswordLog = () => {
    const { dispatch } = this.props;
    /* const { tableQuery } = this.state; */
    this.setState({
      tableType: 'passwordLog',
      pagination: {},
    });
    dispatch({
      type: 'userInfo/fetchTable',
    });
  };

  showInOutLog = () => {
    const { dispatch } = this.props;
    /* const { tableQuery } = this.state; */
    this.setState({
      tableType: 'inOutLog',
      pagination: {},
    });
    dispatch({
      type: 'userInfo/fetchTable',
    });
  };

  showGameLog = () => {
    const { dispatch } = this.props;
    /* const { tableQuery } = this.state; */
    this.setState({
      tableType: 'gameLog',
      pagination: {},
      tableHeader: '今天',
      tableQuery: 'today',
    });
    dispatch({
      type: 'userInfo/fetchTable',
    });
  };

  showSafeBoxLog = () => {
    const { dispatch } = this.props;
    /* const { tableQuery } = this.state; */
    this.setState({
      tableType: 'safeBoxLog',
      pagination: {},
      tableHeader: '今天',
      tableQuery: 'today',
    });
    dispatch({
      type: 'userInfo/fetchTable',
    });
  };

  showChargeLog = () => {
    const { dispatch } = this.props;
    /* const { tableQuery } = this.state; */
    this.setState({
      tableType: 'chargeLog',
      pagination: {},
      tableHeader: '今天',
      tableQuery: 'today',
    });
    dispatch({
      type: 'userInfo/fetchTable',
    });
  };

  showGoldLog = () => {
    const { dispatch } = this.props;
    /* const { tableQuery } = this.state; */
    this.setState({
      tableType: 'goldLog',
      pagination: {},
      tableHeader: '今天',
      tableQuery: 'today',
    });
    dispatch({
      type: 'userInfo/fetchTable',
    });
  };

  showWithdrawLog = () => {
    const { dispatch } = this.props;
    /* const { tableQuery } = this.state; */
    this.setState({
      tableType: 'withdrawLog',
      pagination: {},
      tableHeader: '今天',
      tableQuery: 'today',
    });
    dispatch({
      type: 'userInfo/fetchTable',
    });
  };

  showWinLog = () => {
    const { dispatch } = this.props;
    /* const { tableQuery } = this.state; */
    this.setState({
      tableType: 'winLog',
      pagination: {},
      tableHeader: '今天',
      tableQuery: 'today',
    });
    dispatch({
      type: 'userInfo/fetchTable',
    });
  };

  render() {
    const {
      userInfo: { table },
      loading,
    } = this.props;
    const { list } = table;
    const { tableType, tableHeader } = this.state;
    const type = tableMap[tableType];
    return (
      <div className={styles.logInfo}>
        <DescriptionList size="large" title="记录信息" style={{ marginBottom: 16 }}>
          <Description term="ID号码">335219</Description>
          <Description term="账号">1395245622</Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        <Row>
          <Col span={10}>
            <DescriptionList size="large" title="基本修改记录" style={{ marginBottom: 16 }}>
              <div className={styles.modifyLog}>
                <a onClick={this.showAccountLog}>历史修改账号记录</a>
                <a onClick={this.showNicknameLog}>历史修改昵称记录</a>
                <a onClick={this.showPasswordLog}>历史修改密码记录</a>
                <a onClick={this.showInOutLog}>进出记录</a>
              </div>
            </DescriptionList>
          </Col>
          <Col span={12}>
            <DescriptionList size="large" title="财富信息记录" style={{ marginBottom: 16 }}>
              <div className={styles.modifyLog}>
                <a onClick={this.showGameLog}>游戏记录</a>
                <a onClick={this.showSafeBoxLog}>保险柜记录</a>
                <a onClick={this.showChargeLog}>充值记录</a>
                <a onClick={this.showGoldLog}>金币变化记录</a>
                <a onClick={this.showWithdrawLog}>提现记录</a>
                <a onClick={this.showWinLog}>游戏总输赢记录</a>
              </div>
            </DescriptionList>
          </Col>
        </Row>
        <Divider style={{ marginBottom: 16 }} />
        <div className={styles.tableTitle}>表格展示</div>
        <div className={styles.tableTitle}>{type}</div>
        <div className={tableType === 'accountLog' ? 'show' : 'hide'}>
          <Table
            loading={loading}
            dataSource={list}
            columns={this.columns1}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handleAccountLogTableChange}
          />
        </div>
        <div className={tableType === 'nicknameLog' ? 'show' : 'hide'}>
          <Table
            loading={loading}
            dataSource={list}
            columns={this.columns2}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handleNicknameLogTableChange}
          />
        </div>
        <div className={tableType === 'passwordLog' ? 'show' : 'hide'}>
          <Table
            loading={loading}
            dataSource={list}
            columns={this.columns3}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handlePasswordLogTableChange}
          />
        </div>
        <div className={tableType === 'inOutLog' ? 'show' : 'hide'}>
          <Table
            loading={loading}
            dataSource={list}
            columns={this.columns4}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handleInOutLogTableChange}
          />
        </div>
        <div className={tableType === 'gameLog' ? 'show' : 'hide'}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <span style={{ marginRight: 10, fontWeight: 'bold' }}>当前表格：{tableHeader}</span>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGameLog(e, 'today')}
              >
                今天
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGameLog(e, 'yesterday')}
              >
                昨天
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGameLog(e, 'week')}
              >
                本周
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGameLog(e, 'lastWeek')}
              >
                上周
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGameLog(e, 'mouth')}
              >
                本月
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGameLog(e, 'lastMouth')}
              >
                上月
              </Button>
            </Col>
          </Row>
          <Table
            loading={loading}
            dataSource={list}
            columns={this.columns5}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handleGameLogTableChange}
          />
        </div>
        <div className={tableType === 'safeBoxLog' ? 'show' : 'hide'}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <span style={{ marginRight: 10, fontWeight: 'bold' }}>当前表格：{tableHeader}</span>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQuerySafeBoxLog(e, 'today')}
              >
                今天
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQuerySafeBoxLog(e, 'yesterday')}
              >
                昨天
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQuerySafeBoxLog(e, 'week')}
              >
                本周
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQuerySafeBoxLog(e, 'lastWeek')}
              >
                上周
              </Button>
            </Col>
          </Row>
          <Table
            loading={loading}
            dataSource={list}
            columns={this.columns6}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handleSafeBoxLogTableChange}
          />
        </div>
        <div className={tableType === 'chargeLog' ? 'show' : 'hide'}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <span style={{ marginRight: 10, fontWeight: 'bold' }}>当前表格：{tableHeader}</span>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryChargeLog(e, 'today')}
              >
                今天
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryChargeLog(e, 'yesterday')}
              >
                昨天
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryChargeLog(e, 'week')}
              >
                本周
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryChargeLog(e, 'lastWeek')}
              >
                上周
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryChargeLog(e, 'mouth')}
              >
                本月
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryChargeLog(e, 'lastMouth')}
              >
                上月
              </Button>
            </Col>
          </Row>
          <Table
            loading={loading}
            dataSource={list}
            columns={this.columns7}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handleChargeLogTableChange}
          />
        </div>
        <div className={tableType === 'goldLog' ? 'show' : 'hide'}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <span style={{ marginRight: 10, fontWeight: 'bold' }}>当前表格：{tableHeader}</span>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGoldLog(e, 'today')}
              >
                今天
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGoldLog(e, 'yesterday')}
              >
                昨天
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGoldLog(e, 'week')}
              >
                本周
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGoldLog(e, 'lastWeek')}
              >
                上周
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGoldLog(e, 'mouth')}
              >
                本月
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryGoldLog(e, 'lastMouth')}
              >
                上月
              </Button>
            </Col>
          </Row>
          <Table
            loading={loading}
            dataSource={list}
            columns={this.columns8}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handleGoldLogTableChange}
          />
        </div>
        <div className={tableType === 'withdrawLog' ? 'show' : 'hide'}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <span style={{ marginRight: 10, fontWeight: 'bold' }}>当前表格：{tableHeader}</span>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryWithdrawLog(e, 'today')}
              >
                今天
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryWithdrawLog(e, 'yesterday')}
              >
                昨天
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryWithdrawLog(e, 'week')}
              >
                本周
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryWithdrawLog(e, 'lastWeek')}
              >
                上周
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryWithdrawLog(e, 'mouth')}
              >
                本月
              </Button>
              <Button
                icon="check-circle"
                type="primary"
                onClick={e => this.handleQueryWithdrawLog(e, 'lastMouth')}
              >
                上月
              </Button>
            </Col>
          </Row>
          <Table
            loading={loading}
            dataSource={list}
            columns={this.columns9}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handleWithdrawLogTableChange}
          />
        </div>
        <div className={tableType === 'winLog' ? 'show' : 'hide'}>
          <Table
            loading={loading}
            dataSource={list}
            columns={this.columns10}
            onSelectRow={this.handleSelectRows}
            pagination={this.state.pagination}
            onChange={this.handleWinLogTableChange}
          />
        </div>
      </div>
    );
  }
}

export default assetInfo;

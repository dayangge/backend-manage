import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';

const tabListNoTitle = [
  {
    tab: '详细资料',
    key: 'detail',
  },
  {
    tab: '下级代理',
    key: 'subordinateAgent',
  },
  {
    tab: '下级玩家',
    key: 'subordinatePlayer',
  },
  {
    tab: '金币变化',
    key: 'goldChange',
  },
  {
    tab: '下级充值记录',
    key: 'subordinateRecharge',
  },
  {
    tab: '下级游戏记录',
    key: 'subordinateGame',
  },
  {
    tab: '下级提现记录',
    key: 'subordinateWithdrawal',
  },
  {
    tab: '线下充值记录',
    key: 'offlineRecharge',
  },
  {
    tab: '玩家总输赢',
    key: 'playerWin',
  },
  {
    tab: '充值提成',
    key: 'rechargeCommission',
  },
  {
    tab: '充值配置',
    key: 'rechargeConfig',
  },
];

@connect(({ pervUrl }) => ({
  pervUrl,
}))
class userDetail extends Component {
  goBack = () => {
    const {
      pervUrl: { agentUrl },
    } = this.props;
    router.push(agentUrl);
  };

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'detail':
        router.push(`${match.url}/detail`);
        break;
      case 'subordinateAgent':
        router.push(`${match.url}/subordinateAgent`);
        break;
      case 'subordinatePlayer':
        router.push(`${match.url}/subordinatePlayer`);
        break;
      case 'goldChange':
        router.push(`${match.url}/goldChange`);
        break;
      case 'subordinateRecharge':
        router.push(`${match.url}/subordinateRecharge`);
        break;
      case 'subordinateGame':
        router.push(`${match.url}/subordinateGame`);
        break;
      case 'subordinateWithdrawal':
        router.push(`${match.url}/subordinateWithdrawal`);
        break;
      case 'offlineRecharge':
        router.push(`${match.url}/offlineRecharge`);
        break;
      case 'playerWin':
        router.push(`${match.url}/playerWin`);
        break;
      case 'rechargeCommission':
        router.push(`${match.url}/rechargeCommission`);
        break;
      case 'rechargeConfig':
        router.push(`${match.url}/rechargeConfig`);
        break;
      default:
        break;
    }
  };

  render() {
    const { loading, location, match, children } = this.props;
    return (
      <PageHeaderWrapper
        title="代理详细信息"
        loading={loading}
        content={
          <Button size="small" type="primary" onClick={this.goBack}>
            点击返回
          </Button>
        }
      >
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={location.pathname.replace(`${match.path}/`, '')}
          onTabChange={this.handleTabChange}
          bordered={false}
        >
          {children}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default userDetail;

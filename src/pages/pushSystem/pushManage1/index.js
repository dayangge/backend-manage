import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';

const tabListNoTitle = [
  {
    tab: '推广管理',
    key: 'push',
  },
  {
    tab: '佣金管理',
    key: 'commission',
  },
];

@connect(({ pervUrl }) => ({
  pervUrl,
}))
class userDetail extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'push':
        router.push(`${match.url}/push`);
        break;
      case 'commission':
        router.push(`${match.url}/commission`);
        break;
      default:
        break;
    }
  };

  render() {
    const { loading, location, match, children } = this.props;
    return (
      <PageHeaderWrapper title="推广系统——推广管理" loading={loading}>
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

import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';

const tabListNoTitle = [
  {
    tab: '角色管理',
    key: 'role',
  },
  {
    tab: '管理员权限设置',
    key: 'manager',
  },
];

class Index extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'role':
        router.push(`${match.url}/role`);
        break;
      case 'manager':
        router.push(`${match.url}/manager`);
        break;
      default:
        break;
    }
  };

  render() {
    const { loading, location, match, children } = this.props;
    return (
      <PageHeaderWrapper title="管理员设置" loading={loading}>
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

export default Index;

import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';

const tabListNoTitle = [
  {
    tab: '新闻公告',
    key: 'news',
  },
  {
    tab: '移动版公告',
    key: 'mobile',
  },
];

class Index extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'news':
        router.push(`${match.url}/news`);
        break;
      case 'mobile':
        router.push(`${match.url}/mobile`);
        break;
      default:
        break;
    }
  };

  render() {
    const { loading, location, match, children } = this.props;
    return (
      <PageHeaderWrapper title="新闻管理" loading={loading}>
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

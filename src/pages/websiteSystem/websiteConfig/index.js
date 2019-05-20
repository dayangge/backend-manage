import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';

const tabListNoTitle = [
  {
    tab: '联系方式配置',
    key: 'contact',
  },
  {
    tab: '站点配置',
    key: 'site',
  },
  {
    tab: '移动大厅配置',
    key: 'mobile',
  },
  {
    tab: '服务器配置',
    key: 'server',
  },
  {
    tab: '分享配置配置',
    key: 'share',
  },
  {
    tab: 'IOS内购配置',
    key: 'ios',
  },
];

class Index extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'contact':
        router.push(`${match.url}/contact`);
        break;
      case 'site':
        router.push(`${match.url}/site`);
        break;
      case 'mobile':
        router.push(`${match.url}/mobile`);
        break;
      case 'server':
        router.push(`${match.url}/server`);
        break;
      case 'share':
        router.push(`${match.url}/share`);
        break;
      case 'ios':
        router.push(`${match.url}/ios`);
        break;
      default:
        break;
    }
  };

  render() {
    const { loading, location, match, children } = this.props;
    return (
      <PageHeaderWrapper title="站点管理" loading={loading}>
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

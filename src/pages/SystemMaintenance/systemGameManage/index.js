import React, { Component } from 'react';
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
import styles from '../system.less';

const tabListNoTitle = [
  {
    tab: '模块设置',
    key: 'module',
  },
  {
    tab: '游戏设置',
    key: 'game',
  },
  {
    tab: '类型设置',
    key: 'type',
  },
  {
    tab: '手游设置',
    key: 'mobile',
  },
];

class SystemGameManage extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'module':
        router.push(`${match.url}/module`);
        break;
      case 'game':
        router.push(`${match.url}/game`);
        break;
      case 'type':
        router.push(`${match.url}/type`);
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
      <PageHeaderWrapper title="游戏管理" loading={loading}>
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

export default SystemGameManage;

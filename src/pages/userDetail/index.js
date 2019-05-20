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
import styles from './userDetail.less';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const tabListNoTitle = [
  {
    tab: '基本信息',
    key: 'basicInfo',
  },
  {
    tab: '详细信息',
    key: 'detailInfo',
  },
  {
    tab: '财富信息',
    key: 'assetInfo',
  },
  {
    tab: '记录信息',
    key: 'logInfo',
  },
];

@connect(({ pervUrl }) => ({
  pervUrl,
}))
class userDetail extends Component {
  goBack = () => {
    const {
      pervUrl: { url },
    } = this.props;
    router.push(url);
  };

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'basicInfo':
        router.push(`${match.url}/basicInfo`);
        break;
      case 'detailInfo':
        router.push(`${match.url}/detailInfo`);
        break;
      case 'assetInfo':
        router.push(`${match.url}/assetInfo`);
        break;
      case 'logInfo':
        router.push(`${match.url}/logInfo`);
        break;
      default:
        break;
    }
  };

  render() {
    const { loading, location, match, children } = this.props;
    return (
      <PageHeaderWrapper
        title="用户个人信息"
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

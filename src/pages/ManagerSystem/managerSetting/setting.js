import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, InputNumber, Button, Input, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const changeType = ['注册赠送', '输赢', '签到赠送'];

/* eslint react/no-multi-comp:0 */
@connect(({ givingLog, loading }) => ({
  givingLog,
  loading: loading.models.givingLog,
}))
@Form.create()
class setting extends PureComponent {
  state = {};

  render() {
    return (
      <div>
        <Card bordered={false} title="管理员权限设置">
          111
        </Card>
      </div>
    );
  }
}

export default setting;

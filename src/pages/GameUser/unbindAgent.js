import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, Button, Input, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './userManage.less';

const FormItem = Form.Item;
const { Option } = Select;
const changeType = ['注册赠送', '输赢', '签到赠送'];

/* eslint react/no-multi-comp:0 */
@connect(({ unbindAgent, loading }) => ({
  unbindAgent,
  loading: loading.models.unbindAgent,
}))
@Form.create()
class goldCoinLog extends PureComponent {
  state = {
    selectedRows: [],
    pagination: {},
  };

  columns = [
    {
      title: '用户标识',
      dataIndex: 'key',
    },
    {
      title: '游戏ID',
      dataIndex: 'userID',
    },
    {
      title: '玩家账号',
      dataIndex: 'userAccount',
    },
    {
      title: '解绑时金币',
      dataIndex: 'takeGoldCoin',
    },
    {
      title: '解绑时银行金币',
      dataIndex: 'bankGoldCoin',
    },
    {
      title: '解绑人',
      dataIndex: 'goldCoinAmount',
    },
    {
      title: '解绑时间',
      dataIndex: 'logTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'unbindAgent/fetchUnbindAgent',
    });
  }

  handleStandardTableChange = page => {
    const { dispatch } = this.props;
    const { tableQuery } = this.state;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
      query: tableQuery,
    };

    dispatch({
      type: 'unbindAgent/fetchUnbindAgent',
      payload: params,
      callback: response => {
        const { pagination } = response;
        this.setState({
          pagination,
        });
      },
    });
  };
  /* 点击加载用户输赢详细信息 */

  /* 重置所有表单 */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'unbindAgent/fetchUnbindAgent',
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
        type: 'unbindAgent/search',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={4} sm={24}>
            <FormItem label="玩家账号">
              {getFieldDecorator('userAccount')(<Input placehold="请输入账号" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="代理号">
              {getFieldDecorator('agent')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {changeType.map(value => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      unbindAgent: { unbindAgentData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const dataSource = unbindAgentData.list;

    return (
      <PageHeaderWrapper title="解除代理列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              selectedRows={selectedRows}
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              pagination={this.state.pagination}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default goldCoinLog;

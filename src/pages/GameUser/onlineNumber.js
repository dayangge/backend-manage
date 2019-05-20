import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Select, Button, Modal, Table } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './userManage.less';

const FormItem = Form.Item;
const { Option } = Select;
const gameList = [
  '游戏',
  '大厅',
  '炸金花',
  '看牌牛牛',
  '通比牛牛',
  '百人牛牛',
  '中发白',
  '百人牌九',
  '百家乐',
  '龙凤斗',
  '不洗牌斗地主',
  '红黑大战',
  '水果拉霸',
  '李逵',
  '蛟龙出海',
  '时时彩',
];

/* eslint react/no-multi-comp:0 */
@connect(({ onlineNumber, loading }) => ({
  onlineNumber,
  loading: loading.models.onlineNumber,
}))
@Form.create()
class OnlineNumber extends PureComponent {
  state = {
    selectedRows: [],
    isShowEditModel: false,
  };

  columns = [
    {
      title: '游戏名称',
      dataIndex: 'gameName',
    },
    {
      title: '房间名称',
      dataIndex: 'roomName',
    },
    {
      title: '真实人数',
      dataIndex: 'realNumber',
    },
    {
      title: '当前虚拟人数',
      dataIndex: 'virtualNumber',
    },
    {
      title: '机器人数',
      dataIndex: 'robotNumber',
    },
    {
      title: '编辑',
      dataIndex: 'edit',
      render: (val, record, text) => {
        if (val === 1) {
          return (
            <Fragment>
              <a
                onClick={() => {
                  this.showEdit(record, text);
                }}
              >
                编辑
              </a>
            </Fragment>
          );
        }
        return null;
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'onlineNumber/fetchOnlineNumber',
    });
  }

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };

    dispatch({
      type: 'onlineNumber/fetchOnlineNumber',
      payload: params,
    });
  };

  /* 点击加载用户输赢详细信息 */
  showEdit = (record, text) => {
    const { dispatch } = this.props;
    const { gameName } = record;
    const params = {
      gameName,
    };
    dispatch({
      type: 'onlineNumber/fetchGameEdit',
      payload: params,
    });
    this.setState({
      isShowEditModel: true,
    });
  };

  /* 重置所有表单 */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'onlineNumber/fetchOnlineManage',
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
        type: 'onlineNumber/search',
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
          <Col md={6} sm={24}>
            <FormItem label="全部游戏">
              {getFieldDecorator('game')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {gameList.map(value => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="房间">
              {getFieldDecorator('room')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {gameList.map(value => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
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
      onlineNumber: { onlineNumberData },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper title="在线人数">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={onlineNumberData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <Modal
          width={800}
          title="查看输赢详情"
          visible={this.state.isShowEditModel} // eslint-disable-line
          onOk={() => {
            this.setState({
              isShowEditModel: false,
            });
          }}
          onCancel={() => {
            this.setState({
              isShowEditModel: false,
            });
          }}
        >
          <EditGameInfo />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default OnlineNumber;

/* eslint react/no-multi-comp:0 */
@connect(({ onlineNumber, loading }) => ({
  onlineNumber,
  loading: loading.models.onlineNumber,
}))
class EditGameInfo extends PureComponent {
  state = {
    pagination: {},
  };

  render() {
    const columns = [
      {
        title: '房间名称',
        dataIndex: 'roomName',
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
      },
      {
        title: '最少虚拟人数',
        dataIndex: 'leastVirtualNumber',
      },
      {
        title: '最多虚拟人数',
        dataIndex: 'mostVirtualNumber',
      },
    ];

    const {
      onlineNumber: { gameEditData },
      onlineNumber,
    } = this.props;
    const { pagination } = this.state;
    return (
      <Fragment>
        {gameEditData ? (
          <Table
            columns={columns}
            dataSource={gameEditData.list}
            pagination={pagination}
            onChange={this.handleTableChange}
          />
        ) : (
          'loading'
        )}
      </Fragment>
    );
  }
}

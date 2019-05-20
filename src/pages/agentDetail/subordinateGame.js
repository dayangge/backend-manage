import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  Modal,
  Badge,
  message,
} from 'antd';
import ETable from '@/components/Etable';
import SearchButton from '@/components/SearchButton';
import styles from './index.less';
import { ROOM_CODE } from '../../utils/constant';

const { Option } = Select;
const FormItem = Form.Item;

const { RangePicker } = DatePicker;

/* eslint react/no-multi-comp:0 */
@connect(({ agentDetailSubGame, pervUrl, agentID, loading }) => ({
  agentDetailSubGame,
  pervUrl,
  agentID,
  loading: loading.models.agentDetailSubGame,
}))
@Form.create()
class Manage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
  };

  columns = [
    {
      title: '游戏',
      dataIndex: 'game',
    },
    {
      title: '房间',
      dataIndex: 'room',
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '游戏ID',
      dataIndex: 'gameID',
    },
    {
      title: '输赢金币',
      dataIndex: 'gold',
    },
    {
      title: '税收',
      dataIndex: 'tax',
    },
    {
      title: '游戏时长',
      dataIndex: 'time',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '游戏时间',
      dataIndex: 'gameTime',
    },
  ];

  componentDidMount() {
    const { dispatch, agentID } = this.props;
    const { id } = agentID;
    dispatch({
      type: 'agentDetailSubGame/fetch',
      payload: { id },
    });
  }

  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { tableQuery } = this.state;
    const params = {
      currentPage: page.current,
      pageSize: page.pageSize,
      query: tableQuery,
    };

    dispatch({
      type: 'agentDetailSubGame/fetch',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  /* 保存行 */
  selectRow = (text, record) => {
    this.setState({
      row: record,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'agentDetailSubGame/fetch',
      payload: {},
    });
  };

  handleQuery = (e, query) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'agentDetailSubGame/fetch',
      payload: { query },
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
        type: 'agentDetailSubGame/fetch',
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
            <FormItem label="用户查询">
              {getFieldDecorator('userAccount')(<Input placehold="请输入用户" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="日期查询">
              {getFieldDecorator('userAccount')(<RangePicker />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="所在房间">
              {getFieldDecorator('room', {
                initialValue: 0,
              })(
                <Select>
                  {ROOM_CODE.map(val => (
                    <Option key={val.id} value={val.id}>
                      {val.name}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="查询方式">
              {getFieldDecorator('userAccount')(
                <Select>
                  <Option key={0} value={0}>
                    按用户账号
                  </Option>
                  <Option key={1} value={1}>
                    按游戏ID
                  </Option>
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
                刷新
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
      agentDetailSubGame: { subGameData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <Fragment>
        <Card bordered={false}>
          <div className="tableBox">
            <div className="tableBoxForm">{this.renderForm()}</div>
            <SearchButton handleQueryLog={this.handleQuery} />
            <ETable
              selectedRows={selectedRows}
              loading={loading}
              data={subGameData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </Fragment>
    );
  }
}

export default Manage;

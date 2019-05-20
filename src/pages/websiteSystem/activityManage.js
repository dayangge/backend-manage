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
  message,
  Upload,
  Icon,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';
import router from 'umi/router';

const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const { TextArea } = Input;

const status = ['禁用', '开启'];
const statusMap = ['default', 'processing', 'success', 'error'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon="upload">更换头像</Button>
      </div>
    </Upload>
  </Fragment>
);

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

/* eslint react/no-multi-comp:0 */
@connect(({ websiteActivity, loading }) => ({
  websiteActivity,
  loading: loading.models.websiteActivity,
}))
@Form.create()
class ActivityManage extends PureComponent {
  state = {
    selectedRows: [],
    row: '',
    isShowModifyModel: false,
  };

  columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '录入日期',
      dataIndex: 'time1',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '管理',
      dataIndex: 'edit',
      render: (val, record, text) => {
        return (
          <Fragment>
            <Button
              type="primary"
              onClick={() => {
                this.turnToModifyPage(text, record);
              }}
            >
              更新
            </Button>
          </Fragment>
        );
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'websiteActivity/fetchWebsiteActivityList',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'websiteActivity/fetchWebsiteActivityList',
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

  deleteItem = () => {
    const { row } = this.state;
    console.log(row);
  };

  cancelSuper = () => {
    const { selectedRows } = this.state;
    const self = this;
    const words = [];
    if (selectedRows.length <= 0) {
      message.warning('请至少选择一项');
      return;
    }
    selectedRows.map(val => words.push(val.cost));
    const params = {
      words,
    };
    const ui = words.join(',');
    confirm({
      title: '删除服务器',
      content: `你要删除${ui}？`,
      onOk() {
        self.handleDelete(params);
      },
      onCancel() {},
    });
  };

  handleDelete = params => {
    this.setState({
      selectedRows: [],
    });
  };

  turnToAddPage = () => {
    router.push(`/websiteSystem/activityManage/add`);
  };

  turnToModifyPage = (id, record) => {
    router.push(`/websiteSystem/activityManage/modify?id=${id}`);
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
        type: 'websiteActivity/fetchWebsiteActivityList',
        payload: values,
      });
    });
  };

  renderOperationForm() {
    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginBottom: 16 }}>
        <Col md={3} sm={24}>
          <Button icon="plus" type="primary" onClick={() => this.turnToAddPage()}>
            新赠
          </Button>
        </Col>
        <Col md={3} sm={24}>
          <Button icon="delete" type="primary" onClick={() => this.cancelSuper()}>
            删除
          </Button>
        </Col>
      </Row>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      websiteActivity: { websiteActivityListData },
      loading,
    } = this.props;
    const { selectedRows, row } = this.state;
    return (
      <PageHeaderWrapper title="规则管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            {this.renderOperationForm()}
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={websiteActivityListData}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          destroyOnClose
          title="修改"
          visible={this.state.isShowModifyModel} // eslint-disable-line
          onOk={() => {
            this.setState({
              isShowModifyModel: false,
            });
            this.sendModify();
          }}
          onCancel={() => {
            this.setState({
              isShowModifyModel: false,
            });
          }}
        >
          <ModifyInfo wrappedComponentRef={inst => (this.modifyInfo = inst)} selectedItem={row} />
        </Modal>

        <Modal
          destroyOnClose
          title="添加"
          visible={this.state.isShowAddSuperModel} // eslint-disable-line
          onOk={() => {
            this.setState({
              isShowAddSuperModel: false,
            });
            this.sendAddSuper();
          }}
          onCancel={() => {
            this.setState({
              isShowAddSuperModel: false,
            });
          }}
        >
          <AddSuper wrappedComponentRef={inst => (this.addSuper = inst)} />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default ActivityManage;

@connect(({ websiteRuleManage, loading }) => ({
  websiteRuleManage,
  loading: loading.models.websiteRuleManage,
}))
@Form.create()
class ModifyInfo extends PureComponent {
  state = {
    loading: false,
  };

  componentDidMount() {
    const {
      dispatch,
      selectedItem: { id },
    } = this.props;
    dispatch({
      type: 'websiteRuleManage/fetchWebsiteRuleInfo',
      payload: { id },
    });
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    const { getFieldDecorator } = this.props.form;
    const {
      websiteRuleManage: { websiteRuleInfoData },
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="ID" {...formItemLayout}>
            {getFieldDecorator('id', {
              rules: [{ required: true, message: '必填' }],
              initialValue: websiteRuleInfoData.id,
            })(<Input disabled />)}
          </FormItem>
          <FormItem label="游戏名称" {...formItemLayout}>
            {getFieldDecorator('game', {
              initialValue: websiteRuleInfoData.game,
            })(<Input />)}
          </FormItem>
          <FormItem label="游戏介绍" {...formItemLayout}>
            {getFieldDecorator('gameDesc', {
              initialValue: websiteRuleInfoData.gameDesc,
            })(<TextArea />)}
          </FormItem>
          <FormItem label="规则介绍" {...formItemLayout}>
            {getFieldDecorator('ruleDesc', {
              initialValue: websiteRuleInfoData.ruleDesc,
            })(<TextArea />)}
          </FormItem>
          <FormItem label="等级介绍" {...formItemLayout}>
            {getFieldDecorator('levelDesc', {
              initialValue: websiteRuleInfoData.levelDesc,
            })(<TextArea />)}
          </FormItem>
          <FormItem label="禁用状态" {...formItemLayout}>
            {getFieldDecorator('account', {
              initialValue: websiteRuleInfoData.status,
            })(
              <Select>
                <Option value={0}>正常</Option>
                <Option value={1}>禁用</Option>
              </Select>
            )}
          </FormItem>
          <Row>
            <Col span={6}>上传图片</Col>
            <Col span={16}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img style={{ width: '100%' }} src={imageUrl} alt="avatar" />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

@Form.create()
class AddSuper extends PureComponent {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="游戏名称" {...formItemLayout}>
            {getFieldDecorator('game', {})(
              <Select>
                <Option value={0}>炸金花</Option>
                <Option value={1}>百人牛牛</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="游戏介绍" {...formItemLayout}>
            {getFieldDecorator('gameDesc', {})(<TextArea />)}
          </FormItem>
          <FormItem label="规则介绍" {...formItemLayout}>
            {getFieldDecorator('ruleDesc', {})(<TextArea />)}
          </FormItem>
          <FormItem label="等级介绍" {...formItemLayout}>
            {getFieldDecorator('levelDesc', {})(<TextArea />)}
          </FormItem>
          <FormItem label="禁用状态" {...formItemLayout}>
            {getFieldDecorator('account', {})(
              <Select>
                <Option value={0}>正常</Option>
                <Option value={1}>禁用</Option>
              </Select>
            )}
          </FormItem>
          <Row>
            <Col span={6}>上传图片</Col>
            <Col span={16}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img style={{ width: '100%' }} src={imageUrl} alt="avatar" />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

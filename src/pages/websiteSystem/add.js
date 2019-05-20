import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';
import router from 'umi/router';

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;

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
@connect(({ websiteAddActivity, loading }) => ({
  websiteAddActivity,
  loading: loading.models.websiteAddActivity,
}))
@Form.create()
class ActivityManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      editorState: EditorState.createEmpty(),
      loads: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'websiteRuleManage/fetchWebsiteRuleManage',
    });
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  handleSubmit = e => {
    const { dispatch } = this.props;
    const { editorState } = this.state;
    const template = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        dispatch({
          type: 'websiteRuleManage/fetchWebsiteRuleManage',
          payAccount: values,
        });
      }
    });
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loads: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loads: false,
        })
      );
    }
  };

  back = () => {
    const { history } = this.props;
    history.go(-1);
  };

  render() {
    const { form, loading } = this.props;
    const { imageUrl, loads } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    const { editorState } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loads ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <PageHeaderWrapper title="添加活动">
        <Card>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem label="活动名称" {...formItemLayout}>
              {getFieldDecorator('game', {})(<Input />)}
            </FormItem>
            <Row>
              <Col span={4}>上传图片</Col>
              <Col span={8}>
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
            <FormItem label="排序" {...formItemLayout}>
              {getFieldDecorator('sort', {})(<Input />)}
            </FormItem>
            <FormItem label="是否推荐至首页" {...formItemLayout}>
              {getFieldDecorator('isTop', {})(
                <Select>
                  <Option value={0}>否</Option>
                  <Option value={1}>是</Option>
                </Select>
              )}
            </FormItem>
            <Row>
              <Col span={4}>活动描述</Col>
              <Col span={20}>
                <Editor
                  localization={{
                    locale: 'zh',
                  }}
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                />
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存
            </Button>
            <Button onClick={this.back} style={{ marginLeft: 10 }}>
              返回
            </Button>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default ActivityManage;

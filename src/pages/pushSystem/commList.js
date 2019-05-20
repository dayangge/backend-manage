import React, { Component, Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, message, Row, Col, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import styles from './index.less';

const FormItem = Form.Item;

@Form.create()
class CommList extends Component {
  state = {};

  handleSend = fn => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fn(values);
      }
    });
    /*  e.preventDefault();
    this.props.form.validateFields((err) => {
      if (err) {
        return;
      }
    const data = this.props.form.getFieldValue();
    fn(data)
    }) */
  };

  render() {
    const {
      form: { getFieldDecorator },
      level,
      LName,
      minYJ,
      maxYJ,
      rebate,
      fn,
    } = this.props;
    const width1 = {
      xs: { span: 24 },
      sm: { span: 4 },
    };
    const width2 = {
      xs: { span: 24 },
      sm: { span: 6 },
    };
    const width3 = {
      xs: { span: 24 },
      sm: { span: 4 },
    };
    return (
      <Form>
        <Row>
          <Col {...width1} className={styles.line}>
            {LName}
          </Col>
          <Col style={{ display: 'none' }}>
            <FormItem>
              {getFieldDecorator('level', {
                initialValue: level,
              })(<Input disabled />)}
            </FormItem>
          </Col>
          <Col {...width2}>
            <Col span={8}>
              <FormItem wrapperCol={{ span: 24 }}>
                {getFieldDecorator('minYJ', {
                  initialValue: minYJ,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={1}>
              <span className={styles.colon}>~</span>
            </Col>
            <Col span={8}>
              <FormItem wrapperCol={{ span: 24 }}>
                {getFieldDecorator('maxYJ', {
                  initialValue: maxYJ,
                })(<Input />)}
              </FormItem>
            </Col>
          </Col>
          <Col {...width3} className={styles.line}>
            <Col span={6} className={styles.line}>
              每万返佣
            </Col>
            <Col span={8}>
              <FormItem wrapperCol={{ span: 24 }}>
                {getFieldDecorator('rebate', {
                  initialValue: rebate,
                })(<Input />)}
              </FormItem>
            </Col>
          </Col>
          <Col {...width3} className={styles.line}>
            <Button type="primary" onClick={() => this.handleSend(fn)}>
              提交修改
            </Button>
          </Col>
        </Row>
        <Divider />
      </Form>
    );
  }
}

export default CommList;

import React, { Component, Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Divider } from 'antd';
import styles from '../index.less';
import CommList from '../commList';

const manageComm = [
  {
    level: 1,
    LName: '1.初级会员',
    minYJ: 0,
    maxYJ: 50000,
    rebate: 50.0,
  },
  {
    level: 2,
    LName: '2.会员',
    minYJ: 50000,
    maxYJ: 80000,
    rebate: 60.0,
  },
  {
    level: 3,
    LName: '3.超级会员',
    minYJ: 80000,
    maxYJ: 100000,
    rebate: 70.0,
  },
  {
    level: 4,
    LName: '4.代理',
    minYJ: 100000,
    maxYJ: 300000,
    rebate: 80.0,
  },
  {
    level: 5,
    LName: '6.超级代理',
    minYJ: 300000,
    maxYJ: 600000,
    rebate: 90.0,
  },
  {
    level: 6,
    LName: '6.总代理',
    minYJ: 600000,
    maxYJ: 1000000,
    rebate: 100.0,
  },
  {
    level: 7,
    LName: '7.超级总代理',
    minYJ: 1000000,
    maxYJ: 2000000,
    rebate: 120.0,
  },
  {
    level: 8,
    LName: '8.股东',
    minYJ: 2000000,
    maxYJ: 4000000,
    rebate: 140.0,
  },
  {
    level: 9,
    LName: '9.超级股东',
    minYJ: 4000000,
    maxYJ: 6000000,
    rebate: 160.0,
  },
  {
    level: 10,
    LName: '10.总监',
    minYJ: 6000000,
    maxYJ: 8000000,
    rebate: 70.0,
  },
];

@connect(({ agentID, agentDetailDetail, loading }) => ({
  agentID,
  agentDetailDetail,
  loading: loading.effects.agentDetailDetail,
}))
class detailInfo extends Component {
  state = {};

  componentDidMount() {
    const { dispatch, agentID } = this.props;
    const { id } = agentID;
    const params = {
      id,
    };
    dispatch({
      type: 'agentDetailDetail/fetch',
      payload: params,
    });
  }

  handleSendData = data => {
    console.log(data);
  };

  render() {
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
      <div className={styles.commission}>
        <Row>
          <Col {...width1}>代理级别</Col>
          <Col {...width2}>业绩额度</Col>
          <Col {...width3}>返佣金额</Col>
        </Row>
        <Divider />
        {manageComm.map(val => (
          <CommList key={val.level} {...val} fn={this.handleSendData} />
        ))}
      </div>
    );
  }
}

export default detailInfo;

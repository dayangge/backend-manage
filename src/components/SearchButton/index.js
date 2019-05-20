import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Button } from 'antd';

import styles from './index.less';

const ButtonGroup = Button.Group;

class rechargeLog extends PureComponent {
  state = {
    isType: '',
  };

  render() {
    const { handleQueryLog } = this.props;
    const { isType } = this.state;
    return (
      <div className={styles.box}>
        <ButtonGroup>
          <Button
            icon="check-circle"
            type={isType === 'today' ? 'normal' : 'primary'}
            onClick={e => {
              handleQueryLog(e, 'today');
              this.setState({
                isType: 'today',
              });
            }}
          >
            今天
          </Button>
          <Button
            icon="check-circle"
            type={isType === 'yesterday' ? 'normal' : 'primary'}
            onClick={e => {
              handleQueryLog(e, 'yesterday');
              this.setState({
                isType: 'yesterday',
              });
            }}
          >
            昨天
          </Button>
          <Button
            icon="check-circle"
            type={isType === 'week' ? 'normal' : 'primary'}
            onClick={e => {
              handleQueryLog(e, 'week');
              this.setState({
                isType: 'week',
              });
            }}
          >
            本周
          </Button>
          <Button
            icon="check-circle"
            type={isType === 'lastWeek' ? 'normal' : 'primary'}
            onClick={e => {
              handleQueryLog(e, 'lastWeek');
              this.setState({
                isType: 'lastWeek',
              });
            }}
          >
            上周
          </Button>
          <Button
            icon="check-circle"
            type={isType === 'month' ? 'normal' : 'primary'}
            onClick={e => {
              handleQueryLog(e, 'month');
              this.setState({
                isType: 'month',
              });
            }}
          >
            本月
          </Button>
          <Button
            icon="check-circle"
            type={isType === 'lastMonth' ? 'normal' : 'primary'}
            onClick={e => {
              handleQueryLog(e, 'lastMonth');
              this.setState({
                isType: 'lastMonth',
              });
            }}
          >
            上月
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default rechargeLog;

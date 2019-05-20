import React, { PureComponent } from 'react';

class CountDown extends PureComponent {
  timer = 0;

  interval = 1000;

  constructor(props) {
    super(props);
    const { lastTime } = props;
    this.state = {
      lastTime,
    };
  }

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate(prevProps) {
    const { target } = this.props;
    if (target !== prevProps.target) {
      clearTimeout(this.timer);
      this.tick();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  tick = () => {
    const { onEnd } = this.props;
    let { lastTime } = this.state;
    const { isPause } = this.props;
    if (!isPause) {
      this.timer = setTimeout(() => {
        if (lastTime < 1) {
          clearTimeout(this.timer);
          this.setState(
            {
              lastTime: 0,
            },
            () => {
              if (onEnd) {
                onEnd();
              }
            }
          );
        } else {
          lastTime -= 1;
          this.setState(
            {
              lastTime,
            },
            () => {
              this.tick();
            }
          );
        }
      }, this.interval);
    } else {
      clearTimeout(this.timer);
    }
  };

  render() {
    const { onEnd } = this.props;
    const { lastTime } = this.state;

    return <span>{lastTime}</span>;
  }
}

export default CountDown;

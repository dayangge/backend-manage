import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

class ETable extends PureComponent {
  handleTableChange = pagination => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination);
    }
  };

  render() {
    const { data = {}, rowKey, ...rest } = this.props;
    const { list = [], pagination } = data;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    return (
      <div className={styles.eTable}>
        <div className={styles.tableAlert}>
          <Table
            rowKey={rowKey || 'key'}
            dataSource={list}
            pagination={paginationProps}
            onChange={this.handleTableChange}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

export default ETable;

import { Table } from 'antd';
import PropTypes from 'prop-types';

TableComponent.defaultProps = {
  data: [],
  columns: [],
};

TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
};

function TableComponent({ data, columns }) {
  return <Table dataSource={data} columns={columns} />;
}

export default TableComponent;

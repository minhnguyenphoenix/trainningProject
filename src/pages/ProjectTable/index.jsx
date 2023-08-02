import { v4 as uuid4 } from 'uuid';
import MenuActions from './MenuActions';
import TableComponent from '../../components/Table';

function ProjectTable() {
  const dataSource = [
    {
      key: uuid4(),
      name: 'Project 1',
      createdBy: 'Mike',
      tickets: 2,
      lastModified: '2023-07-16',
      dateCreated: '2023-07-15',
    },
    {
      key: uuid4(),
      name: 'Project 1',
      createdBy: 'Mike',
      tickets: 3,
      lastModified: '2023-07-16',
      dateCreated: '2023-07-15',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Tickets',
      dataIndex: 'tickets',
      key: 'tickets',
    },
    {
      title: 'Last modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
    {
      title: 'Options',
      fixed: 'right',
      key: 'operation',
      render: () => <MenuActions />,
    },
  ];

  return <TableComponent data={dataSource} columns={columns} />;
}

export default ProjectTable;

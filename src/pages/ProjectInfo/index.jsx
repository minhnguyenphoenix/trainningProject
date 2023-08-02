import MenuActions from './MenuActions';
import TableComponent from '../../components/Table';

function ProjectInfo() {
  const dataSource = [
    {
      key: 1,
      type: 'Type 1',
      name: 'Create Login page ',
      createdBy: 'Min',
      userStories: 2,
      lastModified: '2023-07-16',
      dateCreated: '2023-07-15',
    },
    {
      key: 2,
      type: 'Type 2',
      name: 'Ticket 2',
      createdBy: 'Mike',
      userStories: 3,
      lastModified: '2023-07-16',
      dateCreated: '2023-07-15',
    },
  ];

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
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
      title: 'User Stories',
      dataIndex: 'userStories',
      key: 'userStories',
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

export default ProjectInfo;

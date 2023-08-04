import MenuActions from './MenuActions';
import TableComponent from '../../components/Table';
import { useStores } from '../../stores';
import { useMemo } from 'react';
import { observer } from 'mobx-react';

const ProjectTable = observer(() => {
  const { projectStore, ticketStore, storyStore } = useStores();

  console.log(ticketStore, storyStore);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const projectList = useMemo(() => projectStore.getProjectList(), [projectStore, projectStore.projectList]);

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

  return <TableComponent data={projectList} columns={columns} />;
});

export default ProjectTable;

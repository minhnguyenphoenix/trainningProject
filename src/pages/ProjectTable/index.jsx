import MenuActions from './MenuActions';
import TableComponent from '../../components/Table';
import { useStores } from '../../stores';
import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { getTicketLength } from '../../utils/common';

const ProjectTable = observer(() => {
  const { projectStore } = useStores();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const projectList = useMemo(() => projectStore.getProjectList(), [projectStore, projectStore.projectList]);

  useEffect(() => {
    if (projectList) localStorage.setItem('projectList', JSON.stringify(projectList));
  }, [projectList, projectStore]);

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
      key: 'tickets',
      render: (v) => getTicketLength(v),
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
      render: (v) => <MenuActions data={v} />,
    },
  ];

  return <TableComponent data={projectList} columns={columns} />;
});

export default ProjectTable;

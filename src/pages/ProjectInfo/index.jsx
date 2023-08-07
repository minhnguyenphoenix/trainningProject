import MenuActions from './MenuActions';
import TableComponent from '../../components/Table';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
// import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getObjectFromProxy } from '../../utils/common';

const ProjectInfo = observer(() => {
  const { ticketStore } = useStores();
  const { projectId } = useParams();

  const columns = [
    {
      title: 'Type',
      dataIndex: 'ticketType',
      key: 'ticketType',
    },
    {
      title: 'Name',
      dataIndex: 'ticketName',
      key: 'ticketName',
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
      render: (v) => <MenuActions data={v} />,
    },
  ];

  return <TableComponent data={getObjectFromProxy(ticketStore.getTicketList(projectId))} columns={columns} />;
});

export default ProjectInfo;

import MenuActions from './MenuActions';
import TableComponent from '../../components/Table';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import { useMemo } from 'react';

const ProjectInfo = observer(() => {
  const { ticketStore } = useStores();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ticketList = useMemo(() => ticketStore.getTicketList(), [ticketStore, ticketStore.ticketList]);

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

  return <TableComponent data={ticketList} columns={columns} />;
});

export default ProjectInfo;

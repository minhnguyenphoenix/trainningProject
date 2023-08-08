import MenuActions from './MenuActions';
import TableComponent from '../../components/Table';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import { useParams } from 'react-router-dom';
import { getObjectFromProxy, getUserStoryLength, stranformText } from '../../utils/common';

const ProjectInfo = observer(() => {
  const { ticketStore } = useStores();
  const { projectId } = useParams();

  const columns = [
    {
      title: 'Type',
      key: 'ticketType',
      render: (v) => stranformText(v),
    },
    {
      title: 'Name',
      dataIndex: 'ticketName',
      key: 'ticketName',
    },
    {
      title: 'User Stories',
      key: 'userStories',
      render: (v) => getUserStoryLength(v),
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

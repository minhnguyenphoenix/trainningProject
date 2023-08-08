import { Menu, Button } from 'antd';
import PropTypes from 'prop-types';
import { useStores } from '../../../stores';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { toast } from '../../../utils/toast';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('', 'actions', <Button>Actions</Button>, [
    getItem('Edit', 'edit'),
    getItem('Duplicate', 'duplicate'),
    getItem('Delete', 'delete'),
  ]),
];

const MenuActions = ({ data }) => {
  const { projectId } = useParams();
  const { ticketStore } = useStores();
  const navigate = useNavigate();
  const ticketData = useMemo(() => JSON.parse(JSON.stringify(data)), [data]);

  const onDuplicateTicket = () => {
    try {
      ticketStore.duplicateTicket(ticketData.id, projectId);
    } catch (error) {
      throw new Error('onDuplicateTicket', error);
    }
  };

  const onDeleteTicket = () => {
    try {
      ticketStore.deleteTicket(ticketData.id, projectId);
    } catch (error) {
      throw new Error('onDeleteTicket', error);
    } finally {
      toast.success('Delete ticket successfully');
    }
  };

  const onClick = (event) => {
    switch (event.key) {
      case 'edit':
        navigate(`/${projectId}/${ticketData.id}`);
        break;
      case 'duplicate':
        onDuplicateTicket();
        break;
      case 'delete':
        onDeleteTicket();
        break;
      default:
        return false;
    }
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 150,
      }}
      mode='horizontal'
      items={items}
    />
  );
};

MenuActions.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MenuActions;

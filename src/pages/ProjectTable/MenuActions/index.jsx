import { Menu, Button } from 'antd';
import { useMemo } from 'react';
import { useStores } from '../../../stores';
import { toast } from '../../../utils/toast';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

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
    getItem('View', 'view'),
    getItem('Duplicate', 'duplicate'),
    getItem('Delete', 'delete'),
  ]),
];

const MenuActions = ({ data }) => {
  const { projectStore } = useStores();
  const navigate = useNavigate();
  const projectData = useMemo(() => JSON.parse(JSON.stringify(data)), [data]);

  const onDeleteProject = () => {
    try {
      projectStore.deleteProject(projectData.id);
    } catch (error) {
      throw new Error('onDeleteProject', error);
    } finally {
      toast.success('Delete product successfully^^');
    }
  };

  const onDuplicateProject = () => {
    try {
      projectStore.duplicateProject(projectData.id);
    } catch (error) {
      throw new Error('onDuplicateProject', error);
    }
  };

  const onClick = (event) => {
    switch (event.key) {
      case 'view':
        navigate(`/${projectData.id}`);
        break;
      case 'duplicate':
        onDuplicateProject();
        break;
      case 'delete':
        onDeleteProject();
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

import { Menu, Button } from 'antd';
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

const MenuActions = () => {
  const onClick = (e) => {
    console.log('click ', e);
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
export default MenuActions;

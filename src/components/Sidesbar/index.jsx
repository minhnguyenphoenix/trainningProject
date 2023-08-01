import { HddTwoTone } from '@ant-design/icons';
import { Avatar } from 'antd';
function Sidebar() {
  return (
    <div className='h-full flex flex-col divide-y divide-teal-800'>
      <div className='h-4/6 flex flex-col items-center pt-6 '>
        <Avatar shape='square' size={140} icon={<HddTwoTone />} alt='Projectname' />
        <br />
        <p>{`Project Name`}</p>
      </div>
      <div className='h-2/6 flex flex-col items-center pt-10  '>
        <Avatar shape='circle' size={140} src='src/assets/border-collie.jpeg' alt='Usersname' />
        <br />
        <p>{`User's Avatar`}</p>
      </div>
    </div>
  );
}

export default Sidebar;

import { Col, Row, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProjectModal from '../NewProjectModal';
import TicketModal from '../AddNewTicketModal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Header() {
  const [modalPrOpen, setOpenPrModal] = useState(false);
  const [modalTiOpen, setOpenTiModal] = useState(false);

  let { projectId } = useParams();
  console.log(projectId);
  function onAddNewPr() {
    if (projectId) {
      setOpenTiModal(true);
    } else {
      setOpenPrModal(true);
    }
  }

  return (
    <>
      <Row className='flex content-center mb-10'>
        <Col span={17}>All Project</Col>
        <Col span={4} className=''>
          <Input size='medium' placeholder='Search' prefix={<SearchOutlined />} />
        </Col>
        <Col span={3} className='relative '>
          <Button type='primary' className='bg-sky-400 absolute right-0' onClick={onAddNewPr}>
            + Add New {!projectId ? `Project` : `Ticket`}
          </Button>
        </Col>
      </Row>
      <ProjectModal open={modalPrOpen} setOpen={setOpenPrModal} />
      <TicketModal open={modalTiOpen} setOpen={setOpenTiModal} />
    </>
  );
}

export default Header;

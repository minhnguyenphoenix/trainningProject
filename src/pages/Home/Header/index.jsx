import { Col, Row, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProjectModal from '../NewProjectModal';
import TicketModal from '../AddNewTicketModal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useStores } from '../../../stores';
import BreadcrumbHeader from '../../../components/Breadcrums';

function Header() {
  const { projectStore } = useStores();
  const [modalPrOpen, setOpenPrModal] = useState(false);
  const [modalTiOpen, setOpenTiModal] = useState(false);

  const { projectId, ticketId } = useParams();

  function onAddNewPr() {
    if (projectId) {
      setOpenTiModal(true);
    } else {
      setOpenPrModal(true);
    }
  }

  const onFilterProject = (e) => {
    projectStore.implementTextSearch(e.target.value);
  };

  return (
    <>
      <Row className={clsx('flex', 'content-center', 'mb-10')}>
        <Col span={17}>
          <BreadcrumbHeader />
        </Col>
        <>
          {!projectId ? (
            <Col span={4} className=''>
              <Input size='medium' placeholder='Search' prefix={<SearchOutlined />} onChange={onFilterProject} />
            </Col>
          ) : (
            <Col span={4} className='' />
          )}
          {!ticketId ? (
            <Col span={3} className='relative'>
              <Button type='primary' className='bg-sky-400 absolute right-0' onClick={onAddNewPr}>
                + Add New {!projectId ? `Project` : `Ticket`}
              </Button>
            </Col>
          ) : null}
        </>
      </Row>
      <ProjectModal open={modalPrOpen} setOpen={setOpenPrModal} />
      <TicketModal open={modalTiOpen} setOpen={setOpenTiModal} />
    </>
  );
}

export default Header;

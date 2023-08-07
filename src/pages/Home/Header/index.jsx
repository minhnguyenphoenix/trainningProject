import { Col, Row, Input, Button, Breadcrumb } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProjectModal from '../NewProjectModal';
import TicketModal from '../AddNewTicketModal';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';

function Header() {
  const [modalPrOpen, setOpenPrModal] = useState(false);
  const [modalTiOpen, setOpenTiModal] = useState(false);
  const [breadcrumbOptions, setBreadcrumbOptions] = useState([
    {
      title: <Link to={`/`}>All Projects</Link>,
    },
  ]);

  // {
  //   title: <Link to={`/${projectId}`}>Application Center</Link>,
  // },
  // {
  //   title: <Link to={`/${projectId}/${ticketId}`}>Application List</Link>,
  // },

  const { projectId, ticketId } = useParams();

  useEffect(() => {
    if (projectId) {
      setBreadcrumbOptions([...breadcrumbOptions, { title: <Link to={`/${projectId}`}>Application Center</Link> }]);
    }
    if (projectId && ticketId) {
      setBreadcrumbOptions([
        ...breadcrumbOptions,
        { title: <Link to={`/${projectId}`}>Application Center</Link> },
        { title: <Link to={`/${projectId}/${ticketId}`}>Application List</Link> },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, ticketId]);

  function onAddNewPr() {
    if (projectId) {
      setOpenTiModal(true);
    } else {
      setOpenPrModal(true);
    }
  }

  return (
    <>
      <Row className={clsx('flex', 'content-center', 'mb-10')}>
        <Col span={17}>
          <Breadcrumb items={breadcrumbOptions} />
        </Col>
        {!ticketId ? (
          <>
            <Col span={4} className=''>
              <Input size='medium' placeholder='Search' prefix={<SearchOutlined />} />
            </Col>
            <Col span={3} className='relative'>
              <Button type='primary' className='bg-sky-400 absolute right-0' onClick={onAddNewPr}>
                + Add New {!projectId ? `Project` : `Ticket`}
              </Button>
            </Col>
          </>
        ) : null}
      </Row>
      <ProjectModal open={modalPrOpen} setOpen={setOpenPrModal} />
      <TicketModal open={modalTiOpen} setOpen={setOpenTiModal} />
    </>
  );
}

export default Header;

import { Form, Row, Button, Space } from 'antd';
import { ShareAltOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useStores } from '../../stores';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { getObjectFromProxy } from '../../utils/common';

function TicketInfo() {
  const labelForm = (
    <>
      Images <Button>Upload</Button>
    </>
  );

  const { projectId, ticketId } = useParams();

  const { ticketStore } = useStores();

  const data = useMemo(() => ticketStore.getTicketInfo(projectId, ticketId), [ticketStore, projectId, ticketId]);
  console.log('data', getObjectFromProxy(data));

  return (
    <>
      <Form
        layout='vertical'
        // initialValues={}
      >
        <Row className='flex flex-row justify-between content-center'>
          <Row span={24} className='content-center'>
            <Space className='content-center'>
              <h3>Ticket Info</h3>
              <ShareAltOutlined />
              <InfoCircleOutlined />
            </Space>
          </Row>
          <Row span={24}>
            <Space>
              <Button>Save</Button>
              <Button>Delete</Button>
            </Space>
          </Row>
        </Row>
        <span>{`Ticket description for "Create Login page" ticket`}</span>
        <div className='border-2 border-black rounded'>
          <Form.Item name='images' label={labelForm}></Form.Item>
          <Form.Item name='storiesStore' label='Storires'></Form.Item>
          <Button>Add User Story</Button>
        </div>
      </Form>
    </>
  );
}

export default TicketInfo;

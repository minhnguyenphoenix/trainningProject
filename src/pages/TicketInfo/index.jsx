import { Form, Row, Button, Space } from 'antd';
import { ShareAltOutlined, InfoCircleOutlined } from '@ant-design/icons';

function TicketInfo() {
  const labelForm = (
    <>
      Images <Button>Upload</Button>
    </>
  );

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

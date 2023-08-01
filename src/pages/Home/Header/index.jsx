import { Col, Row, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function Header() {
  return (
    <Row className='flex content-center'>
      <Col span={17} className='border-2'>
        Breadcrumb
      </Col>
      <Col span={4} className=''>
        <Input size='medium' placeholder='Search' prefix={<SearchOutlined />} />
      </Col>
      <Col span={3} className='relative '>
        <Button type='primary' className='bg-sky-400 absolute right-0'>
          + New Project
        </Button>
      </Col>
    </Row>
  );
}

export default Header;

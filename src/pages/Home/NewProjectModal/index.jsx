import { Modal, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const headerText = (
  <>
    <h3>Add new project</h3>
    <span className='font-light text-xs'>Provide project informations</span>
  </>
);

const ProjectModal = ({ open, setOpen }) => {
  return (
    <Modal title={headerText} centered keyboard open={open} footer={null} onCancel={() => setOpen(false)} width={1000}>
      <Form layout='vertical'>
        <Form.Item
          name='projectName'
          label='Project Name'
          rules={[
            {
              required: true,
              message: 'Please input your project name!',
            },
          ]}
        >
          <Input placeholder='type something...' />
        </Form.Item>
        <Form.Item name='projectDescription' label='Project description'>
          <Input.TextArea cols='40' rows='5' placeholder='type something...' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='bg-sky-400 absolute right-0'>
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ProjectModal.defaultProps = {
  setOpen: null,
};

ProjectModal.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default ProjectModal;

import { Modal, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useStores } from '../../../stores';
import { toast } from '../../../utils/toast';

const headerText = (
  <>
    <h3>Add new project</h3>
    <span className='font-light text-xs'>Provide project informations</span>
  </>
);

const ProjectModal = ({ open, setOpen }) => {
  const { projectStore } = useStores();
  const [form] = Form.useForm();
  const onAddNewProject = (formValue) => {
    const newProject = {
      name: formValue.name,
      description: formValue.description,
      createdBy: 'Admin',
      tickets: 0,
      lastModified: moment().format('YYYY-MM-DD'),
      dateCreated: moment().format('YYYY-MM-DD'),
    };

    try {
      projectStore.addProject({ ...newProject });
      toast.success('Create product successfully^^');
    } catch (error) {
      throw new Error('Error', error);
    } finally {
      setOpen(false);
      form.resetFields();
    }
  };

  const onAddNewProjectFail = (errorInfo) => {
    throw new Error('Error', errorInfo);
  };

  return (
    <Modal title={headerText} centered keyboard open={open} footer={null} onCancel={() => setOpen(false)} width={1000}>
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          name: '',
          description: '',
        }}
        onFinish={onAddNewProject}
        onFinishFailed={onAddNewProjectFail}
      >
        <Form.Item
          name='name'
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
        <Form.Item name='description' label='Project description'>
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

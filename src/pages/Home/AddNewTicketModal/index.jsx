import { Modal, Form, Input, Button, Select } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import UploadImg from './UploadImg';
import { useStores } from '../../../stores';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Typography from 'antd/es/typography/Typography';
import { toast } from '../../../utils/toast';
import StoryRecord from './StoryRecord';

const headerText = (
  <>
    <h3>New Ticker</h3>
    <span className='font-light text-xs'>Provide ticket informations</span>
  </>
);

const TicketModal = ({ open, setOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [form] = Form.useForm();
  const { ticketStore } = useStores();
  const { projectId } = useParams();

  const nextStep = async () => {
    try {
      await form.validateFields(['ticketName']);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const resetForm = () => {
    form.resetFields();
    setImageList([]);
    setCurrentStep(0);
  };

  // const toBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });

  // const getBase64 = async (value) => {
  //   const { storyImage } = value;
  //   let transformImg = await toBase64(storyImage[0]?.originFileObj);
  //   console.log('Check1', transformImg);
  //   return {
  //     ...value,
  //     storyImage: [
  //       {
  //         ...storyImage[0],
  //         thumbUrl: transformImg,
  //       },
  //     ],
  //   };
  // };

  const onAddNewTicket = async () => {
    const formData = {
      ...form.getFieldValue(),
      images: imageList,
      // storyList: await form.getFieldValue().storyList.map((story) => getBase64(story)),
      lastModified: moment().format('YYYY-MM-DD'),
      dateCreated: moment().format('YYYY-MM-DD'),
      userStories: 0,
    };

    await ticketStore.addTicket(formData, projectId);
    setOpen(false);
    resetForm();
    toast.success('Create ticket success fully');
  };

  const onSelectOpt = (values) => {
    console.log(values);
  };

  return (
    <Modal title={headerText} centered keyboard open={open} footer={null} onCancel={() => setOpen(false)} width={1000}>
      <Form
        id='myForm'
        form={form}
        layout='vertical'
        initialValues={{
          ticketType: 'bugfix',
          ticketName: '',
          ticketDescription: '',
          images: [],
          storyList: [],
        }}
      >
        {currentStep === 0 && (
          <>
            <Form.Item name='ticketType' label='Ticket Type' className='flex flex-row'>
              <Select
                style={{
                  width: 150,
                }}
                onChange={onSelectOpt}
                options={[
                  {
                    value: 'bugfix',
                    label: 'Bugfix',
                  },
                  {
                    value: 'feature',
                    label: 'Feature',
                  },
                  {
                    value: 'improvement',
                    label: 'Improvement',
                  },
                  {
                    value: 'other',
                    label: 'Other',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name='ticketName'
              label='Name'
              rules={[
                {
                  required: true,
                  message: 'Please input your project name!',
                },
              ]}
            >
              <Input placeholder='type something...' />
            </Form.Item>
            <Form.Item name='ticketDescription' label='Description'>
              <Input.TextArea rows='5' placeholder='type something...' />
            </Form.Item>
          </>
        )}
        {currentStep === 1 && (
          <>
            <Form.Item name='images' label='Images'>
              <UploadImg fileList={imageList} setFileList={setImageList} lengthList={8} />
            </Form.Item>
            <Typography.Title level={5}> Stories </Typography.Title>
            <StoryRecord />
          </>
        )}

        <Form.Item>
          {currentStep < 1 && (
            <Button
              type='primary'
              htmlType='submit'
              className='bg-sky-400 absolute right-0 flex items-center'
              onClick={nextStep}
            >
              Next
              <DoubleRightOutlined />
            </Button>
          )}
          {currentStep === 1 && (
            <Button
              type='primary'
              className='bg-sky-400 absolute right-0 flex items-center'
              onClick={onAddNewTicket}
              htmlType='submit'
            >
              Save
            </Button>
          )}
          {currentStep > 0 && (
            <Button type='primary' onClick={prevStep} className='bg-sky-400 absolute left-0 flex items-center'>
              <DoubleLeftOutlined />
              Previous
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

TicketModal.defaultProps = {
  setOpen: null,
};

TicketModal.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default TicketModal;

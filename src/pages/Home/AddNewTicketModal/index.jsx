import { Modal, Upload, Form, Input, Button, Select, Space } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { DoubleRightOutlined, DoubleLeftOutlined, UploadOutlined } from '@ant-design/icons';
import UploadImg from './UploadImg';
import { useStores } from '../../../stores';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';

const headerText = (
  <>
    <h3>New Ticker</h3>
    <span className='font-light text-xs'>Provide ticket informations</span>
  </>
);

const TicketModal = ({ open, setOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [imageList, setImageList] = useState([]);
  // const [imageStoryList, setImageStoryList] = useState([]);
  const [form] = Form.useForm();
  const { ticketStore } = useStores();
  const { projectId } = useParams();

  const handleChange = (value) => {
    console.log(value);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onAddNewTicket = () => {
    const formData = {
      ...form.getFieldValue(),
      images: imageList,
      lastModified: moment().format('YYYY-MM-DD'),
      dateCreated: moment().format('YYYY-MM-DD'),
      userStories: 0,
    };
    ticketStore.addTicket(formData, projectId);
    setOpen(false);
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
                onChange={handleChange}
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
            {/* <Form.Item name='storyList' label='Stories'>
              <div className='w-full flex flex-row justify-between align-center'>
                <Input.TextArea placeholder='Story descriptions' className='' />
                <UploadImg
                  fileList={imageStoryList}
                  setFileList={setImageStoryList}
                  lengthList={1}
                  className='!w-1/5 !flex justify-center'
                />
              </div>
              <Button onClick={() => console.log('Add new story')} className='bg-gray-400 text-zinc-50 mt-4'>
                Add new user story
              </Button>
            </Form.Item> */}
            <Typography.Title level={5}> Stories </Typography.Title>
            <Form.List name='storyList'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                      }}
                      align='baseline'
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'storyDescription']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing story description',
                          },
                        ]}
                      >
                        <Input.TextArea placeholder='Story descriptions' />
                      </Form.Item>
                      {/* <Form.Item
                        {...restField}
                        name={[name, 'storyImage']}
                        getValueFromEvent={normFile}
                        valuePropName='fileList'
                      >
                        <UploadImg
                          fileList={imageStoryList}
                          setFileList={setImageStoryList}
                          lengthList={1}
                          className='!w-1/5 !flex justify-center'
                        />
                        <Upload name='logo' action='/upload.do' listType='picture'>
                          {uploadButton}
                        </Upload>
                      </Form.Item> */}

                      <Form.Item name={[name, 'storyImage']} valuePropName='fileList' getValueFromEvent={normFile}>
                        <Upload name='logo' action='/upload.do' listType='picture'>
                          <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        )}

        <Form.Item>
          {currentStep < 1 && (
            <Button type='primary' className='bg-sky-400 absolute right-0 flex items-center' onClick={nextStep}>
              Next
              <DoubleRightOutlined />
            </Button>
          )}
          {currentStep === 1 && (
            <Button
              form='myForm'
              type='primary'
              className='bg-sky-400 absolute right-0 flex items-center'
              onClick={onAddNewTicket}
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

import { Modal, Upload, Form, Input, Button, Select, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { DoubleRightOutlined, DoubleLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import UploadImg from './UploadImg';
import { useStores } from '../../../stores';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';
import { toast } from '../../../utils/toast';

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

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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
            <Form.List name='storyList'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} className='mb-6' align='middle'>
                      <Col className='w-8/12 h-full'>
                        <Form.Item
                          {...restField}
                          name={[name, 'storyDescription']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing story description',
                            },
                          ]}
                          className='mb-0'
                        >
                          <Input.TextArea classNames='' placeholder='Story descriptions' rows='4' />
                        </Form.Item>
                      </Col>

                      <Col className='w-1/12' />

                      <Col className='w-2/12'>
                        <Form.Item
                          name={[name, 'storyImage']}
                          valuePropName='fileList'
                          getValueFromEvent={normFile}
                          className='mb-0'
                        >
                          <Upload
                            name='avatar'
                            listType='picture-card'
                            className='avatar-uploader'
                            showUploadList={false}
                            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                            onChange={handleChange}
                          >
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt='avatar'
                                style={{
                                  width: '100%',
                                }}
                              />
                            ) : (
                              uploadButton
                            )}
                          </Upload>
                        </Form.Item>
                      </Col>
                      <Col className='w-1/12'>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                      Add new user story
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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

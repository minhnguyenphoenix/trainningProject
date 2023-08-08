import { Form, Row, Button, Space, Typography, Col, Upload, Input } from 'antd';
import {
  ShareAltOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useStores } from '../../stores';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import UploadImg from '../Home/AddNewTicketModal/UploadImg';

function TicketInfo() {
  const [imageList, setImageList] = useState();
  const { ticketStore } = useStores();
  const { projectId, ticketId } = useParams();
  const data = useMemo(() => ticketStore.getTicketInfo(projectId, ticketId), [ticketStore, projectId, ticketId]);
  const { ticketName, images, storyList } = data;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
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

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    setImageList(images);
  }, [images, storyList]);

  return (
    <>
      <Form layout='vertical' initialValues={{ ...data }}>
        <Row className='flex flex-row justify-between content-center'>
          <Row span={24} className='content-center' align='middle' justify='space-around'>
            <Row className='flex content-center '>
              <Typography.Title level={3}>{ticketName}</Typography.Title>
              <ShareAltOutlined className='text-2xl ml-3' />
              <InfoCircleOutlined className='text-2xl ml-3' />
            </Row>
          </Row>
          <Row span={24}>
            <Space>
              <Button>Save</Button>
              <Button>Delete</Button>
            </Space>
          </Row>
        </Row>
        <Typography.Title level={5}>{`Ticket description for ${ticketName} ticket`}</Typography.Title>
        <div className='border-2 border-black rounded'>
          <Form.Item name='images' label='Images'>
            <UploadImg fileList={imageList} setFileList={setImageList} lengthList={8} />
          </Form.Item>
          <Form.Item name='storyList' label='Storires'>
            <Form.List name='storyList'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} className='mb-6' align='middle'>
                      <Col className='w-7/12 h-full'>
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

                      <Col className='w-1/12'>
                        <Form.Item
                          {...restField}
                          name={[name, 'storyImage']}
                          // valuePropName='fileList'
                          getValueFromEvent={normFile}
                          className='mb-0'
                        >
                          <Upload
                            name='avatar'
                            listType='picture-card'
                            fileList={storyList.storyImage}
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
          </Form.Item>
        </div>
      </Form>
    </>
  );
}

export default TicketInfo;

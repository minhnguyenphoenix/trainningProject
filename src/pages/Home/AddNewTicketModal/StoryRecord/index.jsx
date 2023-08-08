import { Col, Form, Row, Input, Button, Upload } from 'antd';
import { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import UploadImg from '../UploadImg';

const StoryRecord = () => {
  const [imageUrl, setImageUrl] = useState();
  // const [image, setImage] = useState();
  const [list, setList] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info, idx) => {
    getBase64(info.file.originFileObj, (url) => {
      setImageUrl(url);
      const newlist = [...list];
      newlist[idx] = url;
      setList([...newlist]);
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
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
                  key={key}
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
                    onChange={(event) => handleChange(event, key)}
                  >
                    {imageUrl ? (
                      <img
                        src={list[key]}
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
  );
};

export default StoryRecord;

import { Modal, Form, Input, Button, Select } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import UploadImg from './UploadImg';

const headerText = (
  <>
    <h3>New Ticker</h3>
    <span className='font-light text-xs'>Provide ticket informations</span>
  </>
);

const TicketModal = ({ open, setOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (value) => {
    console.log(value);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Modal title={headerText} centered keyboard open={open} footer={null} onCancel={() => setOpen(false)} width={1000}>
      <Form
        layout='vertical'
        initialValues={{
          ticketType: 'bugfix',
          storiesStore: [],
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
                rules={[
                  {
                    required: true,
                    message: 'Please select ticket type',
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
              <UploadImg lengthList={8} />
            </Form.Item>
            <Form.Item name='storiesStore' label='Stories'>
              <div className='w-full flex flex-row justify-between align-center'>
                <Input.TextArea placeholder='Story descriptions' className='' />
                <UploadImg lengthList={1} className='!w-1/5 !flex justify-center' />
              </div>
              <Button onClick={() => console.log('Add new story')} className='bg-gray-400 text-zinc-50 mt-4'>
                Add new user story
              </Button>
            </Form.Item>
          </>
        )}

        <Form.Item>
          {currentStep < 1 && (
            <Button type='primary' className='bg-sky-400 absolute right-0 flex items-center' onClick={() => nextStep()}>
              Next
              <DoubleRightOutlined />
            </Button>
          )}
          {currentStep === 1 && (
            <Button
              type='primary'
              className='bg-sky-400 absolute right-0 flex items-center'
              onClick={() => console.log('On Submit')}
            >
              Save
            </Button>
          )}
          {currentStep > 0 && (
            <Button type='primary' onClick={() => prevStep()} className='bg-sky-400 absolute left-0 flex items-center'>
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

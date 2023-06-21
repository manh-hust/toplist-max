import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useRecoilValue } from 'recoil';
import { selectedMassagePlaceState } from '../../recoil/apiState';
import axios from 'axios';


const Rating = () => {
  const selectedMassagePlace = useRecoilValue(selectedMassagePlaceState);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `https://toplist-max-api-production.up.railway.app/api/massage-places/${selectedMassagePlace}/comments`,
        values
      );
      // Handle success
      message.success('Comment successfully');
      setVisible(false);
    } catch (error) {
      // Handle error
      message.error('Failed to comment');
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className='bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded-full'>
        Comment
      </Button>
      <Modal
        title="Comment"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="nickname"
            label="Display name: "
            rules={[
              {
                required: true,
                message: 'Please enter your display name: ',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Write your comment here:"
            rules={[
              {
                required: true,
                message: 'Please enter your comment',
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className='bg-yellow-400 '>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Rating;

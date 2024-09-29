import { Card, Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../../spinner/spinner';
import { useGetUserQuery, useUpdateUserMutation } from '../../../Utils/articlesApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../../../store/slices/userSlice';
import './profile.css';

const { Title } = Typography;

const Profile = () => {
  const dispatch = useDispatch();
  const { data: userData, error, isLoading } = useGetUserQuery();
  const [updateUser] = useUpdateUserMutation();
  const user = useSelector(selectUser);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.user) {
      dispatch(setUser(userData.user));
    }
  }, [userData, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    message.error('Failed to load user data');
    return null;
  }

  const defaultimage = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  const initialValues = {
    username: user?.username || '',
    email: user?.email || '',
    image: user?.image || defaultimage,
  };

  const onFinish = async (values) => {
    const updatedData = {
      email: values.email,
      username: values.username,
      image: values.image || null,
    };

    if (values.password) {
      updatedData.password = values.password;
    }

    try {
      const updatedUser = await updateUser(updatedData).unwrap();
      dispatch(setUser(updatedUser.user));
      message.success('Profile updated successfully!');
      navigate('/');
    } catch (error) {
      if (error?.data?.errors) {
        const serverErrors = Object.entries(error.data.errors).map(([field, message]) => ({
          name: field,
          errors: [message],
        }));

        form.setFields(serverErrors);

        message.error('There were some errors with your submission.');
      } else {
        message.error('Profile update failed.');
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="register">
      <Card className="register-card" bordered={true}>
        <Title level={3} className="register-title">
          Edit profile
        </Title>
        <Form
          form={form}
          name="profile"
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={false}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { min: 3, message: 'Username must be at least 3 characters long!' },
            ]}
            hasFeedback
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
            hasFeedback
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            label="New password"
            name="password"
            rules={[{ min: 6, message: 'Password must be at least 6 characters long!' }]}
            hasFeedback
          >
            <Input.Password placeholder="New password (optional)" />
          </Form.Item>

          <Form.Item
            label="Profile image (URL)"
            name="image"
            rules={[{ type: 'url', message: 'Please enter a valid URL!' }]}
            hasFeedback
          >
            <Input placeholder="Profile image URL" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;

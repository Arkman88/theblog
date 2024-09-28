import { Card, Form, Input, Button, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../../../Utils/articlesApi';
import { setUser } from '../../../store/slices/userSlice';

import './login.css';

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { email, password } = values;
      const result = await loginUser({ email, password }).unwrap();
      message.success('Login successful!');
      dispatch(setUser(result.user));
      setUser(values);
      console.log(result.user.image);
      navigate('/');
    } catch (error) {
      if (error?.data?.errors) {
        const errorMessages = Object.entries(error.data.errors)
          .map(([field, message]) => `${field}: ${message}`)
          .join(', ');
        message.error(`${errorMessages}`);
      } else {
        message.error('Registration failed!');
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <Card className="login-card" bordered={true}>
        <Title level={3} className="login-title">
          Sign In
        </Title>
        <Form name="login" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters long!' },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="register-link">
          <Text>Don`t have an account? </Text>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;

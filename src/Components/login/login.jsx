import { Card, Form, Input, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './login.css';

const { Title, Text } = Typography;

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
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
            name="Email address"
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

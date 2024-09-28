import { useCreateUserMutation } from '../../../Utils/articlesApi';
import { Card, Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import './register.css';

const { Title, Text } = Typography;

const Register = () => {
  const [createUser] = useCreateUserMutation();

  const onFinish = async (values) => {
    try {
      const { username, email, password } = values;
      const result = await createUser({ username, email, password }).unwrap();
      message.success('Registration successful!');
      console.log('Result:', result);
    } catch (error) {
      message.error('Registration failed!');
      console.error('Error:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="register">
      <Card className="register-card" bordered={true}>
        <Title level={3} className="register-title">
          Create new account
        </Title>
        <Form name="register" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { min: 3, message: 'Username must be at least 3 characters long!' },
            ]}
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

          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms')),
              },
            ]}
          >
            <Checkbox>I agree to the processing of my personal information</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create
            </Button>
          </Form.Item>
        </Form>
        <div className="login-link">
          <Text>Already have an account? </Text>
          <Link to="/sign-in">Sign In</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;

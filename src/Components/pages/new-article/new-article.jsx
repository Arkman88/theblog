import { useState } from 'react';
import { Card, Form, Input, Button, message, Typography } from 'antd';
import { useCreateArticleMutation } from '../../../store/articlesApi';
import { useNavigate } from 'react-router-dom';

import styles from './new-article.module.scss';

const { Title } = Typography;
const { TextArea } = Input;

const NewArticle = () => {
  const [tagList, setTags] = useState(['']);
  const [createArticle] = useCreateArticleMutation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { title, description, text } = values;
      const result = await createArticle({
        title,
        description,
        body: text,
        tagList,
      }).unwrap();
      message.success(`Article created successfully! Title: ${result.article.title}`);
      navigate('/');
    } catch (error) {
      message.error('Failed to create article');
      console.error('Error:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tagList];
    newTags[index] = value;
    setTags(newTags);
  };

  const addTag = () => {
    setTags([...tagList, '']);
  };

  const removeTag = (index) => {
    const newTags = tagList.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className={styles['new-article']}>
      <Card className={styles['new-article-card']} bordered={true}>
        <Title level={3} className={styles['new-article-title']}>
          Create New Article
        </Title>
        <Form name="new-article" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            label="Short Description"
            name="description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input placeholder="Short Description" />
          </Form.Item>

          <Form.Item label="Text" name="text" rules={[{ required: true, message: 'Please input the article text!' }]}>
            <TextArea rows={4} placeholder="Article Text" />
          </Form.Item>

          <Form.Item label="Tags">
            {tagList.map((tag, index) => (
              <div key={index} className="tag-input">
                <Input
                  className={styles['new-article-tag']}
                  placeholder="Tag"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                />
                <Button danger onClick={() => removeTag(index)}>
                  Delete
                </Button>
              </div>
            ))}
            <Button className={styles['add-tag']} type="dashed" onClick={addTag}>
              Add Tag
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewArticle;

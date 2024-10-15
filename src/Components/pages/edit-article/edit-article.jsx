import { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Typography } from 'antd';
import { useGetArticleQuery, useUpdateArticleMutation, useFetchArticlesQuery } from '../../../store/articlesApi';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../spinner/spinner';

import styles from './edit-article.module.scss';

const { Title } = Typography;
const { TextArea } = Input;

const EditArticle = () => {
  const { slug } = useParams();
  const { data: articleData, error } = useGetArticleQuery(slug);
  const [updateArticle] = useUpdateArticleMutation();
  const { refetch: refetchArticles, isFetching } = useFetchArticlesQuery({ limit: 5, offset: 0 });
  const [tagList, setTags] = useState(['']);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (articleData) {
      setTags(articleData.article.tagList);
      form.setFieldsValue({
        title: articleData.article.title,
        description: articleData.article.description,
        text: articleData.article.body,
      });
    }
  }, [articleData, form]);

  useEffect(() => {
    if (error) {
      message.error('Failed to fetch article');
      navigate('/articles');
    }
  }, [error, navigate]);

  const onFinish = async (values) => {
    try {
      const { title, description, text } = values;
      const result = await updateArticle({
        slug,
        articleData: {
          title,
          description,
          body: text,
          tagList: tagList.filter((tag) => tag.trim() !== ''),
        },
      }).unwrap();
      message.success(`Article updated successfully! Title: ${result.article.title}`);
      await refetchArticles();
      navigate('/articles');
    } catch (error) {
      message.error('Failed to update article');
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

  if (!articleData) {
    return <Spinner />;
  }

  return (
    <div className={styles['edit-article']}>
      <Card className={styles['edit-article-card']} bordered={true}>
        <Title level={3} className={styles['edit-article-title']}>
          Edit Article
        </Title>
        <Form
          form={form}
          name="edit-article"
          layout="vertical"
          initialValues={{
            title: articleData?.article.title,
            description: articleData?.article.description,
            text: articleData?.article.body,
            tags: tagList,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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
                  className={styles['edit-article-tag']}
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
            <Button type="primary" htmlType="submit" block disabled={isFetching}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditArticle;

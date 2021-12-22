import { Button, Form, Input } from "antd";
import * as React from "react";

const BlogForm = ({ data, onFinish, loading }) => {
  return (
    <Form
      onFinish={(values) => onFinish(values)}
      initialValues={data || {}}
      style={{ padding: "15px 0" }}
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Title is required" }]}
        label="Title"
        labelCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="body"
        rules={[{ required: true, message: "Body is required" }]}
        label="Body"
        labelCol={{ span: 24 }}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="author"
        rules={[{ required: true, message: "Author is required" }]}
        label="Author"
        labelCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType="submit">
          {data ? "Save" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BlogForm;

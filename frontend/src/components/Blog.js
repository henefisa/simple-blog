import * as React from "react";
import { Button, Card, Modal, notification, Popconfirm } from "antd";
import styled from "styled-components";
import BlogForm from "./BlogForm";
import axios from "axios";
import { API_END_POINT } from "../constants/api";
import { useContext } from "../context/Context";

const StyledCard = styled(Card)`
  .blog__title {
    font-weight: 600;
    font-size: 16px;
  }

  .blog__body {
    margin-bottom: 12px;
    font-size: 16px;
  }

  .blog__author {
    font-style: italic;
    font-size: 14px;
  }

  .ant-card-actions {
    padding: 24px;
    display: flex;
    li {
      width: auto !important;
    }
  }
`;

const Blog = ({ id, title, body, author }) => {
  const [, setBlogs] = useContext();

  const [isEdit, setIsEdit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleOpenModal = () => setIsEdit(true);
  const handleCloseModal = () => setIsEdit(false);

  const handleFinish = async (id, values) => {
    setIsLoading(true);
    const response = await axios.patch(API_END_POINT + "/blog/" + id, values);
    if (response.status === 200) {
      setBlogs((prevState) =>
        prevState.map((blog) => (blog.id === id ? response.data : blog))
      );
    }
    setIsLoading(false);
    setIsEdit(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await axios.delete(API_END_POINT + "/blog/" + id);
    if (response.status === 204) {
      notification.success({ message: "Delete" });
      setBlogs((prevState) => prevState.filter((blog) => blog.id !== id));
    }
    setIsLoading(false);
    setIsEdit(false);
  };

  return (
    <StyledCard
      title={<h4 className="blog__title">{title}</h4>}
      className="blog"
      actions={[
        <Button onClick={handleOpenModal} type="primary">
          Edit
        </Button>,
        <Popconfirm onConfirm={handleDelete} title="Are your want to delete?">
          <Button type="primary" danger style={{ marginLeft: "10px" }}>
            Delete
          </Button>
        </Popconfirm>,
      ]}
    >
      <div className="blog__body">{body}</div>
      <address className="blog__author">{author}</address>
      <Modal visible={isEdit} onCancel={handleCloseModal} footer={null}>
        <BlogForm
          data={{ title, body, author }}
          onFinish={(values) => handleFinish(id, values)}
          loading={isLoading}
        />
      </Modal>
    </StyledCard>
  );
};

export default Blog;

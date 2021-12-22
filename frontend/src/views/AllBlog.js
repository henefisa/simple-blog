import * as React from "react";
import axios from "axios";
import { API_END_POINT } from "../constants/api";
import Blog from "../components/Blog";
import styled from "styled-components";
import { Button, Card, Empty, Modal } from "antd";
import BlogForm from "../components/BlogForm";
import Context from "../context/Context.js";

const StyledList = styled.div`
  .blog:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const StyledWrapper = styled.div`
  max-height: 80vh;
  overflow: auto;
  margin-top: 12px;
`;

const AllBlog = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  React.useEffect(() => {
    const getBlog = async () => {
      const response = await axios.get(API_END_POINT + "/blog");
      if (response.status === 200) {
        setBlogs(response.data.blogs);
      } else {
        console.log("Failed to fetch");
      }
    };

    getBlog();
  }, []);

  const handleFinish = async (values) => {
    setIsLoading(true);

    const response = await axios.post(API_END_POINT + "/blog/create", values);
    if (response.status === 201) {
      setBlogs((prevState) => [...prevState, response.data]);
    }
    setIsLoading(false);
    handleCloseModal();
  };

  return (
    <Context.Provider value={[blogs, setBlogs]}>
      <StyledList>
        <Button onClick={handleOpenModal} type="primary">
          Create
        </Button>
        <StyledWrapper>
          {blogs.length ? (
            blogs.map((blog) => (
              <Blog
                key={blog.id}
                id={blog.id}
                title={blog.title}
                body={blog.body}
                author={blog.author}
              />
            ))
          ) : (
            <Card>
              <Empty description="Your blog is empty" />
            </Card>
          )}
        </StyledWrapper>
        <Modal visible={isOpen} onCancel={handleCloseModal} footer={null}>
          <BlogForm onFinish={handleFinish} loading={isLoading} />
        </Modal>
      </StyledList>
    </Context.Provider>
  );
};

export default AllBlog;

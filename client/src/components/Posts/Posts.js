import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Form, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deletePostById, getPostsByTitle, insertPost } from '../../API';
import { UserContext } from '../../Hooks/userContext';
import { useForm } from '../../Hooks/useForm';

const Posts = ({ title }) => {
  const [comments, setComments] = useState('');
  const { user } = useContext(UserContext);
  const [values, handleChange] = useForm({
    username: '',
    title: '',
    comment: '',
  });

  useEffect(() => {
    getPostsByTitle(title).then((res) => setComments(res));
  }, []);

  const handleDeletePost = async (comment) => {
    try {
      await deletePostById(comment._id);
      setComments(comments.filter((item) => item._id != comment._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewPost = async () => {
    try {
      const postObj = {
        username: user.username,
        title,
        comment: values.comment,
      };

      await insertPost(postObj);
      const updated = await getPostsByTitle(title);
      setComments(updated);
      values.comment = '';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card
        style={{
          width: '1000px',
          margin: 'auto',
          marginTop: '1rem',
        }}
      >
        <Card.Body>
          <Card.Title>Post new comment</Card.Title>
          <Card.Text>
            <Form.Control
              name='comment'
              placeholder='Comment'
              value={values.comment}
              onChange={handleChange}
            />
          </Card.Text>
          <Button
            variant='primary'
            type='submit'
            onClick={() => handleNewPost()}
          >
            Submit
          </Button>
        </Card.Body>
      </Card>
      {comments &&
        comments.map((comment, i) => {
          return (
            <Row
              style={{
                width: '1000px',
                margin: 'auto',
                marginTop: '1rem',
              }}
              key={comment + i + 1}
            >
              <Card key={i} style={{ width: '100rem' }}>
                <Card.Body>
                  <Card.Title>
                    <pre key={comment + i}>{`Post by: ${
                      comment.username
                    } @ ${new Date(comment.createdAt).toUTCString()}`}</pre>
                  </Card.Title>
                  <Card.Text>
                    <Form.Control
                      type='text'
                      placeholder='Comment'
                      aria-describedby='inputGroupPrepend'
                      defaultValue={comment.post}
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      Please choose a username.
                    </Form.Control.Feedback>
                  </Card.Text>
                  {user.username === comment.username ? (
                    <>
                      <Button
                        variant='primary'
                        onClick={() => handleDeletePost(comment)}
                      >
                        Delete
                      </Button>
                      <Button variant='primary'>Update</Button>
                    </>
                  ) : (
                    ''
                  )}
                </Card.Body>
              </Card>
            </Row>
          );
        })}
    </>
  );
};

Posts.propTypes = {
  title: PropTypes.string,
};

export default Posts;

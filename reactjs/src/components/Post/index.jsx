import React, { useState, useEffect } from 'react';

import './style.css';

const Post = (props) => {
  const [newComment, setNewComment] = useState('')
  const { post : { id, author, content, isClicked, comments }, onClickPost } = props

  useEffect(() => {
    console.log(`Post with content: ${isClicked}`)
  }, [isClicked]);

  const handleChangeComment = (event) => setNewComment(event.target.value)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API add comment
    console.log('comment', newComment)
    setNewComment('')
  }

  const renderComment = (comment) => {
    return (
      <div className="post__comment">
        <div className="post__comment__author">{comment.author}</div>
        <div className="post__comment__content">{comment.content}</div>
      </div>
    )
  }
  
  return (
    <div className={isClicked ? "post post--clicked" : "post"} onClick={() => onClickPost(id)}>
      <p className="post__author">{author}</p>
      <p className="post__content">{content}</p>

      <form className="post__comment-creation" onSubmit={handleSubmit}>
        <input 
          className="post__comment-creation__input" 
          type="text" 
          value={newComment} 
          onChange={handleChangeComment}
          placeholder='Viết bình luận ...' 
        />
        <button 
          type="submit"
          className="post__comment-creation__button" 
        >
          Thêm
        </button>
      </form>

      {comments.map(comment => renderComment(comment))}
    </div>
  );
}

export default Post;
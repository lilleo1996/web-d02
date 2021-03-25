import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./style.scss";
import Post from "../../components/Post";

const postList = [
  {
    id: uuidv4(),
    author: "Công Hiếu",
    content: "Anh comeback với một Công Hiếu thật phong cách.",
    isClicked: false,
    comments: [
      {
        author: 'Nguyễn A',
        content: 'Hihi'
      },
      {
        author: 'Trần B',
        content: 'Haha'
      },
      {
        author: 'Thị C',
        content: 'Hoho'
      }
    ]
  },
  {
    id: uuidv4(),
    author: "Ngọc Hiệp",
    content: "Yêu là phải nói cũng như đói là phải ăn.",
    isClicked: false,
    comments: [
      {
        author: 'Quang Pink',
        content: 'Ben 10'
      },
      {
        author: 'Minh Spring',
        content: 'Bla bla.....'
      },
      {
        author: 'Quý S',
        content: 'Chuẩn cơm mẹ nấu anh ơi,,,'
      }
    ]
  },
  {
    id: uuidv4(),
    author: "Minh Quý",
    content: "Ahihi.",
    isClicked: false,
    comments: []
  },
];

const Home = () => {
  const [posts, setPosts] = useState(postList) 

  const handleClickPost = (postId) => {
    const newPosts = posts.map((post) => {
      if (post.id === postId) return { ...post, isClicked: !post.isClicked };
      return post;
    });

    setPosts(newPosts)
  };

  return (
    <div className="home">       
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onClickPost={handleClickPost}
        />
      ))}
    </div>
  )
}

export default Home;

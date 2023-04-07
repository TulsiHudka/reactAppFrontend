import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from './BlogPost.module.css'

function BlogPost() {
  const params = useParams();
  const [blogDetail, setBlogDetail] = useState({})
  console.log(params.blogId);
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    fetch(`http://localhost:8000/blogs/${params.blogId}`, {
      headers: {
        Authorization: "Bearer " + token
      },
    })
      .then((response) => response.json())
      .then((blog) => setBlogDetail(blog))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{blogDetail.title}</h2>
      <h5 className={classes.author}>{blogDetail.author}</h5>
      <h5 className={classes.category}>{blogDetail.category}</h5>
      <p className={classes.description}>{blogDetail.description}</p>
    </div>
  );
}

export default BlogPost;

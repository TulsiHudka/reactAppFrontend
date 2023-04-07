import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditBlog.module.css";


function AddBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const token = JSON.parse(localStorage.getItem("token"))
  const isLogin = JSON.parse(localStorage.getItem("user"))
  const username = isLogin.email.substring(0, isLogin.email.indexOf("@"))
  const newBlog = {
    title,
    description,
    author,
    category,
    admin: username
  };
  console.log(newBlog);
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:8000/addBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(newBlog),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div class="form-outline mb-4">
          <label class="form-label" for="form4Example1">
            Title
          </label>
          <input
            type="text"
            id="form4Example1"
            class="form-control"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" for="form4Example3">
            Decriprion
          </label>
          <textarea
            class="form-control"
            id="form4Example3"
            rows="4"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          ></textarea>
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" for="form4Example2">
            Author
          </label>
          <input
            type="text"
            id="form4Example2"
            class="form-control"
            onChange={(event) => setAuthor(event.target.value)}
            value={author}
          />
        </div>

        <div class="form-outline mb-4">
          <label class="form-label" for="form4Example2">
            category
          </label>
          <input
            type="text"
            id="form4Example2"
            class="form-control"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          />
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
          AddBlog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;

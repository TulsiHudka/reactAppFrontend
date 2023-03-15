import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import classes from "./BlogPost.module.css";
import { useContext } from "react";
import { ProfileMenu } from "../context/ProfileMenu";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

function Blogs() {
  const { checkRole, checkLogin } = useContext(ProfileMenu);
  const [rowData, setRowData] = useState([]);
  const nevigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((response) => response.json())
      .then((data) => setRowData(data))
      .catch((error) => console.error(error));
  }, []);

  const deleteHandler = (id) => {
    console.log(`Button clicked for row with ID ${id}`);
    fetch(`http://localhost:5000/blogs/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        fetch(`http://localhost:5000/blogs`)
          .then((response) => response.json())
          .then((data) => setRowData(data));
      });
  };

  const editHandler = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        nevigate(`edit/${id}`);
      });
  };

  const columnDefs = [
    { field: "id" },
    {
      headerName: "Title",
      field: "title",
      cellRenderer: (e) => {
        const blogId = e.data.id;
        return (
          <Link to={`/${blogId}`} className={classes.blogTitle}>
            {e.value}
          </Link>
        );
      },
    },
    { field: "description" },
    { field: "author" },
    { field: "category" },
    checkRole && {
      field: "actions",
      cellRendererFramework: ({ data }) => (
        <div>
          <button
            onClick={() => editHandler(data.id)}
            className={classes.editButton}
          >
            Edit{" "}
          </button>
          <button onClick={() => deleteHandler(data.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "500px", width: checkRole ? "90vw" : "80vw", margin: "100px auto" }}
    >
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
}

export default Blogs;
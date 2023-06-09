import React, { useEffect, useState } from 'react'
import { getUsers } from "../Store/user-slice";
import { useDispatch } from "react-redux";
import { changeRole } from '../services/userApi';

const ChangeRole = (user) => {
  const data = user?.data
  const id = data._id
  console.log(data._id);
  const [role, setRole] = useState()
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    console.log(data);
    setRole(data?.role)
  }, [data?.role])

  const roleChangeHandler = async (e) => {
    e.preventDefault()
    const updatedRole = { id, role }
    await changeRole(updatedRole)
    dispatch(getUsers())
  }

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Change Role</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <select className="form-select" aria-label="Default select example" value={role
              } onChange={(e) => setRole(e.target.value)}>
                <option value={"admin"}>Admin</option>
                <option value={"user"}>User</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={roleChangeHandler} >Change</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangeRole
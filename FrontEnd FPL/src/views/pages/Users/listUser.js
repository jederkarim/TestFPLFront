import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


const ListUser = () => {
  const [users, setUsers] = useState([]);
  const handleUserList = async () => {
    try {
      const userlist = await axios.get('http://localhost:4000/api/user')
      setUsers(userlist.data)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    handleUserList();
  }, []);

  const deleteOneUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/${id}`)
      handleUserList();
    }
    catch (error) {
      console.log(error)
    }
  };


  return (
    <div className="row">

      <div className="col-md-12">
        <h4>Users list</h4>
        <div>
          <div className="d-grid gap-2">
            <Link to="/admin/adduser">
              <button className="btn btn-success" type="button">
                <i className='fa fa-plus'></i> Add new user</button>
            </Link>
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">first Name:</th>
                <th scope="col">last Name:</th>
                <th scope="col">E-mail</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {users &&
              users.map((user, index) => (
                <tbody key={user._id}>
                  <tr>
                          <th scope="row">{index + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>

                      <button className='btn btn-danger me-1' onClick={(e) => { deleteOneUser(e, user._id) }}>
                        <i className='fa fa-trash'></i> Delete</button>
                      <Link to={`/admin/UpdateUser/${user._id}`} className='btn btn-success'>
                        <i className='fa fa-edit'></i> Update</Link>
                    </td>
                  </tr>
                </tbody>
              )
              )}
          </table>
        </div>
      </div>

    </div>
  )





}

export default ListUser
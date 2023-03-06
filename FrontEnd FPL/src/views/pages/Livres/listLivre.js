import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


const ListLivre = () => {
  const [livres, setLivres] = useState([]);
  const handleLivreList = async () => {
    try {
      const livreList = await axios.get('http://localhost:4000/api/livres')
      setLivres(livreList.data)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    handleLivreList();
  }, []);
  console.log(livres) 


  const deleteOneLivre = async (e, id) => {
    try {
      await axios.delete(`http://localhost:4000/api/livres/${id}`)
      handleLivreList();
    }
    catch (error) {
      console.log(error)
    }
  };



  return (
    <div className="row">
      <div className="col-md-12">
        <h4>Livre list</h4>
        <div>
          <div className="d-grid gap-2">
            <Link to="/admin/addlivre">
              <button className="btn btn-success" type="button">
                <i className='fa fa-plus'></i> Add new livre</button>
            </Link>
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Titre</th>
                <th scope="col">Auteur</th>
                <th scope="col">Description</th>
                <th scope="col">category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {livres &&
              livres.map((livre, index) => (
                <tbody key={livre._id}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{livre.Titre}</td>
                    <td>{livre.Auteur}</td>
                    <td>{livre.Description}</td>
                    <td>{livre.category}</td>

                    <td>
                      <button className='btn btn-danger me-1' onClick={(e) => { deleteOneLivre(e, livre._id) }}>
                        <i className='fa fa-trash'></i> Delete</button>
                      <Link to={`/admin/UpdateLivre/${livre._id}`} className='btn btn-success'><i className='fa fa-edit'>
                      </i> Update</Link>
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
export default ListLivre


import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


const ListCategorie = () => {
    const [categories, setCategories] = useState([]);
    const handleCategorieList = async () => {
        try {
            const reponce = await axios.get('http://localhost:4000/api/categorie')
            console.log(reponce.data)
            setCategories(reponce.data)
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        handleCategorieList();
    }, []);
    console.log(categories)


    const refreshList = () => {
        handleCategorieList();
    };

    const deleteOneCategorie = async (e, id) => {
        try {
            await axios.delete(`http://localhost:4000/api/categorie/${id}`)
            handleCategorieList();
            refreshList();
        }
        catch (error) {
            console.log(error)
        }
    };



    return (
        <div className="row">
            <div className="col-md-12">
                <h4>Categorie list</h4>
                <div>
                    <div className="d-grid gap-2">
                        <Link to="/admin/addcategories">
                            <button className="btn btn-success" type="button">
                                <i className='fa fa-plus'></i> Add new Categorie</button>
                        </Link>
                    </div>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Categorie Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories &&
                                categories.map((categorie, index) => (

                                    <tr key={categorie._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{categories.nomcategorie}</td>
                                        <td>
                                            <button className='btn btn-danger me-1' onClick={(e) => { deleteOneCategorie(e, categorie._id) }}>
                                                <i className='fa fa-trash'></i> Delete</button>
                                            <Link to={`/admin/UpdateCategorie/${categorie._id}`} className='btn btn-success'><i className='fa fa-edit'></i> Update</Link>
                                        </td>
                                    </tr>
                                )
                                )}
                        </tbody>

                    </table>
                </div>

            </div>

        </div>
    )
}
export default ListCategorie


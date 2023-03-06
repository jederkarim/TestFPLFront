import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';

function UpdateLivre() {
    const params = useParams()
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState({});
    const [livre, setLivre] = useState({
        Titre: "",
        Auteur: "",
        Contenue: "",
        Description: "",
        category: "",
    });
    const validationSchema = Yup.object().shape({
        Titre: Yup.string()
            .required("Book title is required."),
        Auteur: Yup.string()
            .required("Auther name is required."),
        Description: Yup.string()
            .required("Description is required."),
        categories: Yup.string()
    });

    const handleUpdateLivre = async (values) => {
        try {
            livre.preventDefault()
            await axios.put('http://localhost:4000/api/livres/' + params.id, livre)
            navigate("/admin/listLivre");
        } catch (error) {
            console.log(error);

        }
    };
    useEffect(() => {

        axios.get('http://localhost:4000/api/categorie')
            .then(res => {
                setLoading(false)
                setCategories(res.data)
                setError('')
            }
            )
            .catch(error => {
                setLoading(false)
                setCategories({})
                setError({ error: error.message })
            }

            )
    }, [])
    const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value
        setLivre({ ...livre, [id]: value })
    }

    useEffect(() => {
        const getLivre = async () => {
            const LivrefromServer = await axios.get('http://localhost:4000/api/livres/' + params.id)
            setLivre(LivrefromServer.data);
        };
        getLivre();
    }, [params]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Add new livre</h1>
                    <Formik
                        validationSchema={validationSchema}
                        onSubmit={handleUpdateLivre}
                    >
                        <Form>

                            <div className="form-group mb-3">
                                <label htmlFor="Titre">Titre:</label>

                                <Field
                                    type="text"
                                    id="Titre"
                                    name="Titre"
                                    value={livre.Titre}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your Title here"
                                />
                                <ErrorMessage
                                    name="Titre"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="Auteur">Auteur:</label>
                                <Field
                                    type="text"
                                    name="Auteur"
                                    value={livre.Auteur}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your Author here"
                                />
                                <ErrorMessage
                                    name="Auteur"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="Description">Description:</label>
                                <Field
                                    type="text"
                                    name="Description"
                                    value={livre.Description}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your description here"
                                />
                                <ErrorMessage
                                    name="Description"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="category" className="font-weight-bold">Category</label>
                                <select name="category" id="category" value={livre.category} onChange={handleChange}>
                                    {
                                        loading ? 'loading' : categories?.map((item) =>
                                            <option key={item._id} >{item.name}</option>
                                        )
                                    }
                                    {error ? error : null}
                                </select>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" value="update" className="btn btn-primary" to="/admin/UpdateLivre">
                                    <i className='fa fa-save'></i> Update
                                </button>
                                <Link className="btn btn-link" to="/livres">
                                    Back
                                </Link>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div >
    );
};

export default UpdateLivre;

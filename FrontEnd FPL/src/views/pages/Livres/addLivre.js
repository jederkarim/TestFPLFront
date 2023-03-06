import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';





function AddLivre() {
    var Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState({});


    const validationSchema = Yup.object().shape({
        Titre: Yup.string()
            .required("Book title is required."),
        Auteur: Yup.string()
            .required("Auther name is required."),
        Description: Yup.string()
            .required("Description is required."),
        categories: Yup.string()
    });
    const initialValues = {
        Titre: "",
        Auteur: "",
        Contenue: "",
        Description: "",
        category: "",
    };
    useEffect(() => {
        axios.get('http://localhost:4000/api/categorie')
            .then(res => {
                console.log(res)
                setLoading(false)
                setCategories(res.data.data)
                setError('')
            }
            )
            .catch(error => {
                setLoading(false)
                setCategories({})
                setError({ error: error.message })
            })
    }, [])

    const handleSubmit = async (values) => {
        try {
            await axios.post('http://localhost:4000/api/livres', values)
            Navigate("/admin/listLivre");
        } catch (error) {
            console.log(error);
        }
    };

    // const [setSelectedFile] = useState(null)
    // const handelPicChange = (e) => {
    //     if (e.target.files.length > 0) {
    //         const selectedFile = e.target.files[0]
    //         setSelectedFile(selectedFile)
    //     }
    // }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Add new livre</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        <Form>
                            <div className="form-group mb-3">
                                <label htmlFor="Titre">Titre:</label>
                                <Field
                                    type="text"
                                    name="Titre"
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
                                    className="form-control"
                                    placeholder="Enter your description here"
                                />
                                <ErrorMessage
                                    name="Description"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>

                            <div className='my-4'>
                                <label htmlFor="categories" className="font-weight-bold">categories</label>
                                <Field as="select" name="categories" id="categories" >
                                    {
                                        loading ? 'loading' : categories?.map((item) =>
                                            <option key={item.categories} >{item.categories}</option>
                                        )
                                    }
                                    {error ? error : null}
                                </Field>
                            </div>
                            <div className="form-group my-4">
                                <label htmlFor="content" className="font-weight-bold">File</label>
                                <input
                                    type="file"
                                    name="content"
                                    className='form-control-file'
                                    onChange={(e) =>
                                        Formik.setFieldValue('Contenue', e.currentTarget.files[0])
                                    }
                                />
                            </div>

                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">
                                    <i className='fa fa-save'></i> Add new Livre
                                </button>
                                <Link className="btn btn-link" to="/admin/listLivre">
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

export default AddLivre;

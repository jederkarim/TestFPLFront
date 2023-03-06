import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCategories = () => {
    var Navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        nomcategorie: Yup.string()
            .min(5, "Too short.")
            .max(50, "Too long.")
            .required("categorie is required."),
    });

    const initialValues = {
        nomcategorie: ""
    };
    const handleSubmit = async (values) => {
        try {
            await axios.post('http://localhost:4000/api/categorie', values)
            Navigate("/admin/listCategorie");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Add new Categorie</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="form-group mb-3">
                                    <label htmlFor="nomcategorie">Categorie name:</label>
                                    <Field
                                        type="text"
                                        name="nomcategorie"
                                        className="form-control"
                                        placeholder="Enter your categorie here"

                                    />
                                    <ErrorMessage
                                        name="nomcategorie"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">
                                        <i className='fa fa-save'></i> Add new Categorie
                                    </button>
                                    <Link className="btn btn-link" to="/categories">
                                        Back
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AddCategories


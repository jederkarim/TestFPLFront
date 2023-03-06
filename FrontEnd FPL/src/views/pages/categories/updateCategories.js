import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from 'axios';


function UpdateCategories() {
    const params = useParams()
    let navigate = useNavigate();
    const [categorie, setCategorie] = useState({
        nomcategorie: ""

    });
    const validationSchema = Yup.object().shape({
        nomcategorie: Yup.string()
            .min(5, "Too short.")
            .max(50, "Too long.")
            .required("categorie is required."),
    });

    const handleUpdateCategorie = async (event) => {
        try {
            await axios.put('http://localhost:4000/api/categorie/' + params.id, categorie)
            navigate("/admin/listcategorie");
        } catch (error) {
            console.log(error);

        }
    };
    const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value
        setCategorie({ ...categorie, [id]: value })
    }

    useEffect(() => {
        const getCategorie = async () => {
            const categoriefromServer = await axios.get('http://localhost:4000/api/categorie/' + params.id)
            setCategorie(categoriefromServer.data);
        };
        getCategorie();
    }, [params]);




    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Add new Categorie</h1>
                    <Formik
                        initialValues={categorie || { nomcategorie: "" }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleUpdateCategorie(values)}
                        enableReinitialize
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Categorie name:</label>
                                    <Field
                                        type="text"
                                        id="nomcategorie"
                                        value={categorie.nomcategorie}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter your Categorie name here"

                                    />
                                    <ErrorMessage
                                        name="nomcategorie"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" value="update" className="btn btn-primary">
                                        <i className='fa fa-save'></i> Update
                                    </button>
                                    <Link className="btn btn-link" to="/admin/listnomCategories">
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
export default UpdateCategories;

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import "bootstrap/dist/css/bootstrap.css";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Register = () => {
    const Navigate = useNavigate()
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      };


    const handleSubmit = async (values) => {
      try { 
        await axios.post('http://localhost:4000/api/users', values)
        toast.success("add in successfully.");
        Navigate("/login");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
          .min(2, "Too short.")
          .max(50, "Too long.")
          .required("First name is required."),
        lastName: Yup.string()
          .min(2, "Too short.")
          .max(10, "Too long.")
          .required("Last name is required."),
        email: Yup.string()
          .email("Invalid email.")
          .required("Email is required."),
        password: Yup.string()
          .required("Password is required.")
          .min(8, "Too short.")
          .max(50, "Too long."),
        confirmPassword: Yup.string()
          .required("Confirmation password is required.")
          .oneOf(
            [Yup.ref("password"), null],
            "not the same passwords."
          ),
    
      });
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center text-primary mb-4">Inscription</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="form-group mb-3">
                                    <label htmlFor="Nom" >
                                        Nom:
                                    </label>
                                    <Field
                                        type="text"
                                        id="Nom"
                                        name="Nom"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="Nom"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="Prenom">
                                        Prénoms:
                                    </label>
                                    <Field
                                        type="text"
                                        id="Prenom"
                                        name="Prenom"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="Prenom"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="email">
                                        Email:
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">
                                        Mot de passe:
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="confirmPassword">
                                        Confirmer le mot de
                                        passe:
                                    </label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="form-group d-flex justify-content-center gap-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        S'inscrire
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="btn btn-danger"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};


export default Register 
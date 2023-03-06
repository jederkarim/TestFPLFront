import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom'


export default function ForgotPassword() {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email.")
            .required("Email is required."),
    });

    const initialValues = {
        email: "",
    };

    const handleSubmit = (values) => {
    
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Forgot password</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ resetForm }) => (
                            <Form>

                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email:</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder='Enter your email address here'
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">
                                        Send reset link
                                    </button>
                                </div>
                                <Link className="btn btn-link" to="/login">
                                    Sign in
                                </Link>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
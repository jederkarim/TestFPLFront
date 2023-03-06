import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from 'axios';


function UpdateUser() {
    const params = useParams()
    const navigate = useNavigate()
    const [user, setUsers] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
    });

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(5, "Too short.")
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
        role: Yup.string().required('Add a role.')
    });

    const handleUpdateUser = async (event) => {
        await axios.put('http://localhost:4000/api/user/' + params.id, user)
        navigate('/admin/listUsers')
    }
    const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value
        setUsers({ ...user, [id]: value })
    }
    useEffect(() => {
        const getUser = async () => {
            const userfromServer = await axios.get('http://localhost:4000/api/user/' + params.id)
            setUsers(userfromServer.data);
        };
        getUser();
    }, [params]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Update User</h1>
                    <Formik
                
                        initialValues={user || { firstName: "", lastName: "", email: "", password: "", role: "" }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleUpdateUser(values)}
                        enableReinitialize
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="form-group mb-3">
                                    <label htmlFor="firstName">first Name:</label>
                                    <Field
                                        type="text"
                                        id="firstName"
                                        value={user.firstName}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter your user Name here"
                                    />
                                    <ErrorMessage
                                        name="firstName"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="lastName">last Name:</label>
                                    <Field

                                        type="text"
                                        id="lastName"
                                        value={user.lastName} onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter your last Name here"

                                    />
                                    <ErrorMessage
                                        name="lastName"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email:</label>
                                    <Field

                                        type="email"
                                        id="email"
                                        name="email"
                                        value={user.email} onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter your email here"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>

                                <div id="my-radio-group" className="d-grid gap-2">Role:</div>
                                <div role="group" className="d-grid gap-2 " >
                                    <label>
                                        <Field
                                            type="radio"
                                            id="role"
                                            name="role"
                                            value={user.role} onChange={handleChange}
                                        />
                                        User
                                    </label>
                                    <label  >
                                        <Field type="radio"
                                            id="role"
                                            name="role"
                                            value={user.role} onChange={handleChange}
                                        />
                                        Admin
                                    </label>
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" value="update" className="btn btn-primary">
                                        <i className='fa fa-save'></i> Update
                                    </button>
                                    <Link className="btn btn-link" to="/admin/listUsers">
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
export default UpdateUser;

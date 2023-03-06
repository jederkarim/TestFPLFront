import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  var Navigate = useNavigate();

  const validationSchema = Yup.object().shape({

    email: Yup.string()
      .email("Invalide email.")
      .required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Too short.")
      .max(50, "Too long."),

  });

  const initialValues = {
    email: "",
    password: ""
  };
  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:4000/api/users', values)
      toast.success("You're logged in successfully.");
      Navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 pt-3">
          <h1 className="text-center">Sign In</h1>
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
                    placeholder="Enter your email address here"

                  />
                  <ErrorMessage
                    name="email"
                    component="small"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password:</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password here"
                  />
                  <ErrorMessage
                    name="password"
                    component="small"
                    className="text-danger"
                  />
                </div>


                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                  <Link to="/register" className="btn btn-success">
                    Create your account
                  </Link>
                </div>
                <Link to="/forgot-password">
                  Forgot your password ?
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login
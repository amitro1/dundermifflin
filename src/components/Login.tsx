import { useFormik } from "formik";
import { FunctionComponent, useState } from "react";
import * as yup from "yup"
import { checkUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbackServices";



interface LoginProps {
    setUserInfo: Function
}
const Login: FunctionComponent<LoginProps> = ({ setUserInfo }) => {

    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
        }),
        onSubmit: (values) => {
            checkUser(values)
                .then((res) => {
                    if (res.data.length) {

                        navigate("/");
                        successMsg(`You're logged in as ${values.email}`);

                        sessionStorage.setItem(
                            "userInfo",
                            JSON.stringify({
                                email: res.data[0].email,
                                userType: res.data[0].userType,
                                id: res.data[0].id,

                            })
                        );
                        setUserInfo(
                            JSON.parse(sessionStorage.getItem("userInfo") as string)
                        );
                    } else errorMsg("Wrong email or password");
                })
                .catch((err) => console.log(err));
        },

    });



    return (<>

        <div className="container col-md-4  " >
            <form onSubmit={formik.handleSubmit}>
                <h3 className="display-3">Login</h3>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />

                    <label
                        htmlFor="floatingInput">Email address</label>
                    {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur} />
                    <label htmlFor="floatingPassword">Password</label>
                    {formik.touched.password && formik.errors.password && (<p className="text-danger">{formik.errors.password}</p>)}
                </div>

                <button className="btn btn-success w-100" disabled={!formik.isValid || !formik.dirty}  >Login</button>
                <button className="btn btn-warning w-100 mt-3" onClick={() => navigate('/registeration')} >site registeration</button>
            </form>
        </div>


    </>);
}

export default Login;
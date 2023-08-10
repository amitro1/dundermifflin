import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser } from "../services/userServices";
import { successMsg } from "../services/feedbackServices";
import { createMyFavCard } from "../services/myFavCardServices";



interface RegistrationProps {
    setUserInfo: Function
}

const Registration: FunctionComponent<RegistrationProps> = ({ setUserInfo }) => {
    let navigate = useNavigate();

    const userValidationSchema = yup.object({
        firstName: yup.string().required().min(2, "First Name should have at least 2 characters"),
        lastName: yup.string().required().min(2, "Last Name should have at least 2 characters"),
        email: yup.string().required().email("Invalid email format"),
        password: yup.string().required().min(8, "Password should have at least 8 characters"),
        phone: yup.string(),
        country: yup.string(),
        city: yup.string(),
        state: yup.string(),
    });

    const businessValidationSchema = yup.object({
        firstName: yup.string().required().min(2, "First Name should have at least 2 characters"),
        lastName: yup.string().required().min(2, "Last Name should have at least 2 characters"),
        email: yup.string().required().email("Invalid email format"),
        password: yup.string().required().min(8, "Password should have at least 8 characters"),
        phone: yup.string().required().min(10, "Phone should have at least 10 characters"),
        country: yup.string().required("Country is required"),
        city: yup.string().required("City is required for business users"),
        state: yup.string().required("State is required for business users"),
    });


    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            state: "",
            country: "",
            city: "",
            userType: "user",

        },

        validationSchema: () => {
            return formik.values.userType === "business"
                ? businessValidationSchema
                : userValidationSchema;
        },

        onSubmit(values) {

            addUser(values)
                .then((res) => {

                    navigate("/");
                    sessionStorage.setItem(
                        "userInfo",
                        JSON.stringify({
                            email: res.data.email,
                            userType: res.data.userType,
                            id: res.data.id,

                        })
                    );
                    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
                    createMyFavCard(res.data.id)
                    successMsg(`${values.email} wes registered and logged in`);
                })
        },
    });
    return (
        <div className="container col-md-4">
            <form onSubmit={formik.handleSubmit}>
                <h3 className="display-3">Registration</h3>


                {formik.values.userType === "user" ? (
                    <>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="firstName">First Name</label>
                            {formik.touched.firstName && formik.errors.firstName && (
                                <small className="text-danger">{formik.errors.firstName}</small>
                            )}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="lastName">Last Name</label>
                            {formik.touched.lastName && formik.errors.lastName && (
                                <small className="text-danger">{formik.errors.lastName}</small>
                            )}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="email">email</label>
                            {formik.touched.email && formik.errors.email && (
                                <small className="text-danger">{formik.errors.email}</small>
                            )}
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor="password">password</label>
                            {formik.touched.password && formik.errors.password && (
                                <small className="text-danger">{formik.errors.password}</small>
                            )}
                        </div>
                    </>
                ) : (<>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="firstName">First Name</label>
                        {formik.touched.firstName && formik.errors.firstName && (
                            <small className="text-danger">{formik.errors.firstName}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="lastName">Last Name</label>
                        {formik.touched.lastName && formik.errors.lastName && (
                            <small className="text-danger">{formik.errors.lastName}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="email">email</label>
                        {formik.touched.email && formik.errors.email && (
                            <small className="text-danger">{formik.errors.email}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="password">password</label>
                        {formik.touched.password && formik.errors.password && (
                            <small className="text-danger">{formik.errors.password}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="phone">phone</label>
                        {formik.touched.phone && formik.errors.phone && (
                            <small className="text-danger">{formik.errors.phone}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="state">state</label>
                        {formik.touched.state && formik.errors.state && (
                            <small className="text-danger">{formik.errors.state}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="country"
                            name="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="country">country</label>
                        {formik.touched.country && formik.errors.country && (
                            <small className="text-danger">{formik.errors.country}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="city">city</label>
                        {formik.touched.city && formik.errors.city && (
                            <small className="text-danger">{formik.errors.city}</small>
                        )}
                    </div>
                </>)}

                <button
                    type="submit"
                    className="btn btn-secondary my-3 w-100"
                // disabled={!formik.isValid || !formik.dirty}
                >
                    Register
                </button>

                <div className="form-check ms-3 text-start fw-bold">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="userTypeCheckbox"
                        name="userType"
                        checked={formik.values.userType === "business"}
                        onChange={(e) =>
                            formik.setFieldValue(
                                "userType",
                                e.target.checked ? "business" : "user"
                            )
                        }
                        onBlur={formik.handleBlur}
                    />
                    <label className="form-check-label" htmlFor="userTypeCheckbox">
                        Sign Up as Business
                    </label>
                </div>


            </form>
            <Link to="/">Already have user? Login here</Link>
        </div>

    );
};

export default Registration;



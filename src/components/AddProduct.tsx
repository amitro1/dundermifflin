import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import product from "../interface/product";
import { useFormik } from "formik";
import { successMsg } from "../services/feedbackServices";
import * as yup from "yup"
import { addProduct } from "../services/productServices";
import user from "../interface/user";
interface AddProductProps {
    userinfo: user
}

const AddProduct: FunctionComponent<AddProductProps> = ({ userinfo }) => {
    let navigate = useNavigate();

    let formik = useFormik({
        initialValues: {
            userEmail: userinfo.email, title: "", description: "", longDescription: "", image: "", alt: "", price: 0
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().required().min(2),
            description: yup.string().required().min(2),
            longDescription: yup.string().required().min(50),
            image: yup.string().required().min(2),
            alt: yup.string().required().min(2),
            price: yup.number().required().min(0),
        }),
        onSubmit: (values) => {
            addProduct(values)
                .then((res) => {
                    navigate("/mycard");
                    successMsg("Product add successfully!");
                })
                .catch((err) => console.log(err));
        },
    });

    return (
        <>
            <div className="container col-md-3">
                <form onSubmit={formik.handleSubmit}>
                    <h3 className="display-3">Add Product</h3>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Title"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="title">Title</label>
                        {formik.touched.title && formik.errors.title && (
                            <small className="text-danger">{formik.errors.title}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            placeholder="Price"
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="price">Price</label>
                        {formik.touched.price && formik.errors.price && (
                            <small className="text-danger">{formik.errors.price}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="description">description</label>
                        {formik.touched.description && formik.errors.description && (
                            <small className="text-danger">{formik.errors.description}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="longDescription"
                            placeholder="longDescription"
                            name="longDescription"
                            value={formik.values.longDescription}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="description">longDescription</label>
                        {formik.touched.longDescription && formik.errors.longDescription && (
                            <small className="text-danger">{formik.errors.longDescription}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            placeholder="Image URL"
                            name="image"
                            value={formik.values.image}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="image">Image URL</label>
                        {formik.touched.image && formik.errors.image && (
                            <small className="text-danger">{formik.errors.image}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="alt"
                            placeholder="alt"
                            name="alt"
                            value={formik.values.alt}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="alt">alt</label>
                        {formik.touched.alt && formik.errors.alt && (
                            <small className="text-danger">{formik.errors.alt}</small>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-secondary my-3 w-100"
                        disabled={!formik.isValid || !formik.dirty}
                    >
                        add Product
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddProduct;
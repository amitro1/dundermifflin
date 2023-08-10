import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import product from "../interface/product";
import * as yup from "yup";
import { getProductById, updateProduct } from "../services/productServices";
import { successMsg } from "../services/feedbackServices"

interface UpdateProductProps { }

const UpdateProduct: FunctionComponent<UpdateProductProps> = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    useEffect(() => {

        getProductById(Number(id))
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    }, []);

    let [product, setProduct] = useState<product>({
        price: 0,
        title: "",
        description: "",
        image: "",
        alt: "",
    });



    let formik = useFormik({
        initialValues: {
            price: product.price,
            title: product.title,
            description: product.description,
            longDescription: product.longDescription,
            image: product.image,
            alt: product.alt

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

            updateProduct(values, Number(id))
                .then((res) => {
                    navigate("/");
                    successMsg("Product updated successfully!");
                })
                .catch((err) => console.log(err));
        },
    });

    return (
        <>
            <div className="container col-md-3">
                <form onSubmit={formik.handleSubmit}>
                    <h3 className="display-3">UPDATE PRODUCT</h3>
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
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateProduct;

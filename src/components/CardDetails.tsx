import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productServices";
import product from "../interface/product";

interface CardDetailsProps { }

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
    let { id } = useParams<{ id: string }>();
    let [product, setProduct] = useState<product>();

    useEffect(() => {
        let fetchProduct = () => {
            getProductById(Number(id))
                .then((res) => {
                    setProduct(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchProduct();
    }, [id]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={`/${product?.image}`} alt={product?.alt} style={{ width: "100%" }} />
                </div>
                <div className="col-md-6">
                    <h3>{product?.title}</h3>
                    <p>{product?.longDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;

import { FunctionComponent, useEffect, useState } from "react";
import user from "../interface/user";
import product from "../interface/product";
import { Link } from "react-router-dom";
import { deleteProduct, getProudct } from "../services/productServices";
import { successMsg } from "../services/feedbackServices";

interface MyCardProps {
    userinfo: user;
}

const MyCard: FunctionComponent<MyCardProps> = ({ userinfo }) => {
    let [cards, setCards] = useState<product[]>([]);

    useEffect(() => {
        getProudct()
            .then((res) => {
                setCards(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    let handleDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            deleteProduct(id)
                .then((res) => {
                    successMsg("Product deleted successfully!");
                    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            <h3 className="display-3">MY Card</h3>
            <div className="row">
                {cards.length ? (
                    cards.filter((cards) => cards.userEmail === userinfo.email)
                        .map((product: product) => (

                            <div className="col-md-3" key={product.id}>
                                <div className="card" style={{ width: "18rem" }}>
                                    <Link to={`/card-details/${product.id}`}>
                                        <img
                                            src={product.image}
                                            className="card-img-top"
                                            alt={product.alt}
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">{product.description}</p>

                                        <>
                                            <Link
                                                to={`/products/update/${product.id}`}
                                                className="btn btn-warning mx-1"
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(Number(product.id))}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <p>There are no cards</p>
                )}

            </div>
            <div className="container">
                <Link className=" btn btn-primary" to={"/addProduct"}>
                    add card
                </Link>
            </div>

        </>
    );
};

export default MyCard;

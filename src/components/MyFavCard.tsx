import { FunctionComponent, useEffect, useState } from "react";
import product from "../interface/product";
import { Link } from "react-router-dom";
import user from "../interface/user";
import { successMsg } from "../services/feedbackServices";
import { getMyFavCard, removeFromMyFavCard } from "../services/myFavCardServices";

interface MyFavCardProps {
    userInfo: user
}

const MyFavCard: FunctionComponent<MyFavCardProps> = ({ userInfo }) => {
    let [products, setProducts] = useState<product[]>([]);





    useEffect(() => {
        getMyFavCard(userInfo.id as number)
            .then((res) => {
                console.log("User Data:", res.data[0].products);

                let myFavCard = res.data[0].products;
                console.log("My Fav Card:", myFavCard);

                setProducts(myFavCard);
            })
            .catch((error) => {
                console.log("Error fetching user's favorite products:", error);
            });
    }, []);

    let handleLike = (product: product) => {
        const productIndex = products.findIndex(p => p.id === product.id);

        if (productIndex !== -1) {
            removeFromMyFavCard(userInfo.id as number, product.id as number)
                .then((res) => {
                    const updatedProducts = [...products];
                    updatedProducts.splice(productIndex, 1);
                    setProducts(updatedProducts);
                    successMsg("card removed");
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <>
            <h3 className="display-3">Favorite</h3>
            {products.length ? (
                <div className="row">
                    {products.map((product: product) => (
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

                                </div>

                                <Link to='' className="btn col" onClick={() => { handleLike(product); }}>
                                    <i className="fa-solid fa-heart"></i>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favorite item</p>
            )}
        </>
    );
};

export default MyFavCard;

import { FunctionComponent, useEffect, useState } from "react";
import product from "../interface/product";
import { deleteProduct, getProductById, getProudct } from "../services/productServices";
import { Link } from "react-router-dom";
import { successMsg } from "../services/feedbackServices";
import user from "../interface/user";
import { addToMyFavCard, getMyFavCard, removeFromMyFavCard } from "../services/myFavCardServices";


interface HomeProps {
    userInfo: user
}

const Home: FunctionComponent<HomeProps> = ({ userInfo }) => {

    let [cards, setCards] = useState<product[]>([]);
    let [myFavCards, setMyFavCards] = useState<Number[]>([])
    let [cardsChanged, setcardsChanged] = useState<boolean>(false);
    useEffect(() => {
        getMyFavCard(userInfo.id as number)
            .then((res) => {

                let userFav = res.data.find((fav: any) => fav.id === userInfo.id)
                let productIds: number[] = userFav?.products.map((product: any) => product.id) || []

                setMyFavCards(productIds);
            })
            .catch((err) => console.log(err));


        getProudct()
            .then((res) => {
                setCards(res.data);
            })
            .catch((error) => console.log(error));
    }, [cardsChanged]);

    let render = () => {
        setcardsChanged(!cardsChanged);
    };

    let handleDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            deleteProduct(id)
                .then((res) => {
                    successMsg("Product deleted successfully!");
                    render()
                })
                .catch((err) => console.log(err));
        }
    };

    let handleLike = (product: product) => {
        if (myFavCards.includes(product.id as number)) {
            removeFromMyFavCard(userInfo.id as number, product.id as number)
                .then((res) => {
                    setMyFavCards(myFavCards.filter((id) => id !== product.id))
                    successMsg("card remove form your favorite card")
                }).catch((error) => console.log(error))

        } else {
            addToMyFavCard(userInfo.id as number, product)
                .then((res) => {
                    setMyFavCards([...myFavCards, product.id as number])
                    successMsg("card added to your favorite card")
                }).catch((error) => console.log(error)
                )
        }
    };


    return (
        <>
            <h2> Welcom To Dunder Mifflin </h2>
            <div className="row">
                {cards.length ? (
                    cards.map((product: product) => (
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
                                    {userInfo.userType === "admin" && (
                                        <> <Link
                                            to={`/products/update/${product.id}`}
                                            className="btn btn-warning mx-1"
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                            <Link to="" className="btn btn-danger"
                                                onClick={() => handleDelete(product.id as number)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </Link>

                                        </>
                                    )
                                    }

                                    {
                                        ["admin", "business", "user"].includes(userInfo.userType as string) ? (
                                            myFavCards.includes(product.id as number) ? (
                                                <Link to='' className="btn col" onClick={() => { handleLike(product); }}>
                                                    <i className="fa-solid fa-heart"></i>
                                                </Link>
                                            ) : (
                                                <Link to='' className="btn col" onClick={() => { handleLike(product); }}>
                                                    <i className="fa-regular fa-heart"></i>
                                                </Link>
                                            )
                                        ) : null
                                    }

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>There are no cards</p>
                )}
            </div ></>

    );

};

export default Home;

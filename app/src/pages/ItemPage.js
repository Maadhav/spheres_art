import React, { useEffect, useRef, useState } from "react";
import "./ItemPage.css";
import SolidButton from "../components/button/SolidButton";
import CheckOut from "../components/dialog/CheckOut";
import Payment from "../components/dialog/Payment";
import Blockies from "react-blockies";
import { APP } from "../adapters/three.js/index";
import { useLocation, useParams } from "react-router-dom";
import { confirmOperation, getActiveAccount, updatePrice } from "../adapters/tezos";
import { EditSquare, TickSquare } from "react-iconly";
import { DatabaseService } from "../adapters/firebase";
import { limit, orderBy, query, where } from "firebase/firestore";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import SphereCanvas from "../components/loader/SphereCanvas";
const ItemPage = (props) => {
    const location = useLocation();
    const [checkout, setCheckout] = useState(false);
    const [loading2, setLoading2] = useState(false)
    const [payment, setPayment] = useState(false);
    const [state, setstate] = useState(props.location.state);
    const [loading, setLoading] = useState(true);
    const [threejsLoading, setthreejsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [editing, setEditing] = useState(false);
    const [wallet, setWallet] = useState();
    const [errors, setErrors] = useState({});
    const [price, setPrice] = useState(
        ((props?.location?.state?.price ?? 0) / 1000000).toFixed(2)
    );

    const { id } = useParams();
    const ref = useRef();

    async function init() {
        var nft;
        if (!state) {
            var data = await DatabaseService.get({
                col: "spheres",
                query: (ref) => {
                    return query(
                        ref,
                        orderBy("timestamp", "desc"),
                        where("token_id", "==", parseInt(id)),
                        limit(1)
                    );
                },
            });
            nft = data[0];
            setstate(nft);
            setPrice((nft.price / 1000000).toFixed(2));
        } else {
            nft = state;
        }
        console.log(nft);

        axios
            .get(nft.app, {
                onDownloadProgress: (progressEvent) => {
                    console.log(progressEvent);
                    console.log(progressEvent.loaded / progressEvent.total);
                    setProgress(progressEvent.loaded / progressEvent.total);
                },
            })
            .then((response) => {
                var player = new APP.Player();
                player.load({
                    json: response.data, onLoad: () => {
                        setthreejsLoading(false);
                        ref.current.appendChild(player.dom);
                    }
                });
                player.setSize(542, 542);
                player.play();
                window.addEventListener("resize", function () {
                    player.setSize(542, 542);
                });
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const activeWallet = async () => {
        let activeAccount = await getActiveAccount();
        setWallet(activeAccount);
    };

    const onPriceEdit = async () => {
        setLoading2(true)
        const operation = await toast.promise(
            updatePrice({
                token_id: state.token_id,
                price: parseInt(parseFloat(price) * 1000000),
            }),
            {
                pending: "Updating NFT to Blockchain",
                success: "NFT Updated",
                error: "NFT Update rejected 🤯",
            }
        )
        await toast.promise(confirmOperation(operation), {
            pending: "Waiting for confirmation",
            success: "Operation Successfull",
            error: "Operation rejected 🤯",
        });
        await toast.promise(
            DatabaseService.update({
                col: "spheres",
                id: state.id,
                data: {
                    price: parseInt(parseFloat(price) * 1000000),
                },
            }),
            {
                pending: "Updating Data to Central Server",
                success: "Updated Complete",
                error: "Update rejected 🤯",
            }
        );
        setstate((val) => {
            return { ...val, price: parseFloat(price) * 1000000 };
        });
        setLoading2(false)
        setEditing(false);
    };

    useEffect(() => {
        init();
        activeWallet();
    }, []);
    return (
        <div className="section-separator">
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                newestOnTop={false}
                closeOnClick={false}
                closeButton={false}
                rtl={false}
                theme="dark"
                pauseOnFocusLoss={true}
                draggable={false}
            />
            <div className="image-section" ref={ref}>
                {(loading || threejsLoading) && (
                    <>
                        <img
                            className="image-loading-display padding"
                            src={state.image}
                            alt={"Sphere Model"}
                        />
                        <div className="overlay">
                            <div className="overlay-content">
                                <div className="overlay-content-text">{loading ? 'Fetching 3D Model' : threejsLoading ? 'Rendering 3D Model' : ''}</div>
                                <progress value={progress} max={1} style={{ appearance: 'none' }}></progress>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="details-section">
                <div style={{ margin: "45px 43px" }}>
                    <h1>{state.title}</h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "0 10px" }}>
                        {editing ? (
                            <input
                                className="price-field-input"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        ) : (
                            <div className="price-text">{price} XTZ</div>
                        )}
                        {state.creator === wallet?.address &&
                            state.creator === state.owner &&
                            (editing ? (
                                <TickSquare
                                    set="bold"
                                    primaryColor="white"
                                    size={20}
                                    onClick={onPriceEdit}
                                />
                            ) : (
                                <EditSquare
                                    set="bold"
                                    size={20}
                                    primaryColor="white"
                                    onClick={() => {
                                        setEditing(true);
                                    }}
                                />
                            ))}
                    </div>
                    <div className="creator">Creator</div>
                    <div className="creator-details">
                        <Blockies seed={state.creator} className="creator-image" alt="" />
                        <div className="creator-name"> {state?.creator}</div>
                    </div>
                    {!state.isNew && (
                        <>
                            <div className="creator">Owner</div>
                            <div className="creator-details">
                                <Blockies seed={state.owner} className="creator-image" alt="" />
                                <div className="creator-name"> {state?.owner}</div>
                            </div>
                        </>
                    )}
                    <div className="details">Details</div>
                    <span>
                        <div className="highlighted-line"></div>
                        <div className="break-line"></div>
                    </span>
                    <div className="description">{state.description}</div>
                    {!state.isNew && (
                        <SolidButton
                            title={"Download"}
                            onClick={() => {
                                var element = document.createElement("a");
                                var ipfs = {
                                    cid: state.properties.zip.split("ipfs://")[1].split("/")[0],
                                    name: state.properties.zip.split("ipfs://")[1].split("/")[1],
                                };
                                element.href = `https://ipfs.io/ipfs/${ipfs.cid}/${ipfs.name}`;
                                if (wallet?.address === state.owner) element.click();
                                else alert("Only owner can download the file.");
                            }}
                        />
                    )}
                    {state.isNew && (
                        <SolidButton
                            title={"Buy for " + (state.price / 1000000).toFixed(2) + " XTZ"}
                            onClick={() => {
                                setCheckout(true);
                            }}
                        />
                    )}
                </div>
            </div>
            {checkout && (
                <CheckOut
                    sphere={state}
                    onQuit={() => {
                        setCheckout(false);
                    }}
                    onCheckOut={() => {
                        setPayment(true);
                        setCheckout(false);
                    }}
                />
            )}
            {loading2 && (
                <div className="loading-section">
                    <SphereCanvas />
                </div>
            )}
            {payment && (
                <Payment
                    sphere={state}
                    onQuit={() => {
                        setPayment(false);
                    }}
                />
            )}
        </div>
    );
};

export default ItemPage;

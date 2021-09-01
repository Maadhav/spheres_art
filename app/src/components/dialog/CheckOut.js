import React, { useState } from 'react'
import './dialog.css'
import './CheckOut.css'
import SolidButton from '../button/SolidButton'
import LinedButton from '../button/LinedButton'
import { confirmOperation, createSale } from '../../adapters/tezos'
import { toast, ToastContainer } from 'react-toastify'
import SphereCanvas from '../loader/SphereCanvas'
const CheckOut = ({ onQuit, onCheckOut, sphere }) => {
    const [ipfsCid, ipfsName] = sphere.image.split('ipfs://')[1].split('/')
    const [loading, setLoading] = useState(false)
    async function onBuy() {
        console.log('Buying')
        setLoading(true)
        const operation = await toast.promise(
            createSale({
                token_id: sphere.token_id,
                price: sphere.price
            }),
            {
                pending: "Buying NFT",
                success: "NFT Buyed",
                error: "Approval rejected 🤯",
            }
        );
        await toast.promise(confirmOperation(operation), {
            pending: "Waiting for confirmation",
            success: "Operation Successfull",
            error: "Operation rejected 🤯",
        });
        setLoading(false)
        onCheckOut();
    }
    return (
        <>
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
            <div className="popup-box">
                <div className="box">
                    <div className="title-section">
                        <h2>Check Out</h2>
                    </div>
                    <div className="body-section">
                        <div className="header">
                            <div style={{ flex: 1 }} className="header-text">Item</div>
                            <div className="header-text">Subtotal</div>
                        </div>
                        <div className="item-section">
                            <div className="item-details">
                                <img src={`https://ipfs.io/ipfs/${ipfsCid}/${ipfsName}`} className="item-image" alt='' />
                                <div>
                                    <div className="item-creator">{sphere.creator}</div>
                                    <div className="item-title">{sphere.name}</div>
                                </div>
                            </div>
                            <span className="price">{(sphere.price.c / 1000000).toFixed(2)} <span style={{ fontWeight: "600" }}>XTZ</span></span>
                        </div>
                        <div className="checkout-section">
                            <div className="header-text" style={{ flex: 1 }}>Total</div>
                            <span className="price">{(sphere.price.c / 1000000).toFixed(2)} <span style={{ fontWeight: "600" }}>XTZ</span></span>
                        </div>
                    </div>
                    <div className="action-section">
                        <SolidButton title="Checkout" onClick={onBuy} />
                        <LinedButton title="Cancel" onClick={onQuit} />
                    </div>
                </div>
            </div>
            {loading && (
                <div className="loading-section">
                    <SphereCanvas />
                </div>
            )}
        </>
    )
}

export default CheckOut

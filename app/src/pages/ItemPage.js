import React, { useEffect, useRef, useState } from 'react'
import './ItemPage.css'
import SolidButton from '../components/button/SolidButton'
import CheckOut from '../components/dialog/CheckOut'
import Payment from '../components/dialog/Payment'
import Blockies from 'react-blockies'
import { APP } from '../adapters/three.js/index'
import { useLocation, useParams } from 'react-router-dom'
import Loader from '../components/loader/Loader'
import { getActiveAccount, getContractStorage, updatePrice } from '../adapters/tezos'
import getIPFSData from '../adapters/ipfs'
import {  EditSquare, TickSquare } from 'react-iconly'
const ItemPage = (props) => {
    const location = useLocation()
    const [checkout, setCheckout] = useState(false)
    const [payment, setPayment] = useState(false)
    const [state, setstate] = useState(props.location.state)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [wallet, setWallet] = useState()
    const [price, setPrice] = useState('')


    const { id } = useParams()
    const ref = useRef();
    async function init() {
        var nft;
        var sphere;
        var ipfs = {}
        var data = (await getContractStorage()).spheres.valueMap
        var parseData = Array.from(data)
            .map((k, v) => k[1]);
        console.log(parseData)
        nft = parseData.find((e) =>
            e.token_id.c[0] === parseInt(id)
        )
        let ex = await getIPFSData(nft.tokenUrl.split("ipfs://")[1]);
        let ipfsData = JSON.parse(ex);
        
        sphere = { ...nft, ...ipfsData }
        console.log(sphere)
        setstate(sphere)
        setPrice((sphere.price.c / 1000000).toFixed(2))
        ipfs = sphere.properties.file
        let json = await getIPFSData(ipfs.split("ipfs://")[1])
        var player = new APP.Player();
        player.load(JSON.parse(json));
        player.setSize(542, 542);
        player.play();

        setLoading(false)
        ref.current.appendChild(player.dom);

        window.addEventListener('resize', function () {

            player.setSize(542, 542);

        });
        // })
    }

    const activeWallet = async () => {
        let activeAccount = await getActiveAccount();
        setWallet(activeAccount);
    };

    const onPriceEdit = async () => {
        await updatePrice({
            token_id: state.token_id.c[0],
            price: parseInt(parseFloat(price) * 1000000)
        })
        setstate(val => { return { ...val, price: { c: [(parseFloat(price) * 1000000)] } } })
        setEditing(false)
    }

    useEffect(() => {
        init()
        activeWallet()
    }, [])
    if (loading)
        return <Loader />
    return (
        <div className="section-separator">
            <div className="image-section" ref={ref}>
                {loading && <Loader />}
            </div>
            <div className="details-section">
                <div style={{ margin: "45px 43px" }}>
                    <h1>{state.name}</h1>
                    <div style={{ display: 'flex', alignItems: "center", gap: "0 10px" }}>
                        {editing ? <input className="price-field-input" onChange={(e) => setPrice(e.target.value)} value={price} /> : <div className="price-text">{(state.price.c / 1000000).toFixed(2)} XTZ</div>}
                        {(state.creator === wallet?.address && state.creator === state.owner) && (editing ? <TickSquare set="bold" primaryColor="white" size={20} onClick={onPriceEdit} /> : <EditSquare set="bold" size={20} primaryColor="white" onClick={() => { setEditing(true) }} />)}
                    </div>
                    <div className="creator">Creator</div>
                    <div className="creator-details">
                        <Blockies
                            seed={state.creator} className="creator-image" alt="" />
                        <div className="creator-name"> {state?.creator}</div>
                    </div>
                    {!state.isNew && <><div className="creator">Owner</div>
                        <div className="creator-details">
                            <Blockies
                                seed={state.owner} className="creator-image" alt="" />
                            <div className="creator-name"> {state?.owner}</div>
                        </div></>}
                    <div className="details">Details</div>
                    <span><div className="highlighted-line"></div><div className="break-line"></div></span>
                    <div className="description">
                        {state.description}
                    </div>
                    {!state.isNew && <SolidButton title={'Download'} onClick={() => {
                        var element = document.createElement('a')
                        var ipfs = {
                            cid: state.properties.zip.split('ipfs://')[1].split('/')[0],
                            name: state.properties.zip.split('ipfs://')[1].split('/')[1]
                        }
                        element.href = `https://ipfs.io/ipfs/${ipfs.cid}/${ipfs.name}`
                        if (wallet?.address === state.owner)
                            element.click()
                        else
                            alert('Only owner can download the file.')

                    }} />}
                    {(state.isNew) && <SolidButton title={"Buy for " + (state.price.c / 1000000).toFixed(2) + " XTZ"} onClick={() => { setCheckout(true) }} />}
                </div>
            </div>
            {checkout && <CheckOut sphere={state} onQuit={() => { setCheckout(false) }} onCheckOut={() => { setPayment(true); setCheckout(false) }} />}
            {payment && <Payment sphere={state} onQuit={() => { setPayment(false) }} />}
        </div>
    )
}

export default ItemPage

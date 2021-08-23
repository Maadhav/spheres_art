import React, { useState } from 'react'
import DragDrop from '../components/dragdrop/DragDrop'
import SolidButton from '../components/button/SolidButton'
import './CreateItem.css'
import {createItem} from '../adapters/tezos'

const CreateItem = () => {

    const [title,setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    return (
        <div className="create-item-container">
            <div className="container-width">
            <h1>Create New Item</h1>
            <DragDrop onFileDrop={(file) => {console.log(file)}}/>
            <div className="field-section">
                <h2>Name</h2>
                <input placeholder="Item Name" className="field-input" onChange={e => setTitle(e.currentTarget.value)}  value={title}/>
            </div>
            <div className="field-section">
                <h2>Description</h2>
                <textarea placeholder="Description of the Item" className="field-textarea" onChange={e => setDescription(e.currentTarget.value)} value={description}></textarea>
            </div>
            <div className="field-section">
                <h2>Price</h2>
                <div className="price-field">
                    <input placeholder="Enter Price" className="price-input" onChange={e => setPrice(e.currentTarget.value)} value={price}/>
                    <select className="crypto-drop-down">
                        <option value="XTZ">XTZ</option>
                    </select>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"flex-end",marginTop: "50px"}}>
                <SolidButton title="Create Item" onClick={()=> createItem({
                    price: 1000,
                    url: "https://www.third.com",
                    timestamp: 1629615899,
                })}/>
            </div>
            </div>
        </div>
    )
}

export default CreateItem

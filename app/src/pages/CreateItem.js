import React from 'react'
import DragDrop from '../components/dragdrop/DragDrop'
import SolidButton from '../components/button/SolidButton'
import './CreateItem.css'
const CreateItem = () => {
    return (
        <div className="create-item-container">
            <div className="container-width">
            <h1>Create New Item</h1>
            <DragDrop onFileDrop={(file) => {console.log(file)}}/>
            <div className="field-section">
                <h2>Name</h2>
                <input placeholder="Item Name" className="field-input"/>
            </div>
            <div className="field-section">
                <h2>Description</h2>
                <textarea placeholder="Description of the Item" className="field-textarea" ></textarea>
            </div>
            <div className="field-section">
                <h2>Price</h2>
                <div className="price-field">
                    <input placeholder="Enter Price" className="price-input"/>
                    <select className="crypto-drop-down">
                        <option value="XTZ">XTZ</option>
                    </select>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"flex-end",marginTop: "50px"}}>
                <SolidButton title="Create Item"/>
            </div>
            </div>
        </div>
    )
}

export default CreateItem

import React, { useEffect, useState } from 'react'
import DragDrop from '../components/dragdrop/DragDrop'
import SolidButton from '../components/button/SolidButton'
import './CreateItem.css'
import { createItem } from '../adapters/tezos'
import { BlobReader, ZipReader, BlobWriter } from "@zip.js/zip.js/dist/zip-fs-full";


const CreateItem = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)

    useEffect(() => {
        console.log(file)
    }, [file])

    async function onCreate() {
        var blob = await new Blob([new Uint8Array(await file.arrayBuffer())], { type: "application/zip" });
        const reader = new ZipReader(new BlobReader(blob))
        const entries = await reader.getEntries();
        let imageFile, jsonFile, videoFile;
        for (let index = 0; index < entries.length; index++) {
            const entry = entries[index];
            const blob = await entry.getData(
                new BlobWriter(),
            );
            blob.name = entry.filename
            if (entry.filename === 'app.json')
                jsonFile = blob
            else if (entry.filename === 'thumbnail.png')
                imageFile = blob
            else videoFile = blob
        }
        if (!jsonFile) {
            alert("Zip doesn't contain App.json")
        }
        else if (!imageFile) {
            alert("Zip doesn't contain Thumbnail")

        }
        else if (!videoFile) {
            alert("Zip doesn't contain Preview Video")
        }
        else if (JSON.parse(await jsonFile.text()).metadata.source !== 'sphere.ART Editor') {
            alert("Export from Sphere.ART Editor")
        }
        else {
            console.log(imageFile)
            createItem({
                price: price * 1000000,
                description: description,
                title: title,
                jsonFile: jsonFile,
                imageFile: imageFile,
                videoFile: videoFile
            })
        }
    }
    return (
        <div className="create-item-container">
            <div className="container-width">
                <div style={{display: "flex", alignItems:"center"}}>
                    <h1 style={{flex: 1}}>Create New Item</h1>
                    <SolidButton title="Online Editor" onClick={() => { window.open('https://sphereart-editor.netlify.app/editor/','_blank','',true).focus() }}/>
                </div>
                <DragDrop onFileDrop={(file) => { setFile(file) }} />
                <div className="field-section">
                    <h2>Name</h2>
                    <input placeholder="Item Name" className="field-input" onChange={e => setTitle(e.currentTarget.value)} value={title} />
                </div>
                <div className="field-section">
                    <h2>Description</h2>
                    <textarea placeholder="Description of the Item" className="field-textarea" onChange={e => setDescription(e.currentTarget.value)} value={description}></textarea>
                </div>
                <div className="field-section">
                    <h2>Price</h2>
                    <div className="price-field">
                        <input placeholder="Enter Price" className="price-input" onChange={e => setPrice(e.currentTarget.value)} value={price} />
                        <select className="crypto-drop-down">
                            <option value="XTZ">XTZ</option>
                        </select>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "50px" }}>
                    <SolidButton title="Create Item" onClick={onCreate} />
                </div>
            </div>
        </div>
    )
}

export default CreateItem

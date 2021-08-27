import React from 'react'
import { Image } from 'react-iconly'
import './DragDrop.css'
import FilePicker from './FilePicker'
const DragDrop = ({onFileDrop}) => {

    const dragOver = (e) => {
        e.preventDefault();
    };

    const dragEnter = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        onFileDrop(e.dataTransfer.files[0]);
    };
    return (
        <FilePicker onChange={(file) => {onFileDrop(file)}} accept={''}  >
        <div style={{marginTop: "40px"}} onDragOver={dragOver} onDragEnter={dragEnter} onDrop={onDrop}>
            <h2>Upload</h2>
            <div className="drag-drop-container">
                <h3>.GLTF, .GLB Max 100mb.</h3>
                <Image set="bold" primaryColor="white" size={137}/>
                <div>
                    <div className="drag-drop-text" style={{fontWeight: "600"}}>Drag and Drop File</div>
                    <span className="drag-drop-text">or <span style={{fontWeight: "600"}}>browse media on your device</span></span>
                </div>
            </div>
        </div>
        </FilePicker>
    )
}

export default DragDrop

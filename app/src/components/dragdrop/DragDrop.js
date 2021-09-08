import React from 'react'
import { Delete, Image } from 'react-iconly'
import './DragDrop.css'
import FilePicker from './FilePicker'
const DragDrop = ({ onFileDrop, file }) => {

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
        <FilePicker onChange={(file) => { onFileDrop(file) }} accept={'.sphere'}  >
            <div style={{ marginTop: "40px" }} onDragOver={dragOver} onDragEnter={dragEnter} onDrop={onDrop}>
                <h2>Upload</h2>
                {file ? <div className="drag-drop-container selected">
                    <div style={{display: "flex",width: "calc(100% - 40px)",padding: "0 20px", gap: "0 20px",alignItems:"center"}}>
                        <img src="https://raw.githubusercontent.com/Maadhav/sphere-art-three.js/master/editor/images/icon.png" height={50}/>
                        <div style={{flex: 1}}>
                        <h2> {file.name}</h2>
                        <div className="drag-drop-text" style={{textAlign: "left"}}> {(file.size / 1e+6).toFixed(2)} MB</div>
                        </div>
                        <Delete size={30} color="#fff" onClick={() => {onFileDrop(null)}} style={{zIndex: 2}}/>
                    </div>
                </div> : <div className="drag-drop-container">
                    <h3>Accepted File Type: <span style={{ color: "var(--red-violet)" }}>.sphere</span></h3>
                    <Image set="bold" primaryColor="white" size={137} />
                    <div>
                        <div className="drag-drop-text" style={{ fontWeight: "600" }}>Drag and Drop File</div>
                        <span className="drag-drop-text">or <span style={{ fontWeight: "600" }}>browse media on your device</span></span>
                    </div>
                </div>}
            </div>
        </FilePicker>
    )
}

export default DragDrop

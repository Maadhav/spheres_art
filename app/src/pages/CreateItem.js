import React, { useEffect, useState } from "react";
import DragDrop from "../components/dragdrop/DragDrop";
import SolidButton from "../components/button/SolidButton";
import "./CreateItem.css";
import { createItem, uploadToIPFS, confirmOperation, getContractStorage } from "../adapters/tezos";
import JSZip from 'jszip'
import SphereCanvas from "../components/loader/SphereCanvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StorageService, DatabaseService } from '../adapters/firebase/index'

const CreateItem = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log(file);
  }, [file]);

  async function onCreate() {
    setLoading(true);
    let imageFile, jsonFile, videoFile;
    var entries = []
    await JSZip.loadAsync(file).then((zip) => {
      zip.forEach((e, entry) => {
        entries.push(entry)
      })
    })
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index];
      var blob = await entry.async('blob')
      blob.name = entry.name
      if (entry.name === "app.json") jsonFile = blob;
      else if (entry.name === "thumbnail.png") imageFile = blob;
      else videoFile = blob;
    }
    if (!jsonFile) {
      alert("Zip doesn't contain App.json");
    } else if (!imageFile) {
      alert("Zip doesn't contain Thumbnail");
    } else if (!videoFile) {
      alert("Zip doesn't contain Preview Video");
    } else if (
      JSON.parse(await jsonFile.text()).metadata.source !== "sphere.ART Editor"
    ) {
      alert("Export from Sphere.ART Editor");
    } else {
      const url = await toast.promise(
        uploadToIPFS({
          description: description,
          title: title,
          jsonFile: jsonFile,
          imageFile: imageFile,
          videoFile: videoFile,
          zipFile: file,
        }),
        {
          pending: "Uploading Files to IPFS",
          success: "Upload Complete",
          error: "Upload rejected 🤯",
        }
      );
      const operation = await toast.promise(
        createItem({
          price: price * 1000000,
          url: url,
          title: title
        }),
        {
          pending: "Minting NFT to Blockchain",
          success: "NFT Created",
          error: "Minting rejected 🤯",
        }
      );
      await toast.promise(confirmOperation(operation), {
        pending: "Waiting for confirmation",
        success: "Operation Successfull",
        error: "Operation rejected 🤯",
      });
      var data = (await getContractStorage()).spheres.valueMap;
      console.log(data)
      var sphere = Array.from(data)
      .map((k, v) => k[1]).find(e => e.tokenUrl === url)
      console.log(sphere);
      var downloadUrls = await toast.promise(StorageService.upload(`spheres/${sphere.token_id}`, [imageFile, videoFile, jsonFile]), {
        pending: "Uploading Files to Central Storage",
        success: "Upload Complete",
        error: "Upload rejected 🤯",
      })
      console.log(downloadUrls);
      var sphereData = await toast.promise(DatabaseService.set('spheres', {
        ...sphere,
        description: description,
        price: sphere.price.c[0],
        token_id: sphere.token_id.c[0],
        timestamp: sphere.timestamp.c[0],
        image: downloadUrls[0],
        preview: downloadUrls[1],
        app: downloadUrls[2],
      }), {
        pending: "Uploading Data to Central Server",
        success: "Upload Complete",
        error: "Upload rejected 🤯",
      })
      console.log(sphereData);
      setFile(null);
      setDescription("");
      setPrice("");
      setTitle("");
      setLoading(false);
    }
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
      <div className="create-item-container">
        <div className="container-width">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ flex: 1 }}>Create New Item</h1>
            <SolidButton
              title="Online Editor"
              onClick={() => {
                window
                  .open(
                    "https://sphereart-editor.netlify.app/editor/",
                    "_blank",
                    "",
                    true
                  )
                  .focus();
              }}
            />
          </div>
          <DragDrop
            onFileDrop={(file) => {
              setFile(file);
            }}
            file={file}
          />
          <div className="field-section">
            <h2>Name</h2>
            <input
              placeholder="Item Name"
              className="field-input"
              onChange={(e) => setTitle(e.currentTarget.value)}
              value={title}
            />
          </div>
          <div className="field-section">
            <h2>Description</h2>
            <textarea
              placeholder="Description of the Item"
              className="field-textarea"
              onChange={(e) => setDescription(e.currentTarget.value)}
              value={description}
            ></textarea>
          </div>
          <div className="field-section">
            <h2>Price</h2>
            <div className="price-field">
              <input
                placeholder="Enter Price"
                className="price-input"
                onChange={(e) => setPrice(e.currentTarget.value)}
                value={price}
              />
              <select className="crypto-drop-down">
                <option value="XTZ">XTZ</option>
              </select>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "50px",
            }}
          >
            <SolidButton title="Create Item" onClick={onCreate} />
          </div>
        </div>
        {loading && (
          <div className="loading-section">
            <SphereCanvas />
          </div>
        )}
      </div>
    </>
  );
};

export default CreateItem;

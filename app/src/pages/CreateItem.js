import React, { useEffect, useState } from "react";
import DragDrop from "../components/dragdrop/DragDrop";
import SolidButton from "../components/button/SolidButton";
import "./CreateItem.css";
import {
  createItem,
  uploadToIPFS,
  confirmOperation,
  getContractStorage,
  connectAccount
} from "../adapters/tezos";
import JSZip from "jszip";
import SphereCanvas from "../components/loader/SphereCanvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StorageService, DatabaseService } from "../adapters/firebase/index";
import { useHistory } from "react-router-dom";

const CreateItem = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    getPermissions();
  }, []);

  async function getPermissions() {
    const wallet = await connectAccount();
    if (wallet) {
      const permissions = await DatabaseService.get({ col: 'permissions', id: 'permissions' });
      let trigger = true;
      for (let i = 0; i < permissions.creation.length; i++) {
        if (permissions.creation[i] === wallet.address) {
          trigger = false;
        }
      }
      if (trigger) {
        alert('You do not have permission to create items.\n Please contact Sphere.Art .')
        history.goBack()
      }
    }
  }





  async function onCreate() {
    setErrors({});
    if (!file) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      toast.error("Please upload a file");
      return;
    } else if (title.length < 3 || description.length < 3 || price <= 0) {
      if (title.length < 3) {
        setErrors((errors) => {
          return {
            ...errors,
            title: "Title must be at least 3 characters",
          };
        });
      }
      if (description.length < 3) {
        setErrors((errors) => {
          return {
            ...errors,
            description: "Description must be at least 3 characters",
          };
        });
      }
      if (price <= 0) {
        setErrors((errors) => {
          return {
            ...errors,
            price: "Price must be more than 0",
          };
        });
      }
      toast.error("Please enter all fields correctly");
      document.body.scrollTop = 200; // For Safari
      document.documentElement.scrollTop = 200; // For Chrome, Firefox, IE and Opera
      return;
    }
    setLoading(true);
    let imageFile, jsonFile, videoFile;
    var entries = [];
    try {
      await JSZip.loadAsync(file).then((zip) => {
        zip.forEach((e, entry) => {
          entries.push(entry);
        });
      });
    } catch (e) {
      toast.error("Please upload a valid zip file");
    }
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index];
      var blob = await entry.async("blob");
      blob.name = entry.name;
      if (entry.name === "app.json") jsonFile = blob;
      else if (entry.name === "thumbnail.png") imageFile = blob;
      else videoFile = blob;
    }
    if (!jsonFile) {
      toast.error("Zip doesn't contain App.json");
    } else if (!imageFile) {
      toast.error("Zip doesn't contain Thumbnail");
    } else if (!videoFile) {
      toast.error("Zip doesn't contain Preview Video");
    } else if (
      JSON.parse(await jsonFile.text()).metadata.source !== "sphere.ART Editor"
    ) {
      toast.error("Export from Sphere.ART Editor");
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
          title: title,
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
      var storage = (await getContractStorage());
      var sphere = await storage.spheres.get(storage.token_id.c[0] - 1);
      var downloadUrls = await toast.promise(
        StorageService.upload(`spheres/${sphere.token_id}`, [
          imageFile,
          videoFile,
          jsonFile,
        ]),
        {
          pending: "Uploading Files to Central Storage",
          success: "Upload Complete",
          error: "Upload rejected 🤯",
        }
      );
      await toast.promise(
        DatabaseService.set("spheres", {
          ...sphere,
          description: description,
          price: sphere.price.c[0],
          token_id: sphere.token_id.c[0],
          timestamp: Date.parse(sphere.timestamp),
          image: downloadUrls[0],
          preview: downloadUrls[1],
          app: downloadUrls[2],
        }),
        {
          pending: "Uploading Data to Central Server",
          success: "Upload Complete",
          error: "Upload rejected 🤯",
        }
      );
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
              onChange={(e) => {
                setTitle(e.currentTarget.value);
                setErrors((errors) => {
                  delete errors.title;
                  return { ...errors };
                });
              }}
              value={title}
              style={{
                border: errors.title ? "1px solid red" : "",
              }}
            />
            <span
              style={{
                color: errors.title ? "red" : "",
              }}
            >
              {errors.title}
            </span>
          </div>
          <div className="field-section">
            <h2>Description</h2>
            <textarea
              placeholder="Description of the Item"
              className="field-textarea"
              onChange={(e) => {
                setDescription(e.currentTarget.value);
                setErrors((errors) => {
                  delete errors.description;
                  return { ...errors };
                });
              }}
              value={description}
              style={{
                border: errors.description ? "1px solid red" : "",
              }}
            />
            <span
              style={{
                color: errors.description ? "red" : "",
              }}
            >
              {errors.description}
            </span>
          </div>
          <div className="field-section">
            <h2>Price</h2>
            <div
              className="price-field"
              style={{
                border: errors.price ? "1px solid red" : "",
              }}
            >
              <input
                placeholder="Enter Price"
                className="price-input"
                type="number"
                onChange={(e) => {
                  setPrice(e.currentTarget.value);
                  setErrors((errors) => {
                    delete errors.price;
                    return { ...errors };
                  });
                }}
                value={price}
              />
              <select className="crypto-drop-down">
                <option value="XTZ">XTZ</option>
              </select>
            </div>
            <span
              style={{
                color: errors.price ? "red" : "",
              }}
            >
              {errors.price}
            </span>
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

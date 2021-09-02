import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import HoverVideoPlayer from "react-hover-video-player";
import Shimmer from '../shimmer';


import "./NFTCard.css";
import getIPFSData, { getIPFSMedia } from "../../adapters/ipfs";

const NFTCard = ({ sphere, onLoadIPFS }) => {
  const location = useLocation();
  const history = useHistory();

  const [ipfsData, setIpfsData] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const loadData = async () => {
    let ex = await getIPFSData(sphere.tokenUrl.split("ipfs://")[1]);
    let ipfsData = JSON.parse(ex);
    onLoadIPFS({ ...sphere, ...ipfsData });
    setIpfsData(ipfsData);

    let imageData = await getIPFSMedia(ipfsData.image.split("ipfs://")[1])
    let imageBlob = new Blob([new Uint8Array(imageData)], { type: "image/png" })
    setThumbnail(imageBlob)
    let previewData = await getIPFSMedia(ipfsData.properties.preview.split("ipfs://")[1])
    let previewBlob = new Blob([new Uint8Array(previewData)], { type: "video/webm" })
    setPreview(previewBlob)
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      className="container"
      onClick={() => {
        history.push({
          pathname:
            `/item/${sphere.token_id}`,
          state: { ...sphere, ...ipfsData },
        });
      }}
    >
      {!isLoading ? (
        <>
          <HoverVideoPlayer
            videoSrc={URL.createObjectURL(preview)}
            loop={true}
            sizingMode="overlay"
            overlayTransitionDuration={0}
            videoStyle={{
              height: "211px",
              marginBottom: "15px",
              borderRadius: "20px",
            }}
            unloadVideoOnPaused={true}
            style={{
              height: "211px",
              marginBottom: "15px",
              // borderRadius: "20px"
            }}
            pausedOverlayWrapperStyle={{
              zIndex: "0",
            }}
            pausedOverlay={
              <img
                src={URL.createObjectURL(thumbnail)}
                className="image-container"
                alt=""
              />
            }
          />
          <div className="title-style">{ipfsData.name}</div>
          <div className="price-style">
            <span style={{ fontWeight: "600" }}>
              {(sphere.price / 1000000).toFixed(2)}
            </span>{" "}
            XTZ
          </div>{" "}
        </>
      ) : (
        <>
          <Shimmer className="image-container shimmer" />
          <span>
            <Shimmer className="title-style shimmer" >title</Shimmer>
            <Shimmer className="price-style shimmer" >0TEZ</Shimmer>
          </span>
        </>
      )}
    </div>
  );
};

export default NFTCard;

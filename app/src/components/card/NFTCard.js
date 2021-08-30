import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import HoverVideoPlayer from "react-hover-video-player";

import "./NFTCard.css";
import getIPFSData from "../../adapters/ipfs";

const NFTCard = ({ sphere, onLoadIPFS }) => {
  const location = useLocation();
  const history = useHistory();

  const [ipfsData, setIpfsData] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const loadData = async () => {
    console.log(sphere)
    let ex = await getIPFSData(sphere.tokenUrl.split("ipfs://")[1]);
    let ipfsData = JSON.parse(ex);
    onLoadIPFS({ ...sphere, ...ipfsData });
    setIpfsData(ipfsData);
    setThumbnail({
      cid: ipfsData.image.split("ipfs://")[1].split("/")[0],
      name: ipfsData.image.split("ipfs://")[1].split("/")[1],
    });
    setPreview({
      cid: ipfsData.properties.preview.split("ipfs://")[1].split("/")[0],
      name: ipfsData.properties.preview.split("ipfs://")[1].split("/")[1],
    });
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
            (location.pathname === "/" ? "" : location.pathname) +
            `/item/${sphere.token_id}`,
          state: { ...sphere, ...ipfsData },
        });
      }}
    >
      {!  isLoading ? (
        <>
          <HoverVideoPlayer
            videoSrc={`https://ipfs.io/ipfs/${preview.cid}/${preview.name}`}
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
                src={`https://ipfs.io/ipfs/${thumbnail.cid}/${thumbnail.name}`}
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
        "Loading"
      )}
    </div>
  );
};

export default NFTCard;

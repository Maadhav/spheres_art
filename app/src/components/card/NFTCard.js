import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import HoverVideoPlayer from "react-hover-video-player";

import "./NFTCard.css";

const NFTCard = ({ sphere }) => {
  const location = useLocation();
  const history = useHistory();
  const [thumbnailCid, thumbnailName] = sphere.image
    .split("ipfs://")[1]
    .split("/");
  const [previewCid, previewName] = sphere.properties.preview.split("ipfs://")[1].split("/");
  return (
    <div
      className="container"
      onClick={() => {
        history.push({
          pathname:
            (location.pathname === "/" ? "" : location.pathname) +
            `/item/${sphere.token_id}`,
          state: sphere,
        });
      }}
    >

      <HoverVideoPlayer
        videoSrc={`https://ipfs.io/ipfs/${previewCid}/${previewName}`}
        loop={true}
        sizingMode="overlay"
        overlayTransitionDuration ={0}
        videoStyle = {{
            height: "211px",
            marginBottom: "15px",
            borderRadius: "20px"
        }}
        unloadVideoOnPaused={true}
        style={{
            height: "211px",
            marginBottom: "15px",
            // borderRadius: "20px"
        }}
        pausedOverlayWrapperStyle={{
          zIndex: "0"
        }}
        pausedOverlay={
          <img
            src={`https://ipfs.io/ipfs/${thumbnailCid}/${thumbnailName}`}
            className="image-container"
            alt=""
          />
        }
      />
      <div className="title-style">{sphere.name}</div>
      <div className="price-style">
        <span style={{ fontWeight: "600" }}>
          {(sphere.price / 1000000).toFixed(2)}
        </span>{" "}
        XTZ
      </div>
    </div>
  );
};

export default NFTCard;

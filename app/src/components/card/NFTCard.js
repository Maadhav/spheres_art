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
//   const [previewCid, previewName] = sphere.image.split("ipfs://")[1].split("/");
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
        videoSrc={`https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`}
        loop={true}
        sizingMode="container"
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
        pausedOverlay={
          <img
            src={`https://ipfs.io/ipfs/${thumbnailCid}/${thumbnailName}`}
            className="image-container"
            alt=""
          />
        }
        loadingOverlay={"Loading"}
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

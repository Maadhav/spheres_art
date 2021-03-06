import React from "react";
import { useHistory } from "react-router-dom";
import HoverVideoPlayer from "react-hover-video-player";
import { Image, Shimmer } from "react-shimmer";

import "./NFTCard.css";
import LoadingOverlay from "./LoadingOverlay";

const NFTCard = ({ sphere }) => {
  const history = useHistory();

  return (
    <div
      className="container"
      onClick={() => {
        history.push({
          pathname: `/item/${sphere.token_id}`,
          state: sphere,
        });
      }}
    >
      <>
        <HoverVideoPlayer
          videoSrc={sphere.preview}
          muted={true}
          loadingOverlay={
           <LoadingOverlay/>
          }
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
            <Image
              src={sphere.image}
              fallback={
                <Shimmer height={211} width={208} className="image-container" />
              }
              NativeImgProps={{ className: "image-container" }}
              alt=""
            />
          }
        />
        <div className="title-style">{sphere.title}</div>
        <div className="price-style">
          <span style={{ fontWeight: "600" }}>
            {(sphere.price / 1000000).toFixed(2)}
          </span>{" "}
          XTZ
        </div>{" "}
      </>
    </div>
  );
};

export default NFTCard;

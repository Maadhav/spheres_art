import { orderBy, query, startAfter, where, limit } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { DatabaseService } from "../adapters/firebase";
import LinedButton from "../components/button/LinedButton";
import NFTCard from "../components/card/NFTCard";
import Loader from "../components/loader/Loader";
import "./HomePage.css";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [spheres, setSpheres] = useState([]);
  const [length, setLength] = useState(0);
  async function getData() {
    var _data = await DatabaseService.get({
      col: "spheres",
      query: (ref) => {
        return query(
          ref,
          orderBy("timestamp", "desc"),
          where("isNew", "==", true),
          limit(8)
        );
      },
    });
    setSpheres(_data.sort(() => Math.random() - 0.5));
    setLength(8);
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="home-body">
      <div className="discover-card">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <span>Discover, collect, and sell extraordinary Sphere NFTs</span>
      </div>
      <div className="explore-section">
        <h1>Explore</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="nft-grid">
            {spheres.map(
              (e, i) => i < length && <NFTCard sphere={e} key={e.token_id} />
            )}
          </div>
        )}
      </div>
      {length !== 0 && spheres.length === length ? (
        <LinedButton
          title="Load More"
          onClick={async () => {
            var data = await DatabaseService.get({
              col: "spheres",
              query: (ref) => {
                return query(
                  ref,
                  orderBy("timestamp", "desc"),
                  where("isNew", "==", true),
                  startAfter(spheres[spheres.length - 1].timestamp),
                  limit(8)
                );
              },
            });
            setSpheres((val) => {
              return [...val, ...data.sort(() => Math.random() - 0.5)];
            });
            setLength((val) => val + 8);
          }}
          style={{ marginBottom: "60px", width: "300px" }}
        />
      ) : (
        <div />
      )}
    </div>
  );
};

export default HomePage;

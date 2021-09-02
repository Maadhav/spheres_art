import React, { useEffect, useState } from "react";
import "./Profile.css";
import banner from "../images/banner.png";
import Search from "../components/navbar/Search";
import NFTCard from "../components/card/NFTCard";
import LinedButton from "../components/button/LinedButton";
import Blockies from "react-blockies";
import { getActiveAccount, getContractStorage } from "../adapters/tezos";
import Loader from "../components/loader/Loader";
const MyCreation = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [spheres, setSpheres] = useState([]);
  const [length, setLength] = useState(0);
  const [allSpheres, setAllSpheres] = useState([]);
  const init = async () => {
    let activeAccount = await getActiveAccount();
    setWallet(activeAccount);
  };
  async function getData() {
    var data = (await getContractStorage()).spheres.valueMap;
    var spheres = [];
    var parseData = Array.from(data).map((k, v) => k[1]);
    for (let i = 0; i < parseData.length; i++) {
      const sphere = parseData[i];
      if (sphere.isNew && sphere.creator === wallet?.address) {
        spheres.push(sphere);
      }
    }
    setSpheres(spheres);
    setAllSpheres(spheres);
    setLength(8);
    setLoading(false);
  }

  function onFilterChange(value) {
    console.log(value);
    var _spheres;
    if (value === "0") {
      _spheres = spheres.sort((a, b) => b.timestamp - a.timestamp);
    } else if (value === "1") {
      _spheres = spheres.sort((a, b) => a.price - b.price);
    } else if (value === "2") {
      _spheres = spheres.sort((a, b) => b.price - a.price);
    }
    console.log(_spheres);
    setSpheres([..._spheres]);
    setLength(8);
    console.log(spheres);
  }

  useEffect(() => {
    init();
    getData();
  }, [wallet]);

  return (
    <div>
      <div className="banner-section">
        <img src={banner} alt="logo" />
        <div className="profile-section">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Blockies
              seed={wallet ? wallet.address : ""}
              scale={26}
              className="profile-image"
            />
            <h1 style={{ textAlign: "center" }}>
              {wallet ? wallet.address : ""}
            </h1>
          </div>
        </div>
      </div>
      <div className="search-section">
        <Search
          onChange={(e) => {
            if (e.target.value.trim() !== '') {
                setSpheres(allSpheres.filter((sphere) => sphere.title.toLowerCase().includes(e.target.value.toLowerCase())))
            } else if (e.target.value === '') {
                setSpheres(allSpheres)
                setLength(8)
            }
          }}
        />
        <select
          className="filter-select"
          onChange={(e) => {
            onFilterChange(e.currentTarget.value);
          }}
        >
          <option value="0">Recently Listed</option>
          <option value="1">Price: Low to High</option>
          <option value="2">Price: High to Low</option>
        </select>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="nft-section">
          <div className="nft-grid">
            {spheres.map(
              (e, i) =>
                i < length && (
                  <NFTCard
                    sphere={e}
                    key={e.token_id}
                    onLoadIPFS={(sphere) =>
                      setSpheres((val) =>
                        val.map((e, index) => {
                          if (index == i) return sphere;
                          else return e;
                        })
                      )
                    }
                  />
                )
            )}
          </div>
          {spheres.length > length && (
            <LinedButton
              title="Load More"
              onClick={() => {
                setLength((val) => val + 8);
              }}
              style={{ marginBottom: "60px", width: "300px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MyCreation;

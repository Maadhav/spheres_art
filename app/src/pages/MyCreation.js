import React, { useEffect, useState } from "react";
import "./Profile.css";
import banner from "../assets/banner.png";
import Search from "../components/navbar/Search";
import NFTCard from "../components/card/NFTCard";
import LinedButton from "../components/button/LinedButton";
import Blockies from "react-blockies";
import { getActiveAccount } from "../adapters/tezos";
import Loader from "../components/loader/Loader";
import { DatabaseService } from "../adapters/firebase";
import { limit, orderBy, query, startAfter, where } from "firebase/firestore";
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
    var data = await DatabaseService.get({
      col: 'spheres',
      query: (ref) => {
        return query(ref, orderBy('timestamp', 'desc'), where('owner', '==', wallet?.address), limit(8))
      }
    })
    setSpheres(data);
    setAllSpheres(data);
    setLength(8);
    setLoading(false);
  }

  function onFilterChange(value) {
    var _spheres;
    if (value === "0") {
      _spheres = spheres.sort((a, b) => b.timestamp - a.timestamp);
    } else if (value === "1") {
      _spheres = spheres.sort((a, b) => a.price - b.price);
    } else if (value === "2") {
      _spheres = spheres.sort((a, b) => b.price - a.price);
    }
    setSpheres([..._spheres]);
    setLength(8);
  }

  useEffect(() => {
    init();
    if (wallet)
      getData();
  }, [wallet]);

  return (
    <div style={{minHeight: '1000px'}}>
      <div className="banner-section">
        <img src={banner} alt="logo" style={{ width: "100%", height: "308px", objectFit: "cover" }} />
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
                          if (index === i) return sphere;
                          else return e;
                        })
                      )
                    }
                  />
                )
            )}
          </div>
          {length !== 0 && spheres.length === length ? (
            <LinedButton
              title="Load More"
              onClick={async () => {
                var data = await DatabaseService.get({
                  col: 'spheres',
                  query: (ref) => {
                    return query(ref, orderBy('timestamp', 'desc'), where('owner', '==', wallet?.address), startAfter(spheres[spheres.length - 1]), limit(8))
                  }
                })
                setSpheres((val) => [...val, ...data]);
                setLength((val) => val + 8);
              }}
              style={{ marginBottom: "60px", width: "300px" }}
            />
          ): <div/>}
        </div>
      )}
    </div>
  );
};

export default MyCreation;

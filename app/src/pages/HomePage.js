import React, { useEffect, useState } from "react";
import { StorageService } from "../adapters/firebase";
import { getContractStorage } from "../adapters/tezos";
import LinedButton from "../components/button/LinedButton";
import NFTCard from "../components/card/NFTCard";
import Loader from "../components/loader/Loader";
import "./HomePage.css";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [spheres, setSpheres] = useState([]);
  const [length, setLength] = useState(0);
  async function getData() {
    var allSpheres = []
    var searchElement;
    var data = (await getContractStorage()).spheres.valueMap;
    var parseData = Array.from(data)
      .map((k, v) => k[1])
      .filter((e) => e.isNew);
    let spheres = [];
    for (let i = 0; i < parseData.length; i++) {
      const sphere = parseData[i];

      spheres.push(sphere);
    }
    console.log(spheres)
    allSpheres = spheres;
    setSpheres(spheres);
    setLength(8);
    setLoading(false);

    setTimeout(() => {
      searchElement = document.getElementById('search')
      searchElement.addEventListener('input', () => {
        if (searchElement.value.trim() !== '') {
          setSpheres(allSpheres.filter((e) => e.title.toLowerCase().includes(searchElement.value.toLowerCase())))
        } else if (searchElement.value === '') {
          setSpheres(allSpheres)
          setLength(8)
        }
      })
    }, 500)
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="home-body">
      <input type='file' multiple onChange={async (event) => {
        var downloadUrl = await StorageService.upload('test', event.target.files);
        console.log(downloadUrl);

        // await StorageService.delete(downloadUrl);
      }} />
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
              (e, i) =>
                i < length && (
                  <NFTCard
                    sphere={e}
                    key={e.token_id}
                    onLoadIPFS={
                      (sphere) =>
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
  );
};

export default HomePage;

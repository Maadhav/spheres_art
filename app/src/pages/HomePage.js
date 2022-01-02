import { orderBy, query, startAfter,  where, limit } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { DatabaseService } from "../adapters/firebase";
import LinedButton from "../components/button/LinedButton";
import NFTCard from "../components/card/NFTCard";
import Loader from "../components/loader/Loader";
import "./HomePage.css";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [spheres, setSpheres] = useState([]);
  const [page, setPage] = useState(0);
  const [length, setLength] = useState(0);
  async function getData() {
    var allSpheres = []
    var searchElement;
    var _data = await DatabaseService.get({
      col: 'spheres',
      query: (ref) => {
        return query(ref, orderBy('timestamp', 'desc'), where('isNew', '==', true), limit(8))
      }
    });
    console.log(_data);
    setSpheres(_data);
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
                  />
                )
            )}
          </div>
        )}
      </div>
      {spheres.length === length && (
        <LinedButton
          title="Load More"
          onClick={async () => {
            var data = await DatabaseService.get({
              col: 'spheres',
              query: (ref) => {
                return query(ref, orderBy('timestamp', 'desc'), where('isNew', '==', true), startAfter(spheres[spheres.length - 1].timestamp), limit(8))
              }
            });
            setSpheres(val => {
              return [...val, ...data];
            })
            setLength((val) => val + 8);
          }}
          style={{ marginBottom: "60px", width: "300px" }}
        />
      )}
    </div>
  );
};

export default HomePage;

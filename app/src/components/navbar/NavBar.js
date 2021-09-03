import React, { useEffect, useState } from "react";
import Logo from "../logo/Logo";
import "./NavBar.css";
import Search from "./Search";
import MenuItem from "./menu/MenuItem";
import SolidButton from "../button/SolidButton";
import LinedButton from "../button/LinedButton";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  getActiveAccount,
  connectAccount,
  clearActiveAccount,
} from "../../adapters/tezos/index";
import ProfileButton from "../button/ProfileButton";




const NavBar = () => {
  const location = useLocation();
  const history = useHistory()
  const [index, setIndex] = useState(0);
  const [wallet, setWallet] = useState(null);

  const handleLogin = async () => {
    if (!wallet) {
      let wallet = await connectAccount();
      setWallet(wallet);
      console.log(wallet);
    } else {
      await clearActiveAccount();
      setWallet(null);
    }
  };

  const init = async () => {
    let activeAccount = await getActiveAccount();
    setWallet(activeAccount);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname.includes("profile")) {
      setIndex(1);
    } else {
      setIndex(0);
    }
  }, [location]);
  return (
    <div className="navbar-container">
      <Logo />
      <Search onClick={() => { if(location.pathname !== '/') history.replace('/')  }}/>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <MenuItem title="Explore" active={index === 0} />
      </Link>
      {wallet && <Link to={"/profile"} style={{ textDecoration: "none" }}>
        <MenuItem title="My Spheres" active={index === 1} />
      </Link>}
      {/* <MenuItem title="Following" active={index === 2} /> */}
      <Link to={"/create"} style={{ textDecoration: "none" }}>
        <SolidButton title="Create" onClick={() => { }} />
      </Link>
      {wallet ? <ProfileButton title={wallet.address} onDisconnect={handleLogin}/> :
        <LinedButton
          title={"Connect"}
          onClick={handleLogin}
        />}
    </div>
  );
};

export default NavBar;

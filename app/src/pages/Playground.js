import BigNumber from 'bignumber.js';
import React, { useCallback, useEffect, useState } from 'react'
import {useUnityContext,Unity} from 'react-unity-webgl';
import { getActiveAccount, getIGTContractStorage, mintSPZTokens } from '../adapters/tezos';

const Playground = () => {
    const { unityProvider, isLoaded, loadingProgression,sendMessage,addEventListener, removeEventListener,unload } = useUnityContext({
        loaderUrl: "build/Build.loader.js",
        dataUrl: "build/Build.data",
        frameworkUrl: "build/Build.framework.js",
        codeUrl: "build/Build.wasm",
      });

      const [coins, setCoins] = useState(0);

    const [loading, setLoading] = useState(true);

      const getData = async () => {
        setLoading(true);
        

        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);



      const handleCoins = useCallback((val) => {
        console.log(val)
        getActiveAccount().then(account =>
            mintSPZTokens(val, account.address));
      }, []);
    
      const OnAppReady = useCallback(async () => {
        console.log("OnAppReady");
        var account = await getActiveAccount();
        window.sendMessage = sendMessage
        window.account = account
        if (account) {
            var storage = await getIGTContractStorage();
            storage.ledger.get(account.address).then((val) => {
                var coins = BigNumber(val).toNumber();
                console.log(coins);
                setCoins(coins);
                sendMessage("Coins", "SetCoins", coins);
                sendMessage("Coins", "SetAccount", account.address);
            });
      }
    }, [sendMessage]);
    
    
    useEffect(() => {
        addEventListener("MintTokens", handleCoins);
        addEventListener("OnAppReady", OnAppReady);
        return () => {
            unload();
            removeEventListener("MintTokens", handleCoins);
            removeEventListener("OnAppReady", OnAppReady);
        };
    }, [addEventListener, removeEventListener, handleCoins, OnAppReady, unload]);
    
        
        
  
    const loadingPercentage = Math.round(loadingProgression * 100);
  return (
    <div className="container">
      {isLoaded === false && (
        // We'll conditionally render the loading overlay if the Unity
        // Application is not loaded.
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      {!loading && (<Unity className="unity" unityProvider={unityProvider} devicePixelRatio={1920/1080} style={{ width: '80%' }}/>)}
    </div>
  )
}

export default Playground
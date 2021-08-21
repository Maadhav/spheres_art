import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from "@taquito/taquito";
import { importKey } from "@taquito/signer";

const DAPP_NAME = "Sphere.ART";
const RPC_URL = "https://florencenet.smartpy.io";
const NETWORK = "florencenet";
const CONTRACT_ADDRESS = "KT19NL2ambSNZba9zzEUyyZfpKScRWZ2b8L2";

const Tezos = new TezosToolkit(RPC_URL);

const wallet = new BeaconWallet({
    name: DAPP_NAME,
    preferredNetwork: NETWORK,
    colorMode: 'dark'
});

// Setting the wallet as the wallet provider for Taquito.
Tezos.setWalletProvider(wallet)

const network = {
    type: NETWORK,
    rpcUrl: RPC_URL
};

const getActiveAccount = async () => {
    const activeAccount = await wallet.client.getActiveAccount();
    return activeAccount;
};

const connectAccount = async () => {
    const activeAccount = await wallet.client.getActiveAccount();
    // no active account, we need permissions first
    if (!activeAccount) {
        await wallet.requestPermissions({ network });
        return getActiveAccount();
    }
    return activeAccount;
};

const clearActiveAccount = async () => {
  return wallet.client.clearActiveAccount();
}

const getContract = async () => {
  return Tezos.wallet.at(CONTRACT_ADDRESS);
}

const getContractStorage = async () => {
  return (await getContract()).storage();
}

export {
  Tezos,
  wallet,
  getActiveAccount,
  connectAccount,
  clearActiveAccount,
  getContract,
  getContractStorage
};

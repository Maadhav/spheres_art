// import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from "@taquito/taquito";
import { importKey } from "@taquito/signer";
import {
  FA2_CODE_JSON,
  FA2_STORAGE_JSON,
  CODE_JSON,
  STORAGE_JSON,
} from "./contracts";
const DAPP_NAME = "Sphere.ART";
const RPC_URL = "https://florencenet.smartpy.io";
const NETWORK = "florencenet";
const CONTRACT_ADDRESS = "KT1LZqLAqZNZcDhZ3tP2adpDPBUhz6Gaw89N";

const Tezos = new TezosToolkit(RPC_URL);

// const wallet = new BeaconWallet({
//     name: DAPP_NAME,
//     preferredNetwork: NETWORK,
//     colorMode: 'light'
// });

const FAUCET_KEY = {
  mnemonic: [
    "observe",
    "body",
    "high",
    "subject",
    "enroll",
    "collect",
    "shell",
    "rally",
    "gym",
    "judge",
    "crew",
    "hurdle",
    "meat",
    "duty",
    "relax",
  ],
  secret: "bdfb5c00c3bd6761988a7098fc2f9f3d16666beb",
  amount: "4391730144",
  pkh: "tz1bm9dFuBnSzTzgZKuHjJsFfrPfdkVgj1PW",
  password: "wZn7IErB7b",
  email: "dtanuigt.rvsagfhi@tezos.example.org",
};

// Import the admin account
importKey(
  Tezos,
  FAUCET_KEY.email,
  FAUCET_KEY.password,
  FAUCET_KEY.mnemonic.join(" "),
  FAUCET_KEY.secret
).catch((e) => console.error(e));

console.log(Tezos._rpc);

// To Deploy the contract
// Tezos.contract.originate({
//     code: CODE_JSON,
//     init: STORAGE_JSON
// }).then(origination => {
//     console.log(`Origination waiting confirmation...`);
//     return origination.contract()
// }).then(contract => {
//     console.log(`Origination completed.`);
//     console.log(`Contract: ${contract.address}`)
// })
// .catch(error => console.log(error))
// Setting the wallet as the wallet provider for Taquito.
// Tezos.setWalletProvider(wallet)

// const network = {
//     type: NETWORK,
//     rpcUrl: RPC_URL
// };

// const getActiveAccount = async () => {
//     const activeAccount = await wallet.client.getActiveAccount();

//     // no active account, we need permissions first
//     if (!activeAccount) {
//         await wallet.requestPermissions({ network });
//         return getActiveAccount();
//     }

//     return activeAccount;
// };

// const clearActiveAccount = async () => {
//   return wallet.client.clearActiveAccount();
// }

// const getContract = async () => {
//   return Tezos.wallet.at(CONTRACT_ADDRESS);
// }

// const getContractStorage = async () => {
//   return (await getContract()).storage();
// }

export {
  Tezos,
  // wallet,
  // getActiveAccount,
  // clearActiveAccount,
  // getContract,
  // getContractStorage
};

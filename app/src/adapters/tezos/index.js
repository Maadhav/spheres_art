import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { importKey } from "@taquito/signer";
import { NFTStorage ,File } from "nft.storage";

const DAPP_NAME = "Sphere.ART";
const RPC_URL = "https://florencenet.smartpy.io";
const NETWORK = "florencenet";
const CONTRACT_ADDRESS = "KT1BCv4Hza5f83iVtXhctGKU6QTNYXmEThHw";

const Tezos = new TezosToolkit(RPC_URL);

const wallet = new BeaconWallet({
  name: DAPP_NAME,
  preferredNetwork: NETWORK,
  colorMode: "dark",
});

// Setting the wallet as the wallet provider for Taquito.
Tezos.setWalletProvider(wallet);

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIzYUZjNjQ2Y2IyNDY5YzExQTM2Q2M1YTgwNGIxODY4MzgxMjU2MTEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyOTcwMzE3NzIwNSwibmFtZSI6IlNwaGVyZS5BUlQifQ.FpuXmk2p22Oni4govC1buUjb1Vl8Pxv27_frE-jI12o";
const client = new NFTStorage({
  token: apiKey,
});

const network = {
  type: NETWORK,
  rpcUrl: RPC_URL,
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
};

const getContract = async () => {
  return Tezos.wallet.at(CONTRACT_ADDRESS);
};

const getContractStorage = async () => {
  return (await getContract()).storage();
};

const createItem = async ({title, description,jsonFile, imageFile, videoFile,  price }) => {
  console.log('Starting IPFS')
  const metadata = await client.store({
    name: title,
    description: description,
    image: new File([imageFile], imageFile.name, { type: 'image/png' }),
    properties: {
      file: new File([jsonFile], jsonFile.name, { type: jsonFile.type }),
      preview: new File([videoFile], videoFile.name, { type: videoFile.type })
    }
  });
  console.log('Completed IPFS')
  console.log(metadata.url)
  console.log("Started Minting")

  await getContract()
    .then((c) => {
      return c.methods.createItem(price,Math.round(Date.now()/ 1000), metadata.url ?? "test.com").send();
    })
    .then((operation) => {
      console.log("Mint operation sent.");
      console.log(operation);
      console.log(`Awaiting for ${operation.opHash} to be confirmed...`);
      return operation.confirmation(3).then(() => operation.opHash);
    })
    .then((opHash) => console.log(`Operation injected: ${opHash}`))
    .catch((error) => console.log(error));
};

const createSale = async ({ token_id, price }) => {
  getContract()
    .then((c) => {
      return c.methods.createSale(token_id ?? 0).send({
        amount: price,
        mutez: true,
      });
    })
    .then((operation) => {
      console.log("Buy operation sent.");
      console.log(`Awaiting for ${operation.opHash} to be confirmed...`);
      return operation.confirmation(3).then(() => operation.opHash);
    })
    .then((opHash) => console.log(`Operation injected: ${opHash}`))
    .catch((error) => console.log(error));
};

export {
  Tezos,
  wallet,
  getActiveAccount,
  connectAccount,
  clearActiveAccount,
  getContract,
  getContractStorage,
  createItem,
  createSale,
};

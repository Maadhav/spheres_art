import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { NFTStorage, File } from "nft.storage";

const DAPP_NAME = "Sphere.ART";
const RPC_URL = "https://mainnet.api.tez.ie";
const NETWORK = "mainnet";
const CONTRACT_ADDRESS = "KT1BWCZkyNyE2AHomVsQvi4sfZdDHL7BZi8P";

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

const uploadToIPFS = async ({
  title,
  description,
  jsonFile,
  imageFile,
  videoFile,
  zipFile,
}) => {
  const metadata = await client.store({
    name: title,
    description: description,
    image: new File([imageFile], imageFile.name, { type: "image/png" }),
    properties: {
      file: new File([jsonFile], jsonFile.name, { type: jsonFile.type }),
      zip: new File([zipFile], zipFile.name, { type: "application/zip" }),
      preview: new File([videoFile], videoFile.name, { type: videoFile.type }),
    },
  });
  return metadata.url;
};

const mint = async ({ url, price, title }) => {
  return await getContract().then((c) => {
    return c.methods
      .mint(
        price,
        title,
        url,
      )
      .send();
  });
};
const confirmOperation = async (operation) => {
  console.log(`Awaiting for ${operation.opHash} to be confirmed...`);
  return operation.confirmation(1).then(() => operation.opHash);
};

const collect = async ({ token_id, price }) => {
  return await getContract().then((c) => {
    return c.methods.collect(token_id).send({
      amount: price,
      mutez: true,
    });
  });
};

const updatePrice = async ({ token_id, price }) => {
  return await getContract().then((c) => {
    return c.methods.update(price, token_id).send();
  });
};

export {
  Tezos,
  wallet,
  getActiveAccount,
  updatePrice,
  connectAccount,
  clearActiveAccount,
  getContract,
  getContractStorage,
  uploadToIPFS,
  mint as createItem,
  confirmOperation,
  collect as createSale,
};

import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { NFTStorage, File } from "nft.storage";
import { InMemorySigner, importKey } from "@taquito/signer";

const DAPP_NAME = "Sphere.ART";
const RPC_URL = "https://mainnet.api.tez.ie";
const TESTNET_RPC_URL = "https://jakartanet.smartpy.io";
const NETWORK = "mainnet";
const TESTNET_NETWORK = "jakartanet";
const CONTRACT_ADDRESS = "KT1BWCZkyNyE2AHomVsQvi4sfZdDHL7BZi8P";
const TESTNET_IGT_CONTRACT_ADDRESS = "KT1T8CbPHFnenakbqpjrMFNPqZQWtbi93TPA";

window.TESTNET_IGT_CONTRACT_ADDRESS = TESTNET_IGT_CONTRACT_ADDRESS;

const Tezos = new TezosToolkit(TESTNET_RPC_URL);

const wallet = new BeaconWallet({
  name: DAPP_NAME,
  preferredNetwork: TESTNET_NETWORK,
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
  type: TESTNET_NETWORK,
  rpcUrl: TESTNET_RPC_URL,
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

const getIGTContract = async () => {
  return Tezos.wallet.at(TESTNET_IGT_CONTRACT_ADDRESS);
};

const getContractStorage = async () => {
  return (await getContract()).storage();
};

const getIGTContractStorage = async () => {
  return (await getIGTContract()).storage();
};

const mintSPZTokens = async (amount, to_) => {
  console.log(amount, to_);
  Tezos.setProvider({
    signer: new InMemorySigner(process.env.REACT_APP_PRIVATE_KEY),
  });
  await Tezos.contract
    .at(TESTNET_IGT_CONTRACT_ADDRESS)
    .then((contract) => {
      return contract.methods.mint([{ to_: to_, amount: amount }]).send();;
    })
    .catch((error) => window.alert(`Error: ${JSON.stringify(error, null, 2)}`));
  Tezos.setWalletProvider(wallet);
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
  mintSPZTokens,
  getIGTContractStorage,
  getIGTContract,
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

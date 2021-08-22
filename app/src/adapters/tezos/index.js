import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { importKey } from "@taquito/signer";

const DAPP_NAME = "Sphere.ART";
const RPC_URL = "https://florencenet.smartpy.io";
const NETWORK = "florencenet";
const CONTRACT_ADDRESS = "KT1TxHAn2hqGMNZBDGdebeVA7DaWqUEqrs1H";

const Tezos = new TezosToolkit(RPC_URL);

const wallet = new BeaconWallet({
  name: DAPP_NAME,
  preferredNetwork: NETWORK,
  colorMode: "dark",
});

// Setting the wallet as the wallet provider for Taquito.
Tezos.setWalletProvider(wallet);

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

const createItem = async ({ url, price,timestamp }) => {
  getContract()
    .then((c) => {
      return c.methods.createItem(price ?? 100000,timestamp, url ?? "test.com").send();
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

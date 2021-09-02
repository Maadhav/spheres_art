import { Tezos } from "./index";
import { importKey } from "@taquito/signer";
import {
  FA2_CODE_JSON,
  FA2_STORAGE_JSON,
  CODE_JSON,
  STORAGE_JSON,
} from "./contracts";
const RPC_URL = "https://granadanet.smartpy.io";

const FAUCET_KEY = {
  "mnemonic": [
    "remember",
    "garden",
    "anchor",
    "enrich",
    "perfect",
    "hobby",
    "length",
    "setup",
    "series",
    "apart",
    "fence",
    "snow",
    "tape",
    "bind",
    "salad"
  ],
  "secret": "8d5f04490f1d82ab1f1128972469684ec849dbcf",
  "amount": "431864625",
  "pkh": "tz1aWs9YmRiD8QcYDfTrRQxD5BRMVHnGtU49",
  "password": "q6w3lB2FNv",
  "email": "rvcqcdhx.myttrltz@tezos.example.org"
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

export function deploy() {
  Tezos.contract
    .originate({
      // code: FA2_CODE_JSON,
      // init: FA2_STORAGE_JSON,
      code: CODE_JSON,
      init: STORAGE_JSON,
    })
    .then((origination) => {
      console.log(`Origination waiting confirmation...`);
      return origination.contract();
    })
    .then((contract) => {
      console.log(`Origination completed.`);
      console.log(`Contract: ${contract.address}`);
    })
    .catch((error) => console.log(error));
}

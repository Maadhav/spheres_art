import { Tezos } from "./index";
import { importKey } from "@taquito/signer";
import {
  FA2_CODE_JSON,
  FA2_STORAGE_JSON,
  CODE_JSON,
  STORAGE_JSON,
} from "./contracts";
const RPC_URL = "https://florencenet.smartpy.io";

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

export function deploy() {
  Tezos.contract
    .originate({
      code: FA2_CODE_JSON,
      init: FA2_STORAGE_JSON,
    //   code: CODE_JSON,
    //   init: STORAGE_JSON,
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

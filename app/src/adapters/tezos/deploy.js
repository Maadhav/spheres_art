import { Tezos } from "./index";
import { importKey } from "@taquito/signer";
import {
  FA2_CODE_JSON,
  FA2_STORAGE_JSON,
  CODE_JSON,
  STORAGE_JSON,
} from "./contracts";


const FAUCET_KEY = {
  pkh: "tz1e2YHCQ8YJESdR4VQN56tkQKheivwdWB2c",
  mnemonic: [
    "share",
    "vessel",
    "traffic",
    "paddle",
    "potato",
    "excuse",
    "answer",
    "safe",
    "entry",
    "tube",
    "need",
    "object",
    "coast",
    "remain",
    "copper",
  ],
  email: "qehetzoz.ilroiuaf@teztnets.xyz",
  password: "2PbooXYZSC",
  amount: "67423786090",
  activation_code: "7031578a6bd3b9d0eff9ee803420f1556340d7f5",
};

// Import the admin account
importKey(
  Tezos,
  FAUCET_KEY.email,
  FAUCET_KEY.password,
  FAUCET_KEY.mnemonic.join(" "),
  FAUCET_KEY.activation_code
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

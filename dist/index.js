"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// index.ts
var ssi_atm_credo_exports = {};
__export(ssi_atm_credo_exports, {
  Issuer: () => Issuer
});
module.exports = __toCommonJS(ssi_atm_credo_exports);

// src/agent/issuer.ts
var import_core4 = require("@credo-ts/core");

// src/agent/base.ts
var import_core = require("@credo-ts/core");
var import_node = require("@credo-ts/node");
var BaseAgent = class {
  constructor({
    port,
    label,
    endpoints = [],
    agent,
    config
  }) {
    this.port = port;
    this.label = label;
    this.endpoints = endpoints;
    this.config = config;
    this.agent = agent;
    this.agent.registerInboundTransport(new import_node.HttpInboundTransport({ port }));
    this.agent.registerOutboundTransport(new import_core.HttpOutboundTransport());
    this.agent.registerOutboundTransport(new import_core.WsOutboundTransport());
  }
};

// src/module/index.ts
var import_anoncreds = require("@credo-ts/anoncreds");
var import_askar = require("@credo-ts/askar");
var import_core2 = require("@credo-ts/core");
var import_indy_vdr = require("@credo-ts/indy-vdr");
var import_anoncreds_nodejs = require("@hyperledger/anoncreds-nodejs");
var import_aries_askar_nodejs = require("@hyperledger/aries-askar-nodejs");
var import_indy_vdr_nodejs = require("@hyperledger/indy-vdr-nodejs");

// src/networks/bcovrin-test.ts
var bcovrin = `{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"138.197.138.255","client_port":9702,"node_ip":"138.197.138.255","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"138.197.138.255","client_port":9704,"node_ip":"138.197.138.255","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node3","blskey":"3WFpdbg7C5cnLYZwFZevJqhubkFALBfCBBok15GdrKMUhUjGsk3jV6QKj6MZgEubF7oqCafxNdkm7eswgA4sdKTRc82tLGzZBd6vNqU8dupzup6uYUf32KTHTPQbuUM8Yk4QFXjEf2Usu2TJcNkdgpyeUSX42u5LqdDDpNSWUK5deC5","blskey_pop":"QwDeb2CkNSx6r8QC8vGQK3GRv7Yndn84TGNijX8YXHPiagXajyfTjoR87rXUu4G4QLk2cF8NNyqWiYMus1623dELWwx57rLCFqGh7N4ZRbGDRP4fnVcaKg1BcUxQ866Ven4gw8y4N56S5HzxXNBZtLYmhGHvDtk6PFkFwCvxYrNYjh","client_ip":"138.197.138.255","client_port":9706,"node_ip":"138.197.138.255","node_port":9705,"services":["VALIDATOR"]},"dest":"DKVxG2fXXTU8yT5N7hGEbXB3dfdAnYv1JczDUHpmDxya"},"metadata":{"from":"4cU41vWW82ArfxJxHkzXPG"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"7e9f355dffa78ed24668f0e0e369fd8c224076571c51e2ea8be5f26479edebe4"},"ver":"1"}
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node4","blskey":"2zN3bHM1m4rLz54MJHYSwvqzPchYp8jkHswveCLAEJVcX6Mm1wHQD1SkPYMzUDTZvWvhuE6VNAkK3KxVeEmsanSmvjVkReDeBEMxeDaayjcZjFGPydyey1qxBHmTvAnBKoPydvuTAqx5f7YNNRAdeLmUi99gERUU7TD8KfAa6MpQ9bw","blskey_pop":"RPLagxaR5xdimFzwmzYnz4ZhWtYQEj8iR5ZU53T2gitPCyCHQneUn2Huc4oeLd2B2HzkGnjAff4hWTJT6C7qHYB1Mv2wU5iHHGFWkhnTX9WsEAbunJCV2qcaXScKj4tTfvdDKfLiVuU2av6hbsMztirRze7LvYBkRHV3tGwyCptsrP","client_ip":"138.197.138.255","client_port":9708,"node_ip":"138.197.138.255","node_port":9707,"services":["VALIDATOR"]},"dest":"4PS3EDQ3dW1tci1Bp6543CfuuebjFrg36kLAUcskGfaA"},"metadata":{"from":"TWwCRQRZ2ZHMJFn9TzLp7W"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"aa5e817d7cc626170eca175822029339a444eb0ee8f0bd20d3b0b76e566fb008"},"ver":"1"}`;
var BcovrinTestNetworkConfig = {
  genesisTransactions: bcovrin,
  indyNamespace: "bcovrin:test",
  isProduction: false,
  connectOnStartup: true
};

// src/module/index.ts
var AgentModule = {
  IndyIssuer: function() {
    return {
      connections: new import_core2.ConnectionsModule({
        autoAcceptConnections: true
      }),
      credentials: new import_core2.CredentialsModule({
        autoAcceptCredentials: import_core2.AutoAcceptCredential.ContentApproved,
        credentialProtocols: [
          new import_core2.V2CredentialProtocol({
            credentialFormats: [new import_anoncreds.AnonCredsCredentialFormatService()]
          })
        ]
      }),
      indyVdr: new import_indy_vdr.IndyVdrModule({
        indyVdr: import_indy_vdr_nodejs.indyVdr,
        networks: [BcovrinTestNetworkConfig]
      }),
      proofs: new import_core2.ProofsModule({
        autoAcceptProofs: import_core2.AutoAcceptProof.ContentApproved,
        proofProtocols: [
          new import_core2.V2ProofProtocol({
            proofFormats: [new import_anoncreds.AnonCredsProofFormatService()]
          })
        ]
      }),
      anoncreds: new import_anoncreds.AnonCredsModule({
        registries: [new import_indy_vdr.IndyVdrAnonCredsRegistry()],
        anoncreds: import_anoncreds_nodejs.anoncreds
      }),
      dids: new import_core2.DidsModule({
        registrars: [new import_indy_vdr.IndyVdrIndyDidRegistrar()],
        resolvers: [new import_indy_vdr.IndyVdrIndyDidResolver()]
      }),
      askar: new import_askar.AskarModule({
        ariesAskar: import_aries_askar_nodejs.ariesAskar
      })
    };
  }
};

// src/agent/issuer.ts
var import_node2 = require("@credo-ts/node");

// src/lib/did.ts
var import_core3 = require("@credo-ts/core");
function importDid(options) {
  return __async(this, null, function* () {
    try {
      yield this.agent.dids.import({
        did: options.did,
        privateKeys: [
          {
            keyType: import_core3.KeyType.Ed25519,
            privateKey: import_core3.TypedArrayEncoder.fromString(options.seed)
          }
        ],
        overwrite: true
      });
    } catch (e) {
      throw new Error(e.message);
    }
  });
}

// src/lib/init.ts
function initAgent() {
  return __async(this, null, function* () {
    try {
      yield this.agent.initialize();
    } catch (e) {
      throw new Error(e.message);
    }
  });
}

// src/agent/issuer.ts
var Issuer = class extends BaseAgent {
  constructor({
    port,
    label,
    endpoints = [],
    key
  }) {
    const config = {
      label,
      walletConfig: {
        id: `issuer-wallet-${label}`,
        key
      }
    };
    const agent = new import_core4.Agent({
      config,
      dependencies: import_node2.agentDependencies,
      modules: AgentModule.IndyIssuer()
    });
    super({ port, label, endpoints, agent, config });
    this.initialize = initAgent;
    this.importDidFromLedger = importDid;
  }
  proofListener() {
    throw new Error("Method not implemented.");
  }
  messageListener() {
    throw new Error("Method not implemented.");
  }
  credentialListener() {
    throw new Error("Method not implemented.");
  }
  connectionListener() {
    throw new Error("Method not implemented.");
  }
};
function main() {
  return __async(this, null, function* () {
    const issuer = new Issuer({ port: 3001, label: "issuer", endpoints: [], key: "1234" });
    yield issuer.initialize();
    yield issuer.importDidFromLedger({
      did: "did:indy:bcovrin:test:HTYnVHNExB8qjMh8otSz4X",
      seed: "ssiatm00000000000000000000000000"
    });
  });
}
main();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Issuer
});
//# sourceMappingURL=index.js.map
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
var import_core5 = require("@credo-ts/core");

// src/agent/base.ts
var import_core = require("@credo-ts/core");
var import_node = require("@credo-ts/node");
var BaseAgent = class {
  constructor({
    port,
    label,
    endpoints = [],
    agent,
    config,
    listenerCbs
  }) {
    this.port = port;
    this.label = label;
    this.endpoints = endpoints;
    this.config = config;
    this.agent = agent;
    this.listenerCbs = listenerCbs;
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
      return {
        success: true
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  });
}
function getWalletDids(options) {
  return __async(this, null, function* () {
    try {
      const dids = yield this.agent.dids.getCreatedDids({
        method: options.method,
        did: options.did
      });
      return { dids: dids.map((did) => did.did) };
    } catch (e) {
      return { dids: [] };
    }
  });
}

// src/lib/init.ts
function initAgent() {
  return __async(this, null, function* () {
    try {
      yield this.agent.initialize();
      console.log(`Agent ${this.agent.config.label} is initialized on port ${this.port}`);
      this.proofListener();
      this.messageListener();
      this.credentialListener();
      this.connectionListener();
    } catch (e) {
      throw new Error(e.message);
    }
  });
}

// src/lib/schema.ts
function createSchema(options) {
  return __async(this, null, function* () {
    try {
      const response = yield this.agent.modules.anoncreds.registerSchema({
        schema: {
          name: options.name,
          version: options.version,
          attrNames: options.attributes,
          issuerId: options.did
        },
        options: {
          endorserMode: "internal",
          endorserDid: options.did
        }
      });
      return {
        schemaId: response.schemaState.schemaId,
        state: response.schemaState.state,
        schema: response.schemaState.schema
      };
    } catch (e) {
      throw new Error(e.message);
    }
  });
}
function getSchemaFromLedger(options) {
  return __async(this, null, function* () {
    try {
      const response = yield this.agent.modules.anoncreds.getSchema(options.schemaId);
      return {
        schemaId: response.schemaId,
        schema: response.schema
      };
    } catch (e) {
      throw new Error(e.message);
    }
  });
}
function getCreatedSchemas(options) {
  return __async(this, null, function* () {
    try {
      const schemas = yield this.agent.modules.anoncreds.getCreatedSchemas({
        schemaId: options.schemaId
      });
      return schemas;
    } catch (e) {
      throw new Error(e.message);
    }
  });
}

// src/lib/cred-def.ts
function createCredentialDefinition(options) {
  return __async(this, null, function* () {
    try {
      const response = yield this.agent.modules.anoncreds.registerCredentialDefinition({
        credentialDefinition: {
          schemaId: options.schemaId,
          tag: options.tag,
          issuerId: options.did
        },
        options: {
          endorserMode: "internal",
          endorserDid: options.did,
          supportRevocation: false
        }
      });
      return {
        credentialDefinitionId: response.credentialDefinitionState.credentialDefinitionId,
        state: response.credentialDefinitionState.state
      };
    } catch (e) {
      throw new Error(e.message);
    }
  });
}
function getCredentialDefinitionFromLedger(options) {
  return __async(this, null, function* () {
    try {
      const response = yield this.agent.modules.anoncreds.getCredentialDefinition(options.credentialDefinitionId);
      return {
        credentialDefinitionId: response.credentialDefinitionId,
        credentialDefinition: response.credentialDefinition
      };
    } catch (e) {
      throw new Error(e.message);
    }
  });
}
function getCreatedCredentialDefinitions(options) {
  return __async(this, null, function* () {
    try {
      const credentialDefinitions = yield this.agent.modules.anoncreds.getCreatedCredentialDefinitions({
        credentialDefinitionId: options.credentialDefinitionId
      });
      return credentialDefinitions;
    } catch (e) {
      throw new Error(e.message);
    }
  });
}

// src/lib/credential.ts
function offerCredential(options) {
  return __async(this, null, function* () {
    try {
      const response = yield this.agent.credentials.offerCredential({
        connectionId: options.connectionId,
        protocolVersion: "v2",
        credentialFormats: {
          anoncreds: {
            attributes: options.attributes,
            credentialDefinitionId: options.credentialDefinitionId,
            linkedAttachments: options.linkedAttachments
          }
        }
      });
      return {
        credentialExchangeRecordId: response.id,
        state: response.state
      };
    } catch (e) {
      throw new Error(e.message);
    }
  });
}
function getCredentialExchangeRecord(options) {
  return __async(this, null, function* () {
    try {
      const response = yield this.agent.credentials.getById(options.credentialExchangeRecordId);
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  });
}

// src/lib/proof.ts
function createConnectionlessProofRequest(options) {
  return __async(this, null, function* () {
    try {
      const proofConfig = {
        name: options.presentationRequestLabel,
        version: options.presentationRequestVersion
      };
      if (options.requested_attributes) {
        proofConfig.requestedAttributes = options.requested_attributes;
      }
      if (options.requested_predicates) {
        proofConfig.requestedPredicates = options.requested_predicates;
      }
      if (options.non_revoked) {
        proofConfig.nonRevoked = options.non_revoked;
      }
      const { message, proofRecord } = yield this.agent.proofs.createRequest({
        protocolVersion: "v2",
        proofFormats: {
          anoncreds: proofConfig
        }
      });
      const oobInvitationRecord = yield this.agent.oob.createInvitation({
        alias: options.alias,
        label: options.label,
        handshake: false,
        messages: [message]
      });
      const invitationUrl = oobInvitationRecord.outOfBandInvitation.toUrl({
        domain: options.domain
      });
      const invitationJson = oobInvitationRecord.outOfBandInvitation.toJSON();
      return {
        presentationExchangeRecordId: proofRecord.id,
        invitationJson,
        state: proofRecord.state,
        invitationUrl
      };
    } catch (e) {
      throw new Error(e.message);
    }
  });
}
function getProofExchangeRecord(options) {
  return __async(this, null, function* () {
    var _a;
    try {
      const response = yield this.agent.proofs.getById(options.presentationExchangeRecordId);
      return {
        presentationExchangeRecordId: response.id,
        state: response.state,
        isVerified: (_a = response.isVerified) != null ? _a : false,
        record: response
      };
    } catch (e) {
      throw new Error(e.message);
    }
  });
}
function getPresentationData(options) {
  return __async(this, null, function* () {
    try {
      const response = yield this.agent.proofs.getFormatData(options.presentationExchangeRecordId);
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  });
}

// src/lib/listener.ts
var import_core4 = require("@credo-ts/core");
function proofListener() {
  console.log(`ProofListener is started on ${this.agent.config.label}`);
  console.log(this.listenerCbs.proof ? "Proof listerner callback is set" : "Proof listerner callback is not available using default listener");
  this.agent.events.on(import_core4.ProofEventTypes.ProofStateChanged, (event) => __async(this, null, function* () {
    if (this.listenerCbs.proof) {
      this.listenerCbs.proof(event);
    } else {
      console.log("Proof state: ", event.payload.proofRecord.state);
      console.log("payload: ", event.payload);
    }
  }));
}
function messageListener() {
  console.log(`MessageListener is started on ${this.agent.config.label}`);
  this.agent.events.on(
    import_core4.BasicMessageEventTypes.BasicMessageStateChanged,
    (event) => __async(this, null, function* () {
      console.log("BasicMessageStateChangedEvent", event.payload.basicMessageRecord.role);
    })
  );
}
function credentialListener() {
  console.log(`CredentialListener is started on ${this.agent.config.label}`);
  console.log(this.listenerCbs.credential ? "Credential listerner callback is set" : "Credential listerner callback is not available using default listener");
  this.agent.events.on(
    import_core4.CredentialEventTypes.CredentialStateChanged,
    (event) => __async(this, null, function* () {
      if (this.listenerCbs.credential) {
        this.listenerCbs.credential(event);
      } else {
        console.log("Credential state: ", event.payload.credentialRecord.state);
        console.log("payload: ", event.payload);
      }
    })
  );
}
function connectionListener() {
  console.log(this.listenerCbs.connection ? "Connection listerner callback is set" : "Connection listerner callback is not available using default listener");
  console.log(`ConnectionListener is started on ${this.agent.config.label}`);
  this.agent.events.on(import_core4.ConnectionEventTypes.ConnectionStateChanged, (event) => __async(this, null, function* () {
    if (this.listenerCbs.connection) {
      this.listenerCbs.connection(event);
    } else {
      console.log("Connection state: ", event.payload.connectionRecord.state);
      console.log("payload: ", event.payload);
    }
  }));
}

// src/lib/connection.ts
function createInvitation(options) {
  return __async(this, null, function* () {
    var _a, _b, _c;
    try {
      const response = yield this.agent.oob.createInvitation({
        alias: (_a = options.alias) != null ? _a : this.label,
        label: (_b = options.label) != null ? _b : this.label,
        multiUseInvitation: (_c = options.reusable) != null ? _c : false
      });
      return {
        invitationUrl: response.outOfBandInvitation.toUrl({ domain: this.agent.config.endpoints[0] }),
        invitationJson: response.outOfBandInvitation.toJSON(),
        oobId: response.id
      };
    } catch (e) {
      throw new Error(e.message);
    }
  });
}
function getConnectionById(options) {
  return __async(this, null, function* () {
    try {
      if (options.connectionId) {
        const record = yield this.agent.connections.getById(options.connectionId);
        return { record };
      } else if (options.oobId) {
        const [record] = yield this.agent.connections.findAllByOutOfBandId(options.oobId);
        return { record };
      }
      throw new Error("Either connectionId or oobId must be provided");
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
    key,
    listenerCbs
  }) {
    const config = {
      label,
      walletConfig: {
        id: `issuer-wallet-${label}`,
        key
      },
      endpoints
    };
    const agent = new import_core5.Agent({
      config,
      dependencies: import_node2.agentDependencies,
      modules: AgentModule.IndyIssuer()
    });
    super({ port, label, endpoints, agent, config, listenerCbs });
    this.initialize = initAgent.bind(this);
    // did
    this.importDidFromLedger = importDid;
    this.getPublicDids = getWalletDids;
    // connection
    this.createConnectionInvitation = createInvitation;
    this.getConnectionById = getConnectionById;
    // schema
    this.createSchema = createSchema;
    this.retriveSchemaFromLedgerById = getSchemaFromLedger;
    this.getSchemasFromWallet = getCreatedSchemas;
    // credential definition
    this.createCredentialDefinition = createCredentialDefinition;
    this.getCredentialDefintionsFromWallet = getCreatedCredentialDefinitions;
    this.retrieveCredentialDefinitionFromLedgerById = getCredentialDefinitionFromLedger;
    // credential issuance
    this.issueCredential = offerCredential;
    this.getCredentialRecordById = getCredentialExchangeRecord;
    // proof request
    this.createProofRequest = createConnectionlessProofRequest;
    this.getProofRecordById = getProofExchangeRecord;
    this.getPresentationData = getPresentationData;
    this.proofListener = proofListener;
    this.messageListener = messageListener;
    this.credentialListener = credentialListener;
    this.connectionListener = connectionListener;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Issuer
});
//# sourceMappingURL=index.js.map
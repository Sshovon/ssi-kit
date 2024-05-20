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

// src/agent/issuer.ts
import { Agent as Agent2 } from "@credo-ts/core";

// src/agent/base.ts
import { HttpOutboundTransport, WsOutboundTransport } from "@credo-ts/core";
import { HttpInboundTransport } from "@credo-ts/node";
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
    this.agent.registerInboundTransport(new HttpInboundTransport({ port }));
    this.agent.registerOutboundTransport(new HttpOutboundTransport());
    this.agent.registerOutboundTransport(new WsOutboundTransport());
  }
};

// src/module/index.ts
import { AnonCredsCredentialFormatService, AnonCredsModule, AnonCredsProofFormatService } from "@credo-ts/anoncreds";
import { AskarModule } from "@credo-ts/askar";
import { AutoAcceptCredential, AutoAcceptProof, ConnectionsModule, CredentialsModule, DidsModule, ProofsModule, V2CredentialProtocol, V2ProofProtocol } from "@credo-ts/core";
import { IndyVdrAnonCredsRegistry, IndyVdrIndyDidRegistrar, IndyVdrIndyDidResolver, IndyVdrModule } from "@credo-ts/indy-vdr";
import { anoncreds } from "@hyperledger/anoncreds-nodejs";
import { ariesAskar } from "@hyperledger/aries-askar-nodejs";
import { indyVdr } from "@hyperledger/indy-vdr-nodejs";

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
      connections: new ConnectionsModule({
        autoAcceptConnections: true
      }),
      credentials: new CredentialsModule({
        autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
        credentialProtocols: [
          new V2CredentialProtocol({
            credentialFormats: [new AnonCredsCredentialFormatService()]
          })
        ]
      }),
      indyVdr: new IndyVdrModule({
        indyVdr,
        networks: [BcovrinTestNetworkConfig]
      }),
      proofs: new ProofsModule({
        autoAcceptProofs: AutoAcceptProof.ContentApproved,
        proofProtocols: [
          new V2ProofProtocol({
            proofFormats: [new AnonCredsProofFormatService()]
          })
        ]
      }),
      anoncreds: new AnonCredsModule({
        registries: [new IndyVdrAnonCredsRegistry()],
        anoncreds
      }),
      dids: new DidsModule({
        registrars: [new IndyVdrIndyDidRegistrar()],
        resolvers: [new IndyVdrIndyDidResolver()]
      }),
      askar: new AskarModule({
        ariesAskar
      })
    };
  }
};

// src/agent/issuer.ts
import { agentDependencies as agentDependencies2 } from "@credo-ts/node";

// src/lib/did.ts
import { KeyType, TypedArrayEncoder } from "@credo-ts/core";
function importDid(options) {
  return __async(this, null, function* () {
    try {
      yield this.agent.dids.import({
        did: options.did,
        privateKeys: [
          {
            keyType: KeyType.Ed25519,
            privateKey: TypedArrayEncoder.fromString(options.seed)
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
function getSchema(options) {
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
function getCredentialDefinition(options) {
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

// src/lib/listener.ts
import { BasicMessageEventTypes, BasicMessageRole, ConnectionEventTypes, CredentialEventTypes, DidExchangeState, ProofEventTypes, ProofState } from "@credo-ts/core";
function proofListener() {
  console.log(`ProofListener is started on ${this.agent.config.label}`);
  this.agent.events.on(ProofEventTypes.ProofStateChanged, (event) => __async(this, null, function* () {
    console.log("ProofStateChangedEvent", event.payload.proofRecord.state);
    const verificationWebhookTiggerLogic = event.payload.proofRecord.state === ProofState.Done || event.payload.proofRecord.state === ProofState.Declined || event.payload.proofRecord.state === ProofState.Abandoned;
    if (verificationWebhookTiggerLogic) {
    }
  }));
}
function messageListener() {
  console.log(`MessageListener is started on ${this.agent.config.label}`);
  this.agent.events.on(
    BasicMessageEventTypes.BasicMessageStateChanged,
    (event) => __async(this, null, function* () {
      console.log("BasicMessageStateChangedEvent", event.payload.basicMessageRecord.role);
      if (event.payload.basicMessageRecord.role === BasicMessageRole.Receiver) {
      }
    })
  );
}
function credentialListener() {
  console.log(`CredentialListener is started on ${this.agent.config.label}`);
  this.agent.events.on(
    CredentialEventTypes.CredentialStateChanged,
    (event) => __async(this, null, function* () {
      console.log("CredentialStateChangedEvent", event.payload.credentialRecord.state);
    })
  );
}
function connectionListener() {
  console.log(`ConnectionListener is started on ${this.agent.config.label}`);
  this.agent.events.on(ConnectionEventTypes.ConnectionStateChanged, (event) => __async(this, null, function* () {
    console.log("ConnectionStateChangedEvent", event.payload.connectionRecord.state);
    const connectionWebhookTiggerLogic = event.payload.connectionRecord.state === DidExchangeState.Abandoned || event.payload.connectionRecord.state === DidExchangeState.Completed;
  }));
}

// src/lib/connection.ts
function createInvitation(options) {
  return __async(this, null, function* () {
    var _a;
    try {
      const response = yield this.agent.oob.createInvitation({
        alias: this.label,
        label: this.label,
        multiUseInvitation: (_a = options.reusable) != null ? _a : false
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
    key
  }) {
    const config = {
      label,
      walletConfig: {
        id: `issuer-wallet-${label}`,
        key
      },
      endpoints
    };
    const agent = new Agent2({
      config,
      dependencies: agentDependencies2,
      modules: AgentModule.IndyIssuer()
    });
    super({ port, label, endpoints, agent, config });
    this.initialize = initAgent.bind(this);
    // did
    this.importDidFromLedger = importDid;
    // connection
    this.createConnectionInvitation = createInvitation;
    this.getConnectionById = getConnectionById;
    // schema
    this.createSchema = createSchema;
    this.getSchemaById = getSchema;
    // credential definition
    this.createCredentialDefinition = createCredentialDefinition;
    this.getCredentialDefinitionById = getCredentialDefinition;
    // credential issuance
    this.issueCredential = offerCredential;
    this.getCredentialRecordById = getCredentialExchangeRecord;
    // proof request
    this.createProofRequest = createConnectionlessProofRequest;
    this.getProofRecordById = getProofExchangeRecord;
    this.proofListener = proofListener;
    this.messageListener = messageListener;
    this.credentialListener = credentialListener;
    this.connectionListener = connectionListener;
  }
};
export {
  Issuer
};
//# sourceMappingURL=index.mjs.map
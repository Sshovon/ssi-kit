import { AnonCredsCredentialFormatService, AnonCredsModule, AnonCredsProofFormatService } from "@credo-ts/anoncreds";
import { AskarModule } from "@credo-ts/askar";
import { AutoAcceptCredential, AutoAcceptProof, ConnectionsModule, CredentialsModule, DidsModule, ProofsModule, V2CredentialProtocol, V2ProofProtocol } from "@credo-ts/core";
import { IndyVdrAnonCredsRegistry, IndyVdrIndyDidRegistrar, IndyVdrIndyDidResolver, IndyVdrModule } from "@credo-ts/indy-vdr";
import { anoncreds } from '@hyperledger/anoncreds-nodejs'
import { ariesAskar } from '@hyperledger/aries-askar-nodejs'
import { indyVdr } from '@hyperledger/indy-vdr-nodejs'
import { IndicioDemo } from "../networks/indicio-demo";
import { BcovrinTest } from "../networks/bcovrin-test";


export const AgentModule = {
    IndyIssuer: function () {
        return {
            connections: new ConnectionsModule({
                autoAcceptConnections: true,
            }),
            credentials: new CredentialsModule({
                autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
                credentialProtocols: [
                    new V2CredentialProtocol({
                        credentialFormats: [new AnonCredsCredentialFormatService()],
                    }),
                ],
            }),
            indyVdr: new IndyVdrModule({
                indyVdr,
                networks: [BcovrinTest, IndicioDemo],
            }),
            proofs: new ProofsModule({
                autoAcceptProofs: AutoAcceptProof.ContentApproved,
                proofProtocols: [
                    new V2ProofProtocol({
                        proofFormats: [new AnonCredsProofFormatService()],
                    }),
                ],
            }),
            anoncreds: new AnonCredsModule({
                registries: [new IndyVdrAnonCredsRegistry()],
                anoncreds,
            }),
            dids: new DidsModule({
                registrars: [new IndyVdrIndyDidRegistrar()],
                resolvers: [new IndyVdrIndyDidResolver()],
            }),
            askar: new AskarModule({
                ariesAskar,
            }),

        } as const
    }
}
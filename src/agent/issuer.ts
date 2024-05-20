import { Agent, InitConfig } from "@credo-ts/core";
import { BaseAgent } from "./base";
import { AgentModule } from "../module";
import { agentDependencies } from "@credo-ts/node";
import { ConnectionlessProofRequestOptions, ConnectionlessProofRequestResponse, connectionListener, createConnectionlessProofRequest, createCredentialDefinition, createInvitation, CreateInvitationOptions, CreateInvitationResponse, createSchema, CredentialDefinitionCreateOptions, CredentialDefinitionCreateResponse, credentialListener, DidImportOptions, DidImportResponse, getConnectionById, GetConnectionByIdOptions, GetConnectionByIdResponse, getCredentialDefinition, GetCredentialDefinitionByIdOptions, GetCredentialDefinitionByIdResponse, getCredentialExchangeRecord, GetCredentialExchangeRecordOptions, GetCredentialExchangeRecordResponse, getProofExchangeRecord, GetProofExchangeRecordOptions, GetProofExchangeRecordResponse, getSchema, GetSchemaByIdOptions, GetSchemaByIdResponse, importDid, initAgent, messageListener, offerCredential, OfferCredentialOptions, OfferCredentialResponse, proofListener, SchemaCreateOptions, SchemaCreateResponse } from "../lib";

export type IssuerAgentModule = Agent<ReturnType<typeof AgentModule.IndyIssuer>>;
export class Issuer extends BaseAgent {

    public constructor({
        port,
        label,
        endpoints = [],
        key,
    }: {
        port: number;
        label: string;
        endpoints: string[];
        key: string;
    }) {

        const config = {
            label,
            walletConfig: {
                id: `issuer-wallet-${label}`,
                key,
            },
            endpoints,
        } satisfies InitConfig
        const agent = new Agent({
            config,
            dependencies: agentDependencies,
            modules: AgentModule.IndyIssuer(),
        })
        super({ port, label, endpoints, agent, config });
    }

    public initialize: () => Promise<void> = initAgent.bind(this)

    // did
    public importDidFromLedger: (options: DidImportOptions) => Promise<DidImportResponse> = importDid
    // connection
    public createConnectionInvitation: (options: CreateInvitationOptions) => Promise<CreateInvitationResponse> = createInvitation
    public getConnectionById: (options: GetConnectionByIdOptions) => Promise<GetConnectionByIdResponse> = getConnectionById
    // schema
    public createSchema: (options: SchemaCreateOptions) => Promise<SchemaCreateResponse> = createSchema
    public getSchemaById: (options: GetSchemaByIdOptions) => Promise<GetSchemaByIdResponse> = getSchema
    // credential definition
    public createCredentialDefinition: (options: CredentialDefinitionCreateOptions) => Promise<CredentialDefinitionCreateResponse> = createCredentialDefinition
    public getCredentialDefinitionById: (options: GetCredentialDefinitionByIdOptions) => Promise<GetCredentialDefinitionByIdResponse> = getCredentialDefinition
    // credential issuance
    public issueCredential: (options: OfferCredentialOptions) => Promise<OfferCredentialResponse> = offerCredential
    public getCredentialRecordById: (options: GetCredentialExchangeRecordOptions) => Promise<GetCredentialExchangeRecordResponse> = getCredentialExchangeRecord
    // proof request
    public createProofRequest: (options: ConnectionlessProofRequestOptions) => Promise<ConnectionlessProofRequestResponse> = createConnectionlessProofRequest
    public getProofRecordById: (options: GetProofExchangeRecordOptions) => Promise<GetProofExchangeRecordResponse> = getProofExchangeRecord

    protected proofListener: () => void = proofListener
    protected messageListener: () => void = messageListener
    protected credentialListener: () => void = credentialListener
    protected connectionListener: () => void = connectionListener
}


async function main() {
    const issuer = new Issuer({ port: 3001, label: 'issuer', endpoints: [], key: "1234" })
    await issuer.initialize()
    await issuer.importDidFromLedger({
        did: 'did:indy:bcovrin:test:HTYnVHNExB8qjMh8otSz4X',
        seed: 'ssiatm00000000000000000000000000'
    })
}


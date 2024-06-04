import { Agent, InitConfig } from "@credo-ts/core";
import { BaseAgent } from "./base";
import { AgentModule } from "../module";
import { agentDependencies } from "@credo-ts/node";
import { connectionListener, createConnectionlessProofRequest, createCredentialDefinition, createInvitation, createSchema, credentialListener, getConnectionById, getCredentialDefinition, getCredentialExchangeRecord, getProofExchangeRecord, getSchema, importDid, initAgent, messageListener, offerCredential, proofListener } from "../lib";
import { ConnectionlessProofRequestOptions, ConnectionlessProofRequestResponse, CreateInvitationOptions, CreateInvitationResponse, CredentialDefinitionCreateOptions, CredentialDefinitionCreateResponse, DidImportOptions, DidImportResponse, GetConnectionByIdOptions, GetConnectionByIdResponse, GetCredentialDefinitionByIdOptions, GetCredentialDefinitionByIdResponse, GetCredentialExchangeRecordOptions, GetCredentialExchangeRecordResponse, GetProofExchangeRecordOptions, GetProofExchangeRecordResponse, GetSchemaByIdOptions, GetSchemaByIdResponse, ListernerCbs, OfferCredentialOptions, OfferCredentialResponse, SchemaCreateOptions, SchemaCreateResponse } from "../types";

export type IssuerAgentModule = Agent<ReturnType<typeof AgentModule.IndyIssuer>>;
export class Issuer extends BaseAgent {
    public constructor({
        port,
        label,
        endpoints = [],
        key,
        listenerCbs
    }: {
        port: number;
        label: string;
        endpoints: string[];
        key: string;
        listenerCbs: ListernerCbs
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
        super({ port, label, endpoints, agent, config, listenerCbs });
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

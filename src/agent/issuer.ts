import { Agent, InitConfig } from "@credo-ts/core";
import { BaseAgent } from "./base";
import { AgentModule } from "../module";
import { agentDependencies } from "@credo-ts/node";
import { connectionListener, createConnectionlessProofRequest, createCredentialDefinition, createInvitation, createSchema, credentialListener, getConnectionById, getCreatedCredentialDefinitions, getCreatedSchemas, getCredentialDefinitionFromLedger, getCredentialExchangeRecord, getPresentationData, getProofExchangeRecord, getSchemaFromLedger, getWalletDids, importDid, initAgent, messageListener, offerCredential, proofListener } from "../lib";
import { ConnectionlessProofRequestOptions, ConnectionlessProofRequestResponse, CreateInvitationOptions, CreateInvitationResponse, CredentialDefinitionCreateOptions, CredentialDefinitionCreateResponse, DidImportOptions, DidImportResponse, GetConnectionByIdOptions, GetConnectionByIdResponse, GetCreatedCredentialDefinitionsOptions, GetCreatedCredentialDefinitionsResponse, GetCreatedSchemasOptions, GetCreatedSchemasResponse, GetCredentialDefinitionByIdOptions, GetCredentialDefinitionByIdResponse, GetCredentialExchangeRecordOptions, GetCredentialExchangeRecordResponse, GetPresentationDataOptions, GetPresentationDataResponse, GetProofExchangeRecordOptions, GetProofExchangeRecordResponse, GetSchemaByIdOptions, GetSchemaByIdResponse, GetWalletDidsOptions, GetWalletDidsResponse, ListernerCbs, OfferCredentialOptions, OfferCredentialResponse, SchemaCreateOptions, SchemaCreateResponse } from "../types";

export type IssuerAgentModule = Agent<ReturnType<typeof AgentModule.IndyIssuer>>;
export class Issuer extends BaseAgent {
    public constructor({
        port,
        label,
        endpoints = [],
        key,
        listenerCbs,
        sqliteConfig
    }: {
        port: number;
        label: string;
        endpoints: string[];
        key: string;
        listenerCbs: ListernerCbs,
        sqliteConfig?: {
            path?: string
            inMemory?: boolean
        }
    }) {
        
        const config = {
            label,
            walletConfig: {
                id: `issuer-wallet-${label}`,
                key,
                storage: {
                    type: "sqlite",
                    path: sqliteConfig?.path ?? undefined,
                    inMemory: sqliteConfig?.inMemory
                }
            },
            endpoints,
        } satisfies InitConfig
        console.log(config)
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
    public getPublicDids: (options: GetWalletDidsOptions) => Promise<GetWalletDidsResponse> = getWalletDids
    // connection
    public createConnectionInvitation: (options: CreateInvitationOptions) => Promise<CreateInvitationResponse> = createInvitation
    public getConnectionById: (options: GetConnectionByIdOptions) => Promise<GetConnectionByIdResponse> = getConnectionById
    // schema
    public createSchema: (options: SchemaCreateOptions) => Promise<SchemaCreateResponse> = createSchema
    public retriveSchemaFromLedgerById: (options: GetSchemaByIdOptions) => Promise<GetSchemaByIdResponse> = getSchemaFromLedger
    public getSchemasFromWallet: (options: GetCreatedSchemasOptions) => Promise<GetCreatedSchemasResponse> = getCreatedSchemas
    // credential definition
    public createCredentialDefinition: (options: CredentialDefinitionCreateOptions) => Promise<CredentialDefinitionCreateResponse> = createCredentialDefinition
    public getCredentialDefintionsFromWallet: (options: GetCreatedCredentialDefinitionsOptions) => Promise<GetCreatedCredentialDefinitionsResponse> = getCreatedCredentialDefinitions
    public retrieveCredentialDefinitionFromLedgerById: (options: GetCredentialDefinitionByIdOptions) => Promise<GetCredentialDefinitionByIdResponse> = getCredentialDefinitionFromLedger
    // credential issuance
    public issueCredential: (options: OfferCredentialOptions) => Promise<OfferCredentialResponse> = offerCredential
    public getCredentialRecordById: (options: GetCredentialExchangeRecordOptions) => Promise<GetCredentialExchangeRecordResponse> = getCredentialExchangeRecord
    // proof request
    public createProofRequest: (options: ConnectionlessProofRequestOptions) => Promise<ConnectionlessProofRequestResponse> = createConnectionlessProofRequest
    public getProofRecordById: (options: GetProofExchangeRecordOptions) => Promise<GetProofExchangeRecordResponse> = getProofExchangeRecord
    public getPresentationData: (options: GetPresentationDataOptions) => Promise<GetPresentationDataResponse> = getPresentationData

    protected proofListener: () => void = proofListener
    protected messageListener: () => void = messageListener
    protected credentialListener: () => void = credentialListener
    protected connectionListener: () => void = connectionListener
}

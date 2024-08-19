import { ConnectionsModule, CredentialsModule, V2CredentialProtocol, ProofsModule, V2ProofProtocol, DidsModule, ConnectionRecord, LinkedAttachment, CredentialExchangeRecord, ProofExchangeRecord, GetProofFormatDataReturn, ConnectionStateChangedEvent, CredentialStateChangedEvent, ProofStateChangedEvent, InitConfig, Agent } from '@credo-ts/core';
import { AnonCredsCredentialFormatService, AnonCredsProofFormatService, AnonCredsModule, AnonCredsSchema, AnonCredsCredentialDefinition, AnonCredsProofFormat, AnonCredsRequestedAttribute, AnonCredsRequestedPredicate, AnonCredsNonRevokedInterval } from '@credo-ts/anoncreds';
import { AskarModule } from '@credo-ts/askar';
import { IndyVdrModule } from '@credo-ts/indy-vdr';
import { PlaintextMessage } from '@credo-ts/core/build/types';

declare const AgentModule: {
    IndyIssuer: () => {
        readonly connections: ConnectionsModule;
        readonly credentials: CredentialsModule<V2CredentialProtocol<AnonCredsCredentialFormatService[]>[]>;
        readonly indyVdr: IndyVdrModule;
        readonly proofs: ProofsModule<V2ProofProtocol<AnonCredsProofFormatService[]>[]>;
        readonly anoncreds: AnonCredsModule;
        readonly dids: DidsModule;
        readonly askar: AskarModule;
    };
};

type DidImportOptions = {
    did: string;
    seed: string;
};
type DidImportResponse = {
    success: boolean;
    message?: string;
};
type GetWalletDidsOptions = {
    method?: string;
    did?: string;
};
type GetWalletDidsResponse = {
    dids: string[];
};
type CreateInvitationOptions = {
    alias?: string;
    label?: string;
    reusable?: boolean;
};
type CreateInvitationResponse = {
    invitationUrl: string;
    invitationJson: PlaintextMessage;
    oobId: string;
};
type GetConnectionByIdOptions = {
    connectionId?: string;
    oobId?: string;
};
type GetConnectionByIdResponse = {
    record: ConnectionRecord;
};
type SchemaCreateOptions = {
    did: string;
    name: string;
    version: string;
    attributes: string[];
};
type SchemaCreateResponse = {
    schemaId?: string;
    state: string;
    schema?: AnonCredsSchema;
};
type GetSchemaByIdOptions = {
    schemaId: string;
};
type GetSchemaByIdResponse = {
    schemaId: string;
    schema?: AnonCredsSchema;
};
type GetCreatedSchemasOptions = {
    schemaId?: string;
};
type GetCreatedSchemasResponse = GetSchemaByIdResponse[];
type GetCredentialDefinitionByIdOptions = {
    credentialDefinitionId: string;
};
type GetCredentialDefinitionByIdResponse = {
    credentialDefinitionId: string;
    credentialDefinition?: AnonCredsCredentialDefinition;
};
type GetCreatedCredentialDefinitionsOptions = {
    credentialDefinitionId?: string;
};
type GetCreatedCredentialDefinitionsResponse = GetCredentialDefinitionByIdResponse[];
type CredentialDefinitionCreateOptions = {
    schemaId: string;
    tag: string;
    did: string;
};
type CredentialDefinitionCreateResponse = {
    credentialDefinitionId?: string;
    state: string;
};
type OfferCredentialOptions = {
    credentialDefinitionId: string;
    connectionId: string;
    attributes: {
        name: string;
        value: string;
        mimeType?: string;
    }[];
    comment?: string;
    linkedAttachments?: LinkedAttachment[];
};
type OfferCredentialResponse = {
    credentialExchangeRecordId: string;
    state: string;
};
type GetCredentialExchangeRecordOptions = {
    credentialExchangeRecordId: string;
};
type GetCredentialExchangeRecordResponse = CredentialExchangeRecord;
type GetProofExchangeRecordOptions = {
    presentationExchangeRecordId: string;
};
type GetProofExchangeRecordResponse = {
    presentationExchangeRecordId: string;
    state: string;
    isVerified: boolean;
    record: ProofExchangeRecord;
};
type GetPresentationDataOptions = GetProofExchangeRecordOptions;
type GetPresentationDataResponse = GetProofFormatDataReturn<AnonCredsProofFormat[]>;
type ConnectionlessProofRequestOptions = Omit<ProofRequestCreateOptions, 'connectionId'> & {
    label?: string;
    alias?: string;
    domain: string;
};
type ConnectionlessProofRequestResponse = {
    presentationExchangeRecordId: string;
    invitationJson: PlaintextMessage;
    state: string;
    invitationUrl: string;
};
type ProofRequestCreateOptions = {
    presentationRequestLabel: string;
    presentationRequestVersion: string;
    connectionId: string;
    requested_attributes?: Record<string, AnonCredsRequestedAttribute>;
    requested_predicates?: Record<string, AnonCredsRequestedPredicate>;
    non_revoked?: AnonCredsNonRevokedInterval;
};
type ProofRequestCreateResponse = {
    presentationExchangeRecordId: string;
    state: string;
};
interface ListernerCbs {
    connection?: ConnectionCb;
    credential?: CredentialCb;
    proof?: ProofCb;
}
type ConnectionCb = (event: ConnectionStateChangedEvent) => void | Promise<void>;
type CredentialCb = (event: CredentialStateChangedEvent) => void | Promise<void>;
type ProofCb = (event: ProofStateChangedEvent) => void | Promise<void>;

type IndyAgentModule = Agent<ReturnType<typeof AgentModule.IndyIssuer>>;
declare abstract class BaseAgent {
    protected port: number;
    protected label: string;
    protected readonly config: InitConfig;
    endpoints: string[];
    protected agent: IndyAgentModule | Agent;
    protected listenerCbs: ListernerCbs;
    private app;
    constructor({ port, label, endpoints, agent, config, listenerCbs }: {
        port: number;
        label: string;
        endpoints: string[];
        agent: IndyAgentModule;
        config: InitConfig;
        listenerCbs: ListernerCbs;
    });
    abstract initialize(): Promise<void>;
    protected abstract proofListener(): void;
    protected abstract messageListener(): void;
    protected abstract credentialListener(): void;
    protected abstract connectionListener(): void;
}

declare class Issuer extends BaseAgent {
    constructor({ port, label, endpoints, key, listenerCbs }: {
        port: number;
        label: string;
        endpoints: string[];
        key: string;
        listenerCbs: ListernerCbs;
    });
    initialize: () => Promise<void>;
    importDidFromLedger: (options: DidImportOptions) => Promise<DidImportResponse>;
    getPublicDids: (options: GetWalletDidsOptions) => Promise<GetWalletDidsResponse>;
    createConnectionInvitation: (options: CreateInvitationOptions) => Promise<CreateInvitationResponse>;
    getConnectionById: (options: GetConnectionByIdOptions) => Promise<GetConnectionByIdResponse>;
    createSchema: (options: SchemaCreateOptions) => Promise<SchemaCreateResponse>;
    retriveSchemaFromLedgerById: (options: GetSchemaByIdOptions) => Promise<GetSchemaByIdResponse>;
    getSchemasFromWallet: (options: GetCreatedSchemasOptions) => Promise<GetCreatedSchemasResponse>;
    createCredentialDefinition: (options: CredentialDefinitionCreateOptions) => Promise<CredentialDefinitionCreateResponse>;
    getCredentialDefintionsFromWallet: (options: GetCreatedCredentialDefinitionsOptions) => Promise<GetCreatedCredentialDefinitionsResponse>;
    retrieveCredentialDefinitionFromLedgerById: (options: GetCredentialDefinitionByIdOptions) => Promise<GetCredentialDefinitionByIdResponse>;
    issueCredential: (options: OfferCredentialOptions) => Promise<OfferCredentialResponse>;
    getCredentialRecordById: (options: GetCredentialExchangeRecordOptions) => Promise<GetCredentialExchangeRecordResponse>;
    createProofRequest: (options: ConnectionlessProofRequestOptions) => Promise<ConnectionlessProofRequestResponse>;
    getProofRecordById: (options: GetProofExchangeRecordOptions) => Promise<GetProofExchangeRecordResponse>;
    getPresentationData: (options: GetPresentationDataOptions) => Promise<GetPresentationDataResponse>;
    protected proofListener: () => void;
    protected messageListener: () => void;
    protected credentialListener: () => void;
    protected connectionListener: () => void;
}

export { type ConnectionlessProofRequestOptions, type ConnectionlessProofRequestResponse, type CreateInvitationOptions, type CreateInvitationResponse, type CredentialDefinitionCreateOptions, type CredentialDefinitionCreateResponse, type DidImportOptions, type DidImportResponse, type GetConnectionByIdOptions, type GetConnectionByIdResponse, type GetCreatedCredentialDefinitionsOptions, type GetCreatedCredentialDefinitionsResponse, type GetCreatedSchemasOptions, type GetCreatedSchemasResponse, type GetCredentialDefinitionByIdOptions, type GetCredentialDefinitionByIdResponse, type GetCredentialExchangeRecordOptions, type GetCredentialExchangeRecordResponse, type GetPresentationDataOptions, type GetPresentationDataResponse, type GetProofExchangeRecordOptions, type GetProofExchangeRecordResponse, type GetSchemaByIdOptions, type GetSchemaByIdResponse, type GetWalletDidsOptions, type GetWalletDidsResponse, Issuer, type ListernerCbs, type OfferCredentialOptions, type OfferCredentialResponse, type ProofRequestCreateOptions, type ProofRequestCreateResponse, type SchemaCreateOptions, type SchemaCreateResponse };

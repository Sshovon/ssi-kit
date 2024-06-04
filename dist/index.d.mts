import { ConnectionsModule, CredentialsModule, V2CredentialProtocol, ProofsModule, V2ProofProtocol, DidsModule, InitConfig, Agent, ConnectionRecord, LinkedAttachment, CredentialExchangeRecord, ProofExchangeRecord } from '@credo-ts/core';
import { AnonCredsCredentialFormatService, AnonCredsProofFormatService, AnonCredsModule, AnonCredsSchema, AnonCredsCredentialDefinition, AnonCredsRequestedAttribute, AnonCredsRequestedPredicate, AnonCredsNonRevokedInterval } from '@credo-ts/anoncreds';
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

type IndyAgentModule = Agent<ReturnType<typeof AgentModule.IndyIssuer>>;
declare abstract class BaseAgent {
    protected port: number;
    protected label: string;
    protected readonly config: InitConfig;
    endpoints: string[];
    protected agent: IndyAgentModule | Agent;
    constructor({ port, label, endpoints, agent, config, }: {
        port: number;
        label: string;
        endpoints: string[];
        agent: IndyAgentModule;
        config: InitConfig;
    });
    abstract initialize(): Promise<void>;
    protected abstract proofListener(): void;
    protected abstract messageListener(): void;
    protected abstract credentialListener(): void;
    protected abstract connectionListener(): void;
}

type DidImportOptions = {
    did: string;
    seed: string;
};
type DidImportResponse = {
    success: boolean;
    message?: string;
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
type GetCredentialDefinitionByIdOptions = {
    credentialDefinitionId: string;
};
type GetCredentialDefinitionByIdResponse = {
    credentialDefinitionId: string;
    credentialDefinition?: AnonCredsCredentialDefinition;
};
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

declare class Issuer extends BaseAgent {
    constructor({ port, label, endpoints, key, }: {
        port: number;
        label: string;
        endpoints: string[];
        key: string;
    });
    initialize: () => Promise<void>;
    importDidFromLedger: (options: DidImportOptions) => Promise<DidImportResponse>;
    createConnectionInvitation: (options: CreateInvitationOptions) => Promise<CreateInvitationResponse>;
    getConnectionById: (options: GetConnectionByIdOptions) => Promise<GetConnectionByIdResponse>;
    createSchema: (options: SchemaCreateOptions) => Promise<SchemaCreateResponse>;
    getSchemaById: (options: GetSchemaByIdOptions) => Promise<GetSchemaByIdResponse>;
    createCredentialDefinition: (options: CredentialDefinitionCreateOptions) => Promise<CredentialDefinitionCreateResponse>;
    getCredentialDefinitionById: (options: GetCredentialDefinitionByIdOptions) => Promise<GetCredentialDefinitionByIdResponse>;
    issueCredential: (options: OfferCredentialOptions) => Promise<OfferCredentialResponse>;
    getCredentialRecordById: (options: GetCredentialExchangeRecordOptions) => Promise<GetCredentialExchangeRecordResponse>;
    createProofRequest: (options: ConnectionlessProofRequestOptions) => Promise<ConnectionlessProofRequestResponse>;
    getProofRecordById: (options: GetProofExchangeRecordOptions) => Promise<GetProofExchangeRecordResponse>;
    protected proofListener: () => void;
    protected messageListener: () => void;
    protected credentialListener: () => void;
    protected connectionListener: () => void;
}

export { type ConnectionlessProofRequestOptions, type ConnectionlessProofRequestResponse, type CreateInvitationOptions, type CreateInvitationResponse, type CredentialDefinitionCreateOptions, type CredentialDefinitionCreateResponse, type DidImportOptions, type DidImportResponse, type GetConnectionByIdOptions, type GetConnectionByIdResponse, type GetCredentialDefinitionByIdOptions, type GetCredentialDefinitionByIdResponse, type GetCredentialExchangeRecordOptions, type GetCredentialExchangeRecordResponse, type GetProofExchangeRecordOptions, type GetProofExchangeRecordResponse, type GetSchemaByIdOptions, type GetSchemaByIdResponse, Issuer, type OfferCredentialOptions, type OfferCredentialResponse, type ProofRequestCreateOptions, type ProofRequestCreateResponse, type SchemaCreateOptions, type SchemaCreateResponse };

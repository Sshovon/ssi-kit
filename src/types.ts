import { AnonCredsCredentialDefinition, AnonCredsNonRevokedInterval, AnonCredsProofFormat, AnonCredsRequestedAttribute, AnonCredsRequestedPredicate, AnonCredsSchema } from "@credo-ts/anoncreds"
import { ConnectionRecord, CredentialExchangeRecord, LinkedAttachment, ProofExchangeRecord, ConnectionStateChangedEvent, CredentialStateChangedEvent, Proof, ProofStateChangedEvent, GetProofFormatDataReturn } from "@credo-ts/core"
import { PlaintextMessage } from "@credo-ts/core/build/types"

export type DidImportOptions = {
    did: string
    seed: string
}
export type DidImportResponse = {
    success: boolean
    message?: string
}

export type GetWalletDidsOptions = {
    method?: string
    did?: string
}
export type GetWalletDidsResponse = {
    dids: string[]
}
export type CreateInvitationOptions = {
    alias?: string;
    label?: string;
    reusable?: boolean;
};
export type CreateInvitationResponse = {
    invitationUrl: string;
    invitationJson: PlaintextMessage;
    oobId: string;
}
export type GetConnectionByIdOptions = {
    connectionId?: string;
    oobId?: string;
};
export type GetConnectionByIdResponse = {
    record: ConnectionRecord;
};
export type SchemaCreateOptions = {
    did: string
    name: string
    version: string
    attributes: string[]

}
export type SchemaCreateResponse = {
    schemaId?: string
    state: string
    schema?: AnonCredsSchema
}
export type GetSchemaByIdOptions = {
    schemaId: string
}
export type GetSchemaByIdResponse = {
    schemaId: string
    schema?: AnonCredsSchema
}
export type GetCreatedSchemasOptions = {
    schemaId?: string
}
export type GetCreatedSchemasResponse = GetSchemaByIdResponse[]

export type GetCredentialDefinitionByIdOptions = {
    credentialDefinitionId: string
}
export type GetCredentialDefinitionByIdResponse = {
    credentialDefinitionId: string
    credentialDefinition?: AnonCredsCredentialDefinition
}
export type GetCreatedCredentialDefinitionsOptions = {
    credentialDefinitionId?: string
}
export type GetCreatedCredentialDefinitionsResponse = GetCredentialDefinitionByIdResponse[]

export type CredentialDefinitionCreateOptions = {
    schemaId: string
    tag: string
    did: string
}

export type CredentialDefinitionCreateResponse = {
    credentialDefinitionId?: string
    state: string
}

export type OfferCredentialOptions = {
    credentialDefinitionId: string
    connectionId: string
    attributes: {
        name: string
        value: string
        mimeType?: string
    }[],
    comment?: string
    linkedAttachments?: LinkedAttachment[]
}
export type OfferCredentialResponse = {
    credentialExchangeRecordId: string
    state: string
}

export type GetCredentialExchangeRecordOptions = {
    credentialExchangeRecordId: string
}
export type GetCredentialExchangeRecordResponse = CredentialExchangeRecord

export type GetProofExchangeRecordOptions = {
    presentationExchangeRecordId: string
}
export type GetProofExchangeRecordResponse = {
    presentationExchangeRecordId: string;
    state: string;
    isVerified: boolean;
    record: ProofExchangeRecord;
}
export type GetPresentationDataOptions = GetProofExchangeRecordOptions
export type GetPresentationDataResponse = GetProofFormatDataReturn<AnonCredsProofFormat[]>

export type ConnectionlessProofRequestOptions = Omit<SendProofRequestOptions, 'connectionId'> & { label?: string, alias?: string, domain: string }
export type ConnectionlessProofRequestResponse = {
    presentationExchangeRecordId: string;
    invitationJson: PlaintextMessage
    state: string;
    invitationUrl: string;
};

export type SendProofRequestOptions = {
    presentationRequestLabel: string;
    presentationRequestVersion: string;
    connectionId: string;
    requested_attributes?: Record<string, AnonCredsRequestedAttribute>;
    requested_predicates?: Record<string, AnonCredsRequestedPredicate>;
    non_revoked?: AnonCredsNonRevokedInterval;
}

export type SendProofRequestResponse = {
    presentationExchangeRecordId: string;
    state: string;
}

export interface ListernerCbs {
    connection?: ConnectionCb,
    credential?: CredentialCb,
    proof?: ProofCb,
}

type ConnectionCb = (event: ConnectionStateChangedEvent) => void | Promise<void>;
type CredentialCb = (event: CredentialStateChangedEvent) => void | Promise<void>;
type ProofCb = (event: ProofStateChangedEvent) => void | Promise<void>;
import { AnonCredsNonRevokedInterval, AnonCredsRequestedAttribute, AnonCredsRequestedPredicate } from "@credo-ts/anoncreds";
import { Issuer } from "../agent/issuer";
import { PlaintextMessage } from "@credo-ts/core/build/types";
import { ProofExchangeRecord } from "@credo-ts/core";

export type ProofRequestCreateOptions = {
    presentationRequestLabel: string;
    presentationRequestVersion: string;
    connectionId: string;
    requested_attributes?: Record<string, AnonCredsRequestedAttribute>;
    requested_predicates?: Record<string, AnonCredsRequestedPredicate>;
    non_revoked?: AnonCredsNonRevokedInterval;
}

export type ProofRequestCreateResponse = {
    presentationExchangeRecordId: string;
    state: string;
}
export async function createProofRequest(this: Issuer, options: ProofRequestCreateOptions): Promise<ProofRequestCreateResponse> {
    try {

        const proofConfig: any = {
            name: options.presentationRequestLabel,
            version: options.presentationRequestVersion,
        }
        if (options.requested_attributes) {
            proofConfig.requestedAttributes = options.requested_attributes
        }
        if (options.requested_predicates) {
            proofConfig.requestedPredicates = options.requested_predicates
        }
        if (options.non_revoked) {
            proofConfig.nonRevoked = options.non_revoked
        }
        const response = await this.agent.proofs.requestProof({
            protocolVersion: 'v2',
            connectionId: options.connectionId,
            proofFormats: {
                anoncreds: proofConfig
            },
        });
        return {
            presentationExchangeRecordId: response.id,
            state: response.state,
        }

    } catch (e) {
        throw new Error((e as Error).message)
    }
}

export type ConnectionlessProofRequestOptions = Omit<ProofRequestCreateOptions, 'connectionId'> & { label?: string, alias?: string, domain: string }
export type ConnectionlessProofRequestResponse = {
    presentationExchangeRecordId: string;
    invitationJson: PlaintextMessage
    state: string;
    invitationUrl: string;
};

export async function createConnectionlessProofRequest(this: Issuer, options: ConnectionlessProofRequestOptions): Promise<ConnectionlessProofRequestResponse> {
    try {
        const proofConfig: any = {
            name: options.presentationRequestLabel,
            version: options.presentationRequestVersion,
        }
        if (options.requested_attributes) {
            proofConfig.requestedAttributes = options.requested_attributes
        }
        if (options.requested_predicates) {
            proofConfig.requestedPredicates = options.requested_predicates
        }
        if (options.non_revoked) {
            proofConfig.nonRevoked = options.non_revoked
        }
        const { message, proofRecord } = await this.agent.proofs.createRequest({
            protocolVersion: 'v2',
            proofFormats: {
                anoncreds: proofConfig
            },
        });

        const oobInvitationRecord = await this.agent.oob.createInvitation({
            alias: options.alias,
            label: options.label,
            handshake: false,
            messages: [message],
        })

        const invitationUrl = oobInvitationRecord.outOfBandInvitation.toUrl({
            domain: options.domain
        })
        const invitationJson = oobInvitationRecord.outOfBandInvitation.toJSON()

        return {
            presentationExchangeRecordId: proofRecord.id,
            invitationJson,
            state: proofRecord.state,
            invitationUrl
        }

    } catch (e) {
        throw new Error((e as Error).message)
    }
}

export type GetProofExchangeRecordOptions = {
    presentationExchangeRecordId: string
}
export type GetProofExchangeRecordResponse = {
    presentationExchangeRecordId: string;
    state: string;
    isVerified: boolean;
    record: ProofExchangeRecord;
}

export async function getProofExchangeRecord(this: Issuer, options: GetProofExchangeRecordOptions): Promise<GetProofExchangeRecordResponse> {
    try {
        const response = await this.agent.proofs.getById(options.presentationExchangeRecordId)
        return {
            presentationExchangeRecordId: response.id,
            state: response.state,
            isVerified: response.isVerified ?? false,
            record: response

        }
    } catch (e) {
        throw new Error((e as Error).message)
    }
}
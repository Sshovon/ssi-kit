import { AnonCredsProofFormat } from "@credo-ts/anoncreds";
import { Issuer } from "../agent/issuer";
import { ConnectionlessProofRequestOptions, ConnectionlessProofRequestResponse, GetPresentationDataOptions, GetPresentationDataResponse, GetProofExchangeRecordOptions, GetProofExchangeRecordResponse, ProofRequestCreateOptions, ProofRequestCreateResponse } from "../types";
import { GetProofFormatDataReturn } from "@credo-ts/core";

export async function createProofRequest(this: Issuer, options: ProofRequestCreateOptions): Promise<ProofRequestCreateResponse> {
    try {

        const proofConfig: any = {
            name: options.presentationRequestLabel,
            version: options.presentationRequestVersion,
        }
        if (options.requested_attributes) {
            proofConfig.requested_attributes = options.requested_attributes
        }
        if (options.requested_predicates) {
            proofConfig.requested_predicates = options.requested_predicates
        }
        if (options.non_revoked) {
            proofConfig.non_revoked = options.non_revoked
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


export async function createConnectionlessProofRequest(this: Issuer, options: ConnectionlessProofRequestOptions): Promise<ConnectionlessProofRequestResponse> {
    try {
        const proofConfig: any = {
            name: options.presentationRequestLabel,
            version: options.presentationRequestVersion,
        }
        if (options.requested_attributes) {
            proofConfig.requested_attributes = options.requested_attributes
        }
        if (options.requested_predicates) {
            proofConfig.requested_predicates = options.requested_predicates
        }
        if (options.non_revoked) {
            proofConfig.non_revoked = options.non_revoked
        }

        const { message, proofRecord } = await this.agent.proofs.createRequest({
            protocolVersion: 'v2',
            proofFormats: {
                anoncreds: proofConfig
            },
        });

        const oobInvitationRecord = await this.agent.oob.createInvitation({
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

export async function getPresentationData(this: Issuer, options: GetPresentationDataOptions): Promise<GetPresentationDataResponse> {
    try {
        const response = await this.agent.proofs.getFormatData(options.presentationExchangeRecordId)
        return response
    } catch (e) {
        throw new Error((e as Error).message)
    }
}
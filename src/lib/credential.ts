import { CredentialExchangeRecord, LinkedAttachment } from "@credo-ts/core"
import { Issuer, IssuerAgentModule } from "../agent/issuer"

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

// anoncreds credential
export async function offerCredential(this: Issuer, options: OfferCredentialOptions): Promise<OfferCredentialResponse> {
    try {
        const response = await (this.agent as IssuerAgentModule).credentials.offerCredential({
            connectionId: options.connectionId,
            protocolVersion: 'v2',
            credentialFormats: {
                anoncreds: {
                    attributes: options.attributes,
                    credentialDefinitionId: options.credentialDefinitionId,
                    linkedAttachments: options.linkedAttachments
                }
            }
        })
        return {
            credentialExchangeRecordId: response.id,
            state: response.state
        }
    } catch (e) {
        throw new Error((e as Error).message)
    }
}

export type GetCredentialExchangeRecordOptions = {
    credentialExchangeRecordId: string
}
export type GetCredentialExchangeRecordResponse = CredentialExchangeRecord

export async function getCredentialExchangeRecord(this: Issuer, options: GetCredentialExchangeRecordOptions): Promise<GetCredentialExchangeRecordResponse> {
    try {
        const response = await (this.agent as IssuerAgentModule).credentials.getById(options.credentialExchangeRecordId)
        return response
    } catch (e) {
        throw new Error((e as Error).message)
    }
}
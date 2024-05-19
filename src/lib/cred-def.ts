import { IndyVdrRegisterCredentialDefinitionOptions } from "@credo-ts/indy-vdr";
import { Issuer, IssuerAgentModule } from "../agent/issuer";
import { AnonCredsCredentialDefinition } from "@credo-ts/anoncreds";


export type CredentialDefinitionCreateOptions = {
    schemaId: string
    tag: string
    did: string
}

export type CredentialDefinitionCreateResponse = {
    credentialDefinitionId?: string
    state: string
}

// only support internal endorsement
export async function createCredentialDefinition(this: Issuer, options: CredentialDefinitionCreateOptions): Promise<CredentialDefinitionCreateResponse> {
    try {
        const response = await (this.agent as IssuerAgentModule).modules.anoncreds.registerCredentialDefinition<IndyVdrRegisterCredentialDefinitionOptions>({
            credentialDefinition: {
                schemaId: options.schemaId,
                tag: options.tag,
                issuerId: options.did

            },
            options: {
                endorserMode: 'internal',
                endorserDid: options.did,
                supportRevocation: false
            }
        })
        return {
            credentialDefinitionId: response.credentialDefinitionState.credentialDefinitionId,
            state: response.credentialDefinitionState.state
        }

    } catch (e) {
        throw new Error((e as Error).message)
    }
}

export type GetCredentialDefinitionByIdOptions = {
    credentialDefinitionId: string
}
export type GetCredentialDefinitionByIdResponse = {
    credentialDefinitionId: string
    credentialDefinition?: AnonCredsCredentialDefinition
}
export async function getCredentialDefinition(this: Issuer, options: GetCredentialDefinitionByIdOptions): Promise<GetCredentialDefinitionByIdResponse> {
    try {
        const response = await (this.agent as IssuerAgentModule).modules.anoncreds.getCredentialDefinition(options.credentialDefinitionId)
        return {
            credentialDefinitionId: response.credentialDefinitionId,
            credentialDefinition: response.credentialDefinition
        }
    } catch (e) {
        throw new Error((e as Error).message)
    }
}

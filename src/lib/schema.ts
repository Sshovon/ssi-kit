import { IndyVdrRegisterSchemaOptions } from "@credo-ts/indy-vdr";
import { Issuer, IssuerAgentModule } from "../agent/issuer";
import { AnonCredsSchema } from "@credo-ts/anoncreds";

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
// only support internal endorsement
export async function createSchema(this: Issuer, options: SchemaCreateOptions): Promise<SchemaCreateResponse> {
    try {
        const response = await (this.agent as IssuerAgentModule).modules.anoncreds.registerSchema<IndyVdrRegisterSchemaOptions>({
            schema: {
                name: options.name,
                version: options.version,
                attrNames: options.attributes,
                issuerId: options.did,
            },
            options: {
                endorserMode: 'internal',
                endorserDid: options.did,
            }
        })
        return {
            schemaId: response.schemaState.schemaId,
            state: response.schemaState.state,
            schema: response.schemaState.schema
        }

    } catch (e) {
        throw new Error((e as Error).message)
    }
}

export type GetSchemaByIdOptions = {
    schemaId: string
}
export type GetSchemaByIdResponse = {
    schemaId: string
    schema?: AnonCredsSchema
}
export async function getSchema(this: Issuer, options: GetSchemaByIdOptions): Promise<GetSchemaByIdResponse> {
    try {
        const response = await (this.agent as IssuerAgentModule).modules.anoncreds.getSchema(options.schemaId)
        return {
            schemaId: response.schemaId,
            schema: response.schema
        }
    } catch (e) {
        throw new Error((e as Error).message)
    }
}
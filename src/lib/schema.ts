import { IndyVdrRegisterSchemaOptions } from "@credo-ts/indy-vdr";
import { Issuer, IssuerAgentModule } from "../agent/issuer";
import { GetCreatedSchemasOptions, GetCreatedSchemasResponse, GetSchemaByIdOptions, GetSchemaByIdResponse, SchemaCreateOptions, SchemaCreateResponse } from "../types";

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

export async function getSchemaFromLedger(this: Issuer, options: GetSchemaByIdOptions): Promise<GetSchemaByIdResponse> {
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
export async function getCreatedSchemas(this: Issuer, options: GetCreatedSchemasOptions): Promise<GetCreatedSchemasResponse> {
    try {
        // todo check if schemaId is not provided then return all schemas
        const schemas = await (this.agent as IssuerAgentModule).modules.anoncreds.getCreatedSchemas({
            schemaId: options.schemaId
        })
        return schemas
    } catch (e) {
        throw new Error((e as Error).message)
    }
}
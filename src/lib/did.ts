import { KeyType, TypedArrayEncoder } from "@credo-ts/core";
import { Issuer } from "../agent/issuer";
import { DidImportOptions, DidImportResponse } from "../types";

export async function importDid(this: Issuer, options: DidImportOptions): Promise<DidImportResponse> {
    try {
        await this.agent.dids.import({
            did: options.did,
            privateKeys: [
                {
                    keyType: KeyType.Ed25519,
                    privateKey: TypedArrayEncoder.fromString(options.seed),

                }
            ],
            overwrite: true
        })

        return {
            success: true
        }

    } catch (e) {
        return {
            success: false,
            message: (e as Error).message
        }
    }
}
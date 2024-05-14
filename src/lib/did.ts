import { KeyType, TypedArrayEncoder } from "@credo-ts/core";
import { Issuer } from "../agent/issuer";

export type DidImportOptions = {
    did: string
    seed: string
}
export async function importDid(this: Issuer, options: DidImportOptions) {
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

    } catch (e) {
        throw new Error((e as Error).message)
    }
}
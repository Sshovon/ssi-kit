import { Agent, InitConfig } from "@credo-ts/core";
import { BaseAgent } from "./base";
import { AgentModule } from "../module";
import { agentDependencies } from "@credo-ts/node";
import { DidImportOptions, importDid, initAgent } from "../lib";

export class Issuer extends BaseAgent {

    public constructor({
        port,
        label,
        endpoints = [],
        key,
    }: {
        port: number;
        label: string;
        endpoints: string[];
        key: string;
    }) {

        const config = {
            label,
            walletConfig: {
                id: `issuer-wallet-${label}`,
                key,
            },
        } satisfies InitConfig
        const agent = new Agent({
            config,
            dependencies: agentDependencies,
            modules: AgentModule.IndyIssuer(),
        })
        super({ port, label, endpoints, agent, config });
    }

    public initialize: () => Promise<void> = initAgent

    public importDidFromLedger: (options: DidImportOptions) => Promise<void> = importDid
    protected proofListener(): void {
        throw new Error("Method not implemented.");
    }
    protected messageListener(): void {
        throw new Error("Method not implemented.");
    }
    protected credentialListener(): void {
        throw new Error("Method not implemented.");
    }
    protected connectionListener(): void {
        throw new Error("Method not implemented.");
    }
}


async function main() {
    const issuer = new Issuer({ port: 3001, label: 'issuer', endpoints: [], key: "1234" })
    await issuer.initialize()
    await issuer.importDidFromLedger({
        did: 'did:indy:bcovrin:test:HTYnVHNExB8qjMh8otSz4X',
        seed: 'ssiatm00000000000000000000000000'
    })
}

main()
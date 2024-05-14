import { ConnectionsModule, CredentialsModule, V2CredentialProtocol, ProofsModule, V2ProofProtocol, DidsModule, InitConfig, Agent } from '@credo-ts/core';
import { AnonCredsCredentialFormatService, AnonCredsProofFormatService, AnonCredsModule } from '@credo-ts/anoncreds';
import { AskarModule } from '@credo-ts/askar';
import { IndyVdrModule } from '@credo-ts/indy-vdr';

declare const AgentModule: {
    IndyIssuer: () => {
        readonly connections: ConnectionsModule;
        readonly credentials: CredentialsModule<V2CredentialProtocol<AnonCredsCredentialFormatService[]>[]>;
        readonly indyVdr: IndyVdrModule;
        readonly proofs: ProofsModule<V2ProofProtocol<AnonCredsProofFormatService[]>[]>;
        readonly anoncreds: AnonCredsModule;
        readonly dids: DidsModule;
        readonly askar: AskarModule;
    };
};

type IndyAgentModule = Agent<ReturnType<typeof AgentModule.IndyIssuer>>;
declare abstract class BaseAgent {
    port: number;
    label: string;
    readonly config: InitConfig;
    endpoints: string[];
    agent: IndyAgentModule | Agent;
    constructor({ port, label, endpoints, agent, config, }: {
        port: number;
        label: string;
        endpoints: string[];
        agent: IndyAgentModule;
        config: InitConfig;
    });
    abstract initialize(): Promise<void>;
    protected abstract proofListener(): void;
    protected abstract messageListener(): void;
    protected abstract credentialListener(): void;
    protected abstract connectionListener(): void;
}

type DidImportOptions = {
    did: string;
    seed: string;
};

declare class Issuer extends BaseAgent {
    constructor({ port, label, endpoints, key, }: {
        port: number;
        label: string;
        endpoints: string[];
        key: string;
    });
    initialize: () => Promise<void>;
    importDidFromLedger: (options: DidImportOptions) => Promise<void>;
    protected proofListener(): void;
    protected messageListener(): void;
    protected credentialListener(): void;
    protected connectionListener(): void;
}

export { Issuer };

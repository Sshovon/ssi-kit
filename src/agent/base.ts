import { Agent, DidRecord, HttpOutboundTransport, InitConfig, WalletConfig, WsOutboundTransport } from '@credo-ts/core';
import { agentDependencies, HttpInboundTransport } from '@credo-ts/node';
import { AgentModule } from '../module';
import { ListernerCbs } from '../types';

export type IndyAgentModule = Agent<ReturnType<typeof AgentModule.IndyIssuer>>;
export abstract class BaseAgent {
    protected port: number;
    protected label: string;
    protected readonly config: InitConfig;
    public endpoints: string[];
    protected agent: IndyAgentModule | Agent
    protected listenerCbs: ListernerCbs

    public constructor({
        port,
        label,
        endpoints = [],
        agent,
        config,
        listenerCbs
    }: {
        port: number;
        label: string;
        endpoints: string[];
        agent: IndyAgentModule
        config: InitConfig;
        listenerCbs: ListernerCbs
    }) {
        this.port = port;
        this.label = label;
        this.endpoints = endpoints;

        this.config = config;
        this.agent = agent
        this.listenerCbs = listenerCbs

        this.agent.registerInboundTransport(new HttpInboundTransport({ port }));
        this.agent.registerOutboundTransport(new HttpOutboundTransport());
        this.agent.registerOutboundTransport(new WsOutboundTransport());

    }

    abstract initialize(): Promise<void>;
    protected abstract proofListener(): void;
    protected abstract messageListener(): void;
    protected abstract credentialListener(): void;
    protected abstract connectionListener(): void;
}

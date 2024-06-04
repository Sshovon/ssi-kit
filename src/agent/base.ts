import { Agent, DidRecord, HttpOutboundTransport, InitConfig, WalletConfig, WsOutboundTransport } from '@credo-ts/core';
import { agentDependencies, HttpInboundTransport } from '@credo-ts/node';
import { AgentModule } from '../module';

export type IndyAgentModule = Agent<ReturnType<typeof AgentModule.IndyIssuer>>;
export abstract class BaseAgent {
    protected port: number;
    protected label: string;
    protected readonly config: InitConfig;
    public endpoints: string[];
    protected agent: IndyAgentModule | Agent

    public constructor({
        port,
        label,
        endpoints = [],
        agent,
        config,
    }: {
        port: number;
        label: string;
        endpoints: string[];
        agent: IndyAgentModule
        config: InitConfig;
    }) {
        this.port = port;
        this.label = label;
        this.endpoints = endpoints;

        this.config = config;
        this.agent = agent

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

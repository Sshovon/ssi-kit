import { Agent, DidRecord, HttpOutboundTransport, InitConfig, WalletConfig, WsOutboundTransport } from '@credo-ts/core';
import { HttpInboundTransport } from '@credo-ts/node';
import express, { Express } from 'express';
import { AgentModule } from '../module';

export abstract class BaseAgent {
    public port: number;
    public label: string;
    readonly config: InitConfig;
    public endpoints: string[];
    public agent: Agent<ReturnType<typeof AgentModule.IndyIssuer>>;
    public app: Express

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
        agent: Agent<ReturnType<typeof AgentModule.IndyIssuer>>;
        config: InitConfig;
        useLegacyIndySdk?: boolean;
    }) {
        this.port = port;
        this.label = label;
        this.endpoints = endpoints;

        this.config = config;
        this.agent = agent

        this.app = express();
        this.agent.registerInboundTransport(new HttpInboundTransport({ app: this.app, port }));
        this.agent.registerOutboundTransport(new HttpOutboundTransport());
        this.agent.registerOutboundTransport(new WsOutboundTransport());

    }

    abstract initialize(): Promise<void>;
    protected abstract proofListener(): void;
    protected abstract messageListener(): void;
    protected abstract credentialListener(): void;
    protected abstract connectionListener(): void;
}

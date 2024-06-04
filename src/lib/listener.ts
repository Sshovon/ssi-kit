import { BasicMessageEventTypes, BasicMessageRole, BasicMessageStateChangedEvent, ConnectionEventTypes, ConnectionStateChangedEvent, CredentialEventTypes, CredentialState, CredentialStateChangedEvent, DidExchangeState, ProofEventTypes, ProofState, ProofStateChangedEvent } from "@credo-ts/core";
import { BaseAgent } from "../agent/base";

export function proofListener(this: BaseAgent) {
    console.log(`ProofListener is started on ${this.agent.config.label}`);
    console.log(this.listenerCbs.proof ? 'Proof listerner callback is set' : 'Proof listerner callback is not available using default listener')
    this.agent.events.on<ProofStateChangedEvent>(ProofEventTypes.ProofStateChanged, async (event) => {
        if (this.listenerCbs.proof) {
            this.listenerCbs.proof(event)
        } else {
            console.log('Proof state: ', event.payload.proofRecord.state);
            console.log('payload: ', event.payload);
        }
    });
}
export function messageListener(this: BaseAgent) {
    console.log(`MessageListener is started on ${this.agent.config.label}`);
    this.agent.events.on(
        BasicMessageEventTypes.BasicMessageStateChanged,
        async (event: BasicMessageStateChangedEvent) => {
            console.log('BasicMessageStateChangedEvent', event.payload.basicMessageRecord.role);
        },
    );
}
export function credentialListener(this: BaseAgent) {
    console.log(`CredentialListener is started on ${this.agent.config.label}`);
    console.log(this.listenerCbs.credential ? 'Credential listerner callback is set' : 'Credential listerner callback is not available using default listener')
    this.agent.events.on<CredentialStateChangedEvent>(
        CredentialEventTypes.CredentialStateChanged,
        async (event) => {
            if (this.listenerCbs.credential) {
                this.listenerCbs.credential(event)
            } else {
                console.log('Credential state: ', event.payload.credentialRecord.state);
                console.log('payload: ', event.payload);
            }
        },
    );
}
export function connectionListener(this: BaseAgent) {
    console.log(this.listenerCbs.connection ? 'Connection listerner callback is set' : 'Connection listerner callback is not available using default listener')
    console.log(`ConnectionListener is started on ${this.agent.config.label}`);
    this.agent.events.on<ConnectionStateChangedEvent>(ConnectionEventTypes.ConnectionStateChanged, async (event) => {
        if (this.listenerCbs.connection) {
            this.listenerCbs.connection(event)
        } else {
            console.log('Connection state: ', event.payload.connectionRecord.state);
            console.log('payload: ', event.payload);
        }
    });
}
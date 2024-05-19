import { BasicMessageEventTypes, BasicMessageRole, BasicMessageStateChangedEvent, ConnectionEventTypes, ConnectionStateChangedEvent, CredentialEventTypes, CredentialState, CredentialStateChangedEvent, DidExchangeState, ProofEventTypes, ProofState, ProofStateChangedEvent } from "@credo-ts/core";
import { BaseAgent } from "../agent/base";

export function proofListener(this: BaseAgent) {
    console.log(`ProofListener is started on ${this.agent.config.label}`);
    this.agent.events.on<ProofStateChangedEvent>(ProofEventTypes.ProofStateChanged, async (event) => {
        console.log('ProofStateChangedEvent', event.payload.proofRecord.state);
        const verificationWebhookTiggerLogic = event.payload.proofRecord.state === ProofState.Done || event.payload.proofRecord.state === ProofState.Declined || event.payload.proofRecord.state === ProofState.Abandoned;
        if (verificationWebhookTiggerLogic) {
            // const webhookFindResults = await this.webhookDb.findAllData(tenantId);
            // await sendWebhookEvents(
            //     {
            //         webhookFindResult: webhookFindResults,
            //         body: {
            //             type: 'ProofState',
            //             payload: event.payload,
            //         },
            //         logger: this.logger,
            //         retryOptions: { maxRetries: 3, retryDelayMs: 1000 },
            //     }
            // );
        }
    });
}
export function messageListener(this: BaseAgent) {
    console.log(`MessageListener is started on ${this.agent.config.label}`);
    this.agent.events.on(
        BasicMessageEventTypes.BasicMessageStateChanged,
        async (event: BasicMessageStateChangedEvent) => {
            console.log('BasicMessageStateChangedEvent', event.payload.basicMessageRecord.role);
            if (event.payload.basicMessageRecord.role === BasicMessageRole.Receiver) {
                // const webhookFindResults = await this.webhookDb.findAllData(tenantId);
                // await sendWebhookEvents(
                //     {
                //         webhookFindResult: webhookFindResults,
                //         body: {
                //             type: 'BasicMessageState',
                //             payload: event.payload,
                //         },
                //         logger: this.logger,
                //         retryOptions: { maxRetries: 3, retryDelayMs: 1000 },
                //     }
                // )
            }
        },
    );
}
export function credentialListener(this: BaseAgent) {
    console.log(`CredentialListener is started on ${this.agent.config.label}`);
    this.agent.events.on<CredentialStateChangedEvent>(
        CredentialEventTypes.CredentialStateChanged,
        async (event) => {
            console.log('CredentialStateChangedEvent', event.payload.credentialRecord.state);
            // const issueWebhookTiggerLogic = event.payload.credentialRecord.state === CredentialState.Abandoned || event.payload.credentialRecord.state === CredentialState.Done || event.payload.credentialRecord.state === CredentialState.Declined;
            // if (issueWebhookTiggerLogic) {
            //     const webhookFindResults = await this.webhookDb.findAllData(tenantId);
            //     await sendWebhookEvents(
            //         {
            //             webhookFindResult: webhookFindResults,
            //             body: {
            //                 type: 'CredentialState',
            //                 payload: event.payload,
            //             },
            //             logger: this.logger,
            //             retryOptions: { maxRetries: 3, retryDelayMs: 1000 },
            //         }
            //     )
            // }
        },
    );
}
export function connectionListener(this: BaseAgent) {
    console.log(`ConnectionListener is started on ${this.agent.config.label}`);
    this.agent.events.on<ConnectionStateChangedEvent>(ConnectionEventTypes.ConnectionStateChanged, async (event) => {
        console.log('ConnectionStateChangedEvent', event.payload.connectionRecord.state);
        const connectionWebhookTiggerLogic = event.payload.connectionRecord.state === DidExchangeState.Abandoned || event.payload.connectionRecord.state === DidExchangeState.Completed
        // if (connectionWebhookTiggerLogic) {
        //     const webhookFindResults = await this.webhookDb.findAllData(tenantId);
        //     await sendWebhookEvents(
        //         {
        //             webhookFindResult: webhookFindResults,
        //             body: {
        //                 type: 'ConnectionState',
        //                 payload: event.payload,
        //             },
        //             logger: this.logger,
        //             retryOptions: { maxRetries: 3, retryDelayMs: 1000 },
        //         }
        //     )
        // }
    });
}
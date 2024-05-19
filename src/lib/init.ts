import { Issuer } from "../agent/issuer";

export async function initAgent(this: Issuer) {
    try {
        await this.agent.initialize();
        console.log(`Agent ${this.agent.config.label} is initialized on port ${this.port}`);
        this.proofListener();
        this.messageListener();
        this.credentialListener();
        this.connectionListener();

    } catch (e) {
        throw new Error((e as Error).message)
    }
}
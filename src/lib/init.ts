import { Issuer } from "../agent/issuer";

export async function initAgent(this: Issuer) {
    try {
        await this.agent.initialize();
    } catch (e) {
        throw new Error((e as Error).message)
    }
}
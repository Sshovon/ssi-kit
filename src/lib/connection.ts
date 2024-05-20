import { PlaintextMessage } from "@credo-ts/core/build/types";
import { Issuer } from "../agent/issuer";
import { ConnectionRecord } from "@credo-ts/core";


export type CreateInvitationOptions = {
    alias?: string;
    label?: string;
    reusable?: boolean;
};

export type CreateInvitationResponse = {
    invitationUrl: string;
    invitationJson: PlaintextMessage;
    oobId: string;
}

export async function createInvitation(this: Issuer, options: CreateInvitationOptions): Promise<CreateInvitationResponse> {
    try {
        const response = await this.agent.oob.createInvitation({
            alias: this.label,
            label: this.label,
            multiUseInvitation: options.reusable ?? false,
        });
        return {
            invitationUrl: response.outOfBandInvitation.toUrl({ domain: this.agent.config.endpoints[0] }),
            invitationJson: response.outOfBandInvitation.toJSON(),
            oobId: response.id,
        }
    }
    catch (e) {
        throw new Error((e as Error).message);
    }
}

export type GetConnectionByIdOptions = {
    connectionId?: string;
    oobId?: string;
};

export type GetConnectionByIdResponse = {
    record: ConnectionRecord;
};

export async function getConnectionById(this: Issuer, options: GetConnectionByIdOptions): Promise<GetConnectionByIdResponse> {
    try {
        if (options.connectionId) {
            const record = await this.agent.connections.getById(options.connectionId);
            return { record };
        }
        else if (options.oobId) {
            const [record] = await this.agent.connections.findAllByOutOfBandId(options.oobId);
            return { record };
        }
        throw new Error('Either connectionId or oobId must be provided');
    }
    catch (e) {
        throw new Error((e as Error).message);
    }
}


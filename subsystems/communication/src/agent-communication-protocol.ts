/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Communication
 * Module    : Agent Communication Protocol
 *
 * Build     : BUILD-000123
 * Sprint    : Sprint 18
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export type MessageType =
    | "REQUEST"
    | "RESPONSE"
    | "EVENT"
    | "COMMAND";

export interface AgentMessage {

    id: string;

    sender: string;

    receiver: string;

    type: MessageType;

    payload: unknown;

    timestamp: number;

}

export class AgentCommunicationProtocol {

    /**
     * Create message.
     */
    public create(

        sender: string,

        receiver: string,

        type: MessageType,

        payload: unknown

    ): AgentMessage {

        return {

            id: crypto.randomUUID(),

            sender,

            receiver,

            type,

            payload,

            timestamp: Date.now()

        };

    }

}

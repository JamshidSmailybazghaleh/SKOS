/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Agent Orchestrator
 * Module    : Communication Bus
 *
 * Build     : BUILD-000079
 * Sprint    : Sprint 09
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface AgentMessage {

    id: string;

    from: string;

    to: string;

    type: string;

    payload?: unknown;

    createdAt: Date;

}

export class CommunicationBus {

    private readonly messages: AgentMessage[] = [];

    /**
     * Publish a message.
     */
    public publish(

        message: AgentMessage

    ): void {

        this.messages.push(message);

    }

    /**
     * Retrieve messages for a target agent.
     */
    public consume(

        agentId: string

    ): AgentMessage[] {

        return this.messages.filter(

            message =>

                message.to === agentId

        );

    }

    /**
     * Return all messages.
     */
    public getAll(): AgentMessage[] {

        return [...this.messages];

    }

}

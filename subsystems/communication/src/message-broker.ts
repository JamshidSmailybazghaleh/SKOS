/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Communication
 * Module    : Message Broker
 *
 * Build     : BUILD-000122
 * Sprint    : Sprint 18
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface Message {

    id: string;

    topic: string;

    payload: unknown;

}

export class MessageBroker {

    private readonly queue: Message[] = [];

    /**
     * Publish message.
     */
    public publish(

        message: Message

    ): void {

        this.queue.push(message);

    }

    /**
     * Consume next message.
     */
    public consume(): Message | undefined {

        return this.queue.shift();

    }

    /**
     * Queue size.
     */
    public size(): number {

        return this.queue.length;

    }

}

/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000125
 * Sprint: Sprint 18
 *
 * Communication Layer Integration Test
 * ==========================================================
 */

import {
    EventBus
} from "./event-bus";

import {
    MessageBroker
} from "./message-broker";

import {
    AgentCommunicationProtocol
} from "./agent-communication-protocol";

import {
    DistributedCoordinator
} from "./distributed-coordination";

export class CommunicationLayerIntegrationTest {

    public run(): boolean {

        const bus =
            new EventBus();

        const broker =
            new MessageBroker();

        const protocol =
            new AgentCommunicationProtocol();

        const coordinator =
            new DistributedCoordinator();

        let received = false;

        bus.subscribe(

            "TEST",

            () => {

                received = true;

            }

        );

        bus.publish({

            type: "TEST",

            payload: {}

        });

        const message = protocol.create(

            "agent-A",

            "agent-B",

            "EVENT",

            {

                text: "Hello"

            }

        );

        broker.publish({

            id: message.id,

            topic: "agents",

            payload: message

        });

        const queued = broker.consume();

        const locked = coordinator.acquire(

            "resource-001",

            "agent-A"

        );

        const released = coordinator.release(

            "resource-001",

            "agent-A"

        );

        return (

            received &&

            queued !== undefined &&

            locked &&

            released

        );

    }

}

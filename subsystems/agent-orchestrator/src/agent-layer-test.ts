/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Agent Orchestrator
 *
 * Build     : BUILD-000080
 * Sprint    : Sprint 09
 * Version   : 0.0.1
 *
 * Status    : Integration Test
 * ==========================================================
 */

import {
    AgentOrchestrator
} from "./agent-orchestrator";

import {
    AgentRegistry
} from "./agent-registry";

import {
    TaskDispatcher
} from "./task-dispatcher";

import {
    CommunicationBus
} from "./communication-bus";

export class AgentLayerTest {

    public run(): boolean {

        const orchestrator = new AgentOrchestrator();

        const registry = new AgentRegistry();

        const dispatcher = new TaskDispatcher();

        const bus = new CommunicationBus();

        registry.register({

            id: "knowledge",

            name: "Knowledge Engine",

            description: "Knowledge processing subsystem",

            enabled: true,

            capabilities: [

                "knowledge"

            ]

        });

        const task = {

            id: "TASK-001",

            name: "Process Knowledge"

        };

        const orchestration =

            orchestrator.execute(task);

        const dispatch =

            dispatcher.dispatch(

                task,

                "knowledge"

            );

        bus.publish({

            id: "MSG-001",

            from: "orchestrator",

            to: "knowledge",

            type: "TASK",

            payload: task,

            createdAt: new Date()

        });

        const messages =

            bus.consume("knowledge");

        return (

            orchestration.success &&

            dispatch.success &&

            messages.length === 1

        );

    }

}

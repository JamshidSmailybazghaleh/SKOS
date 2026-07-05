/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Agent Orchestrator
 * Module    : Agent Registry
 *
 * Build     : BUILD-000078
 * Sprint    : Sprint 09
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface AgentDescriptor {

    id: string;

    name: string;

    description: string;

    enabled: boolean;

    capabilities: string[];

}

export class AgentRegistry {

    private readonly agents =
        new Map<string, AgentDescriptor>();

    /**
     * Register an agent.
     */
    public register(

        agent: AgentDescriptor

    ): void {

        this.agents.set(

            agent.id,

            agent

        );

    }

    /**
     * Retrieve one agent.
     */
    public getById(

        id: string

    ): AgentDescriptor | undefined {

        return this.agents.get(id);

    }

    /**
     * Retrieve all agents.
     */
    public getAll(): AgentDescriptor[] {

        return Array.from(

            this.agents.values()

        );

    }

    /**
     * Retrieve enabled agents.
     */
    public getEnabled(): AgentDescriptor[] {

        return this.getAll()

            .filter(

                agent => agent.enabled

            );

    }

    /**
     * Remove an agent.
     */
    public remove(

        id: string

    ): boolean {

        return this.agents.delete(id);

    }

}

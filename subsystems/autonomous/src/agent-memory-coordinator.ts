/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Autonomous
 * Module    : Agent Memory Coordinator
 *
 * Build     : BUILD-000118
 * Sprint    : Sprint 17
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface AgentMemory {

    agentId: string;

    goalId: string;

    context: string[];

}

export class AgentMemoryCoordinator {

    private readonly memories =
        new Map<string, AgentMemory>();

    /**
     * Register or update memory.
     */
    public save(

        memory: AgentMemory

    ): void {

        this.memories.set(

            memory.agentId,

            memory

        );

    }

    /**
     * Retrieve memory.
     */
    public get(

        agentId: string

    ): AgentMemory | undefined {

        return this.memories.get(agentId);

    }

    /**
     * Clear memory.
     */
    public clear(

        agentId: string

    ): boolean {

        return this.memories.delete(agentId);

    }

    /**
     * List all memories.
     */
    public getAll(): AgentMemory[] {

        return Array.from(this.memories.values());

    }

}

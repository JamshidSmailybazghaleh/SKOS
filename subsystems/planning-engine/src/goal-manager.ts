/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Planning Engine
 * Module    : Goal Manager
 *
 * Build     : BUILD-000068
 * Sprint    : Sprint 07
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { Goal } from "./planning-engine";

export class GoalManager {

    private readonly goals = new Map<string, Goal>();

    /**
     * Register a goal.
     */
    public add(goal: Goal): void {

        this.goals.set(goal.id, goal);

    }

    /**
     * Retrieve one goal.
     */
    public getById(id: string): Goal | undefined {

        return this.goals.get(id);

    }

    /**
     * Retrieve all goals.
     */
    public getAll(): Goal[] {

        return Array.from(this.goals.values());

    }

    /**
     * Remove a goal.
     */
    public remove(id: string): boolean {

        return this.goals.delete(id);

    }

    /**
     * Return goals ordered by priority.
     */
    public getByPriority(): Goal[] {

        return this.getAll()

            .sort(

                (a, b) => b.priority - a.priority

            );

    }

}

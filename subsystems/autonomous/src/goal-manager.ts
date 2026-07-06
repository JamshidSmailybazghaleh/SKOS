/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Autonomous
 * Module    : Goal Manager
 *
 * Build     : BUILD-000116
 * Sprint    : Sprint 17
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface Goal {

    id: string;

    title: string;

    priority: number;

    completed: boolean;

}

export class GoalManager {

    private readonly goals =
        new Map<string, Goal>();

    /**
     * Register goal.
     */
    public add(

        goal: Goal

    ): void {

        this.goals.set(

            goal.id,

            goal

        );

    }

    /**
     * Retrieve goal.
     */
    public get(

        id: string

    ): Goal | undefined {

        return this.goals.get(id);

    }

    /**
     * Retrieve all goals.
     */
    public getAll(): Goal[] {

        return Array
            .from(this.goals.values())
            .sort(

                (a, b) =>

                    b.priority - a.priority

            );

    }

    /**
     * Mark goal completed.
     */
    public complete(

        id: string

    ): boolean {

        const goal = this.goals.get(id);

        if (!goal) {

            return false;

        }

        goal.completed = true;

        return true;

    }

}

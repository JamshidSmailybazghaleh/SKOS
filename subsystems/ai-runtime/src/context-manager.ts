/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : AI Runtime
 * Module    : Context Manager
 *
 * Build     : BUILD-000103
 * Sprint    : Sprint 14
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface ContextItem {

    id: string;

    content: string;

    priority: number;

}

export class ContextManager {

    private readonly context =
        new Map<string, ContextItem>();

    /**
     * Add context.
     */
    public add(

        item: ContextItem

    ): void {

        this.context.set(

            item.id,

            item

        );

    }

    /**
     * Remove context.
     */
    public remove(

        id: string

    ): boolean {

        return this.context.delete(id);

    }

    /**
     * Retrieve all context ordered by priority.
     */
    public getContext(): ContextItem[] {

        return Array
            .from(this.context.values())
            .sort(

                (a, b) =>

                    b.priority - a.priority

            );

    }

    /**
     * Clear all context.
     */
    public clear(): void {

        this.context.clear();

    }

}

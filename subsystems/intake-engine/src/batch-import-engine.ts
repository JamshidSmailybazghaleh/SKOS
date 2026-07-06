/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Batch Import Engine
 *
 * Build     : BUILD-000152
 * Sprint    : Phase 2
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { BatchImportItem }
from "./batch-import-item";

import { BatchImportResult }
from "./batch-import-result";

import { BatchImportStatus }
from "./batch-import-status";

export class BatchImportEngine {

    private readonly queue: BatchImportItem[] = [];

    /**
     * Add item.
     */
    public enqueue(

        item: BatchImportItem

    ): void {

        this.queue.push(item);

    }

    /**
     * Add multiple items.
     */
    public enqueueMany(

        items: BatchImportItem[]

    ): void {

        this.queue.push(...items);

    }

    /**
     * Execute import.
     */
    public execute(): BatchImportResult {

        const total = this.queue.length;

        const imported = total;

        this.queue.length = 0;

        return {

            status: BatchImportStatus.COMPLETED,

            totalItems: total,

            importedItems: imported,

            failedItems: 0

        };

    }

    /**
     * Pending items.
     */
    public pending(): number {

        return this.queue.length;

    }

}

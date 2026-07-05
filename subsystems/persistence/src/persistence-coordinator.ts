/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Persistence
 * Module    : Persistence Coordinator
 *
 * Build     : BUILD-000099
 * Sprint    : Sprint 13
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { Repository } from "./repository";
import { CacheManager } from "./cache-manager";

export class PersistenceCoordinator {

    constructor(

        private readonly repository: Repository,

        private readonly cache: CacheManager

    ) {}

    /**
     * Read entity.
     */
    public load(

        id: string

    ): unknown {

        if (this.cache.has(id)) {

            return this.cache.get(id);

        }

        const record =

            this.repository.load(id);

        if (!record) {

            return undefined;

        }

        this.cache.set(

            id,

            record.data

        );

        return record.data;

    }

    /**
     * Save entity.
     */
    public save(

        id: string,

        data: unknown

    ): void {

        this.repository.save(

            id,

            data

        );

        this.cache.set(

            id,

            data

        );

    }

    /**
     * Delete entity.
     */
    public delete(

        id: string

    ): void {

        this.repository.delete(id);

        this.cache.delete(id);

    }

}

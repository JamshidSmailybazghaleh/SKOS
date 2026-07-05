/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Persistence
 *
 * Build     : BUILD-000100
 * Sprint    : Sprint 13
 * Version   : 0.0.1
 *
 * Status    : Integration Test
 * ==========================================================
 */

import { StorageEngine } from "./storage-engine";
import { Repository } from "./repository";
import { CacheManager } from "./cache-manager";
import { PersistenceCoordinator } from "./persistence-coordinator";

export class PersistenceLayerTest {

    public run(): boolean {

        const storage = new StorageEngine();

        const repository = new Repository(storage);

        const cache = new CacheManager();

        const coordinator = new PersistenceCoordinator(

            repository,

            cache

        );

        coordinator.save(

            "ENTITY-001",

            {

                name: "SKOS"

            }

        );

        const entity = coordinator.load(

            "ENTITY-001"

        ) as { name: string } | undefined;

        if (!entity) {

            return false;

        }

        if (entity.name !== "SKOS") {

            return false;

        }

        coordinator.delete(

            "ENTITY-001"

        );

        return (

            coordinator.load(

                "ENTITY-001"

            ) === undefined

        );

    }

}

/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Connector
 * Module    : Duplicate Detection Engine
 *
 * Build     : BUILD-000147
 * Sprint    : Phase 2
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { UnifiedFileRecord } from "./unified-file-record";
import { DuplicateGroup } from "./duplicate-group";
import { DuplicateRecord } from "./duplicate-record";

export class DuplicateDetectionEngine {

    public detect(

        files: UnifiedFileRecord[]

    ): DuplicateGroup[] {

        const map = new Map<string, DuplicateRecord[]>();

        for (const file of files) {

            const key =
                `${file.name}|${file.size}|${file.extension}`;

            const record: DuplicateRecord = {

                file,

                duplicateKey: key

            };

            if (!map.has(key)) {

                map.set(key, []);

            }

            map.get(key)!.push(record);

        }

        const groups: DuplicateGroup[] = [];

        for (const [key, records] of map.entries()) {

            if (records.length > 1) {

                groups.push({

                    key,

                    records

                });

            }

        }

        return groups;

    }

}

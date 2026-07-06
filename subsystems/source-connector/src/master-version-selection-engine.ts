/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Connector
 * Module    : Master Version Selection Engine
 *
 * Build     : BUILD-000148
 * Sprint    : Phase 2
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { DuplicateGroup } from "./duplicate-group";
import { UnifiedFileRecord } from "./unified-file-record";
import { MasterSelectionResult } from "./master-selection-result";

export class MasterVersionSelectionEngine {

    public select(

        group: DuplicateGroup

    ): MasterSelectionResult {

        const files =

            group.records.map(

                record => record.file

            );

        const sorted =

            [...files].sort(

                (a, b) => {

                    if (

                        b.lastModified !== a.lastModified

                    ) {

                        return (

                            b.lastModified -

                            a.lastModified

                        );

                    }

                    return (

                        b.size -

                        a.size

                    );

                }

            );

        const master = sorted[0];

        const duplicates =

            sorted.slice(1);

        return {

            master,

            duplicates

        };

    }

}

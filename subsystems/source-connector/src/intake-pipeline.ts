/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Intake Pipeline
 *
 * Build     : BUILD-000149
 * Sprint    : Phase 2
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { MultiSourceMergeEngine }
from "../../source-connector/src/multi-source-merge-engine";

import { DuplicateDetectionEngine }
from "../../source-connector/src/duplicate-detection-engine";

import { MasterVersionSelectionEngine }
from "../../source-connector/src/master-version-selection-engine";

import { IntakePipelineResult }
from "./intake-pipeline-result";

export class IntakePipeline {

    constructor(

        private readonly merger:
            MultiSourceMergeEngine,

        private readonly duplicateDetector:
            DuplicateDetectionEngine,

        private readonly masterSelector:
            MasterVersionSelectionEngine

    ) {}

    public execute():

        IntakePipelineResult {

        const files =
            this.merger.getAll();

        const duplicates =
            this.duplicateDetector
                .detect(files);

        let masters = 0;

        for (

            const group

            of duplicates

        ) {

            this.masterSelector
                .select(group);

            masters++;

        }

        return {

            success: true,

            summary: {

                totalSources: 3,

                totalFiles:

                    files.length,

                duplicateGroups:

                    duplicates.length,

                selectedMasters:

                    masters

            }

        };

    }

}

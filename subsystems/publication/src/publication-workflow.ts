/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Publication
 * Module    : Publication Workflow
 *
 * Build     : BUILD-000154
 * Sprint    : Phase 2
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { PublicationRecord } from "./publication-record";
import { PublicationStage } from "./publication-stage";
import { WorkflowResult } from "./workflow-result";

export class PublicationWorkflow {

    public moveToStage(

        record: PublicationRecord,

        nextStage: PublicationStage

    ): WorkflowResult {

        const previous = record.stage;

        record.stage = nextStage;

        record.lastUpdated = Date.now();

        return {

            success: true,

            previousStage: previous,

            currentStage: nextStage

        };

    }

}

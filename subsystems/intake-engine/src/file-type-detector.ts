/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : File Type Detector
 *
 * Build     : BUILD-000030
 * Sprint    : Sprint 02
 * Version   : 0.0.2
 *
 * Status    : Active
 * ==========================================================
 */

import {

    PipelineContext,

    PipelineStep

} from "./pipeline-step";

export enum SourceType {

    PDF = "pdf",

    IMAGE = "image",

    AUDIO = "audio",

    VIDEO = "video",

    TEXT = "text",

    HTML = "html",

    UNKNOWN = "unknown"

}

export class FileTypeDetector implements PipelineStep {

    public execute(

        context: PipelineContext

    ): PipelineContext {

        console.log("STEP 02 : File Type Detection");

        const path = context.sourcePath.toLowerCase();

        if (path.endsWith(".pdf")) {

            context.sourceType = SourceType.PDF;

        }

        else if (

            path.endsWith(".jpg") ||

            path.endsWith(".jpeg") ||

            path.endsWith(".png") ||

            path.endsWith(".webp")

        ) {

            context.sourceType = SourceType.IMAGE;

        }

        else if (

            path.endsWith(".mp3") ||

            path.endsWith(".wav")

        ) {

            context.sourceType = SourceType.AUDIO;

        }

        else if (

            path.endsWith(".mp4") ||

            path.endsWith(".mkv")

        ) {

            context.sourceType = SourceType.VIDEO;

        }

        else if (

            path.endsWith(".txt") ||

            path.endsWith(".md")

        ) {

            context.sourceType = SourceType.TEXT;

        }

        else if (

            path.endsWith(".html") ||

            path.endsWith(".htm")

        ) {

            context.sourceType = SourceType.HTML;

        }

        else {

            context.sourceType = SourceType.UNKNOWN;

        }

        console.log(

            "Detected:",

            context.sourceType

        );

        return context;

    }

}

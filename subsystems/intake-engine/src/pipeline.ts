/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Intake Pipeline
 *
 * Build     : BUILD-000026
 * Sprint    : Sprint 02
 * Version   : 0.0.1
 *
 * Status    : Active
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

import { SourceValidator } from "./source-validator";
import { FileTypeDetector } from "./file-type-detector";
import { LanguageDetector } from "./language-detector";
import { DocumentParser } from "./document-parser";
import { MetadataExtractor } from "./metadata-extractor";
import { KnowledgeObjectBuilder } from "./knowledge-object-builder";

export class IntakePipeline {

    private validator = new SourceValidator();

    private fileType = new FileTypeDetector();

    private language = new LanguageDetector();

    private parser = new DocumentParser();

    private metadata = new MetadataExtractor();

    private builder = new KnowledgeObjectBuilder();

    public process(path: string): void {

        console.log("==================================");
        console.log("SKOS Intake Pipeline");
        console.log("==================================");

        //--------------------------------------------------
        // STEP 01
        // Validation
        //--------------------------------------------------

        const validation = this.validator.validate(path);

        console.log("Validation");

        console.log(validation);

        if (!validation.valid) {

            console.log("Pipeline aborted.");

            return;

        }

        //--------------------------------------------------
        // STEP 02
        // File Type
        //--------------------------------------------------

        const type = this.fileType.detect(path);

        console.log("File Type");

        console.log(type);

        //--------------------------------------------------
        // STEP 03
        // Language
        //--------------------------------------------------

        const lang = this.language.detect(path);

        console.log("Language");

        console.log(lang);

        //--------------------------------------------------
        // STEP 04
        // Parse
        //--------------------------------------------------

        const parsed = this.parser.parse(path);

        console.log("Parsed Document");

        console.log(parsed);

        //--------------------------------------------------
        // STEP 05
        // Metadata
        //--------------------------------------------------

        const meta = this.metadata.extract(path);

        console.log("Metadata");

        console.log(meta);

        //--------------------------------------------------
        // STEP 06
        // Knowledge Object
        //--------------------------------------------------

        const knowledgeObject = this.builder.build(

            meta,

            parsed.raw

        );

        console.log("Knowledge Object");

        console.log(knowledgeObject);

        console.log("==================================");
        console.log("Pipeline Completed");
        console.log("==================================");

    }

}

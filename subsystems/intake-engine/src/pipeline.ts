/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Intake Pipeline
 *
 * Build     : BUILD-000025
 * Sprint    : Sprint 02
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

import { DocumentParser } from "./document-parser";

import { FileTypeDetector } from "./file-type-detector";

import { LanguageDetector } from "./language-detector";

import { MetadataExtractor } from "./metadata-extractor";

import { SourceValidator } from "./source-validator";

export class IntakePipeline {

    private validator = new SourceValidator();

    private fileType = new FileTypeDetector();

    private language = new LanguageDetector();

    private parser = new DocumentParser();

    private metadata = new MetadataExtractor();

    public process(path: string): void {

        const validation = this.validator.validate(path);

        console.log(validation);

        const type = this.fileType.detect(path);

        console.log(type);

        const parsed = this.parser.parse(path);

        console.log(parsed);

        const lang = this.language.detect(path);

        console.log(lang);

        const meta = this.metadata.extract(path);

        console.log(meta);

    }

}

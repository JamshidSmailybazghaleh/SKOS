/**
 * ==========================================================
 * SKOS
 * Integration Test
 * ==========================================================
 *
 * Build : BUILD-000035
 *
 * ==========================================================
 */

import { PipelineManager } from "../../subsystems/intake-engine/src/pipeline-manager";

const manager = new PipelineManager();

manager.execute({

    sourcePath: "sample.pdf",

    rawContent: `
This is a sample document.

This document is used only
for pipeline integration testing.
`

});

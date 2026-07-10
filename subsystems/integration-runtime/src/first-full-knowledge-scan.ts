/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Integration Test
 * First Full Knowledge Scan
 *
 * Build     : BUILD-000186
 * Version   : 1.0.0
 * ==========================================================
 */

import { SKOSRuntime } from "../src/skos-runtime";
import { PipelineContext } from "../src/pipeline-context";

import { MetadataProcessor } from "../../metadata-engine/src/metadata-processor";
import { ContentProcessor } from "../../content-engine/src/content-processor";
import { KnowledgeProcessor } from "../../knowledge-engine/src/knowledge-processor";
import { VaultProcessor } from "../../knowledge-vault/src/vault-processor";
import { GraphProcessor } from "../../knowledge-graph/src/graph-processor";

async function main(): Promise<void> {

    const runtime = new SKOSRuntime();

    runtime.register(new MetadataProcessor());

    runtime.register(new ContentProcessor());

    runtime.register(new KnowledgeProcessor());

    runtime.register(new VaultProcessor());

    runtime.register(new GraphProcessor());

    const context: PipelineContext = {

        currentFile:
            "/storage/emulated/0/Documents/example.pdf",

        metadata: [],

        contents: [],

        knowledgeUnits: [],

        vaultRecords: [],

        graphNodes: [],

        graphEdges: [],

        warnings: [],

        errors: [],

        startedAt: new Date()

    };

    const report = await runtime.run(context);

    console.log("===================================");

    console.log("SKOS FIRST KNOWLEDGE SCAN");

    console.log("===================================");

    console.log(report);

    console.log(runtime.getStageStates());

}

main().catch(console.error);

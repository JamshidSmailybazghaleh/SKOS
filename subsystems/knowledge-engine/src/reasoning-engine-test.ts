/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Reasoning Engine
 *
 * Build     : BUILD-000056
 * Sprint    : Sprint 04
 * Version   : 0.0.1
 *
 * Status    : Integration Test
 * ==========================================================
 */

import { RuleEngine } from "./rule-engine";
import { RuleExecutor } from "./rule-executor";
import { InferencePipeline } from "./inference-pipeline";

export class ReasoningEngineTest {

    public run(): boolean {

        const executor = new RuleExecutor();

        const engine = new RuleEngine();

        const pipeline = new InferencePipeline(engine);

        engine.register({

            id: "RULE-001",

            name: "Sample Rule",

            description: "Integration Test",

            enabled: true

        });

        const result = pipeline.execute({

            id: "KO-TEST",

            title: "Test",

            summary: "Reasoning",

            metadata: {

                version: "1.0.0",

                createdAt: new Date(),

                updatedAt: new Date(),

                source: "TEST",

                language: "en"

            },

            entities: [],

            concepts: [],

            relationships: [],

            tags: []

        });

        return result.success;

    }

}

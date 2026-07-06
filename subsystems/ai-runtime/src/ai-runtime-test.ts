/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000105
 * Sprint: Sprint 14
 *
 * AI Runtime Integration Test
 * ==========================================================
 */

import { ModelRegistry } from "./model-registry";
import { PromptEngine } from "./prompt-engine";
import { ContextManager } from "./context-manager";
import { InferencePipeline } from "./inference-pipeline";

export class AIRuntimeIntegrationTest {

    public run(): boolean {

        const registry = new ModelRegistry();

        registry.register({

            id: "default-model",

            name: "Default",

            provider: "SKOS",

            version: "1.0",

            enabled: true

        });

        const promptEngine = new PromptEngine();

        promptEngine.register({

            id: "greeting",

            name: "Greeting",

            version: "1.0",

            template: "Hello {{name}}"

        });

        const context = new ContextManager();

        context.add({

            id: "ctx-1",

            content: "Sample Context",

            priority: 10

        });

        const pipeline =

            new InferencePipeline(

                registry,

                context,

                promptEngine

            );

        const result =

            pipeline.execute({

                modelId: "default-model",

                promptId: "greeting",

                variables: {

                    name: "SKOS"

                }

            });

        return (

            result.success &&

            result.prompt === "Hello SKOS" &&

            result.contextSize === 1

        );

    }

}

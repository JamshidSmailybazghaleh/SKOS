/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : AI Runtime
 * Module    : Inference Pipeline
 *
 * Build     : BUILD-000104
 * Sprint    : Sprint 14
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { ModelRegistry } from "./model-registry";
import { ContextManager } from "./context-manager";
import { PromptEngine } from "./prompt-engine";

export interface InferenceRequest {

    modelId: string;

    promptId: string;

    variables: Record<string, string>;

}

export interface InferenceResult {

    success: boolean;

    prompt: string;

    contextSize: number;

}

export class InferencePipeline {

    constructor(

        private readonly registry: ModelRegistry,

        private readonly context: ContextManager,

        private readonly prompts: PromptEngine

    ) {}

    /**
     * Execute inference preparation.
     */
    public execute(

        request: InferenceRequest

    ): InferenceResult {

        const model =

            this.registry.getModel(

                request.modelId

            );

        if (!model || !model.enabled) {

            return {

                success: false,

                prompt: "",

                contextSize: 0

            };

        }

        const prompt =

            this.prompts.build(

                request.promptId,

                request.variables

            );

        return {

            success: prompt !== undefined,

            prompt: prompt ?? "",

            contextSize:

                this.context.getContext().length

        };

    }

}

/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : AI Runtime
 * Module    : Prompt Engine
 *
 * Build     : BUILD-000102
 * Sprint    : Sprint 14
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface PromptTemplate {

    id: string;

    name: string;

    version: string;

    template: string;

}

export class PromptEngine {

    private readonly templates =
        new Map<string, PromptTemplate>();

    /**
     * Register prompt template.
     */
    public register(

        template: PromptTemplate

    ): void {

        this.templates.set(

            template.id,

            template

        );

    }

    /**
     * Build prompt.
     */
    public build(

        id: string,

        variables: Record<string, string>

    ): string | undefined {

        const prompt = this.templates.get(id);

        if (!prompt) {

            return undefined;

        }

        let output = prompt.template;

        for (const key of Object.keys(variables)) {

            output = output.replaceAll(

                `{{${key}}}`,

                variables[key]

            );

        }

        return output;

    }

    /**
     * Retrieve template.
     */
    public getTemplate(

        id: string

    ): PromptTemplate | undefined {

        return this.templates.get(id);

    }

}

/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : AI Runtime
 * Module    : Model Registry
 *
 * Build     : BUILD-000101
 * Sprint    : Sprint 14
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface AIModel {

    id: string;

    name: string;

    provider: string;

    version: string;

    enabled: boolean;

}

export class ModelRegistry {

    private readonly models =
        new Map<string, AIModel>();

    /**
     * Register model.
     */
    public register(

        model: AIModel

    ): void {

        this.models.set(

            model.id,

            model

        );

    }

    /**
     * Retrieve model.
     */
    public getModel(

        id: string

    ): AIModel | undefined {

        return this.models.get(id);

    }

    /**
     * List all models.
     */
    public getModels(): AIModel[] {

        return Array.from(

            this.models.values()

        );

    }

    /**
     * Enable model.
     */
    public enable(

        id: string

    ): boolean {

        const model = this.models.get(id);

        if (!model) {

            return false;

        }

        model.enabled = true;

        return true;

    }

    /**
     * Disable model.
     */
    public disable(

        id: string

    ): boolean {

        const model = this.models.get(id);

        if (!model) {

            return false;

        }

        model.enabled = false;

        return true;

    }

}

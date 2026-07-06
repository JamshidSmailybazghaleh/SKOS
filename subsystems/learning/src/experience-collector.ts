/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Learning
 * Module    : Experience Collector
 *
 * Build     : BUILD-000126
 * Sprint    : Sprint 19
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface Experience {

    id: string;

    source: string;

    description: string;

    timestamp: number;

}

export class ExperienceCollector {

    private readonly experiences: Experience[] = [];

    /**
     * Record experience.
     */
    public collect(

        experience: Experience

    ): void {

        this.experiences.push(experience);

    }

    /**
     * List experiences.
     */
    public getAll(): Experience[] {

        return [...this.experiences];

    }

    /**
     * Count experiences.
     */
    public count(): number {

        return this.experiences.length;

    }

}

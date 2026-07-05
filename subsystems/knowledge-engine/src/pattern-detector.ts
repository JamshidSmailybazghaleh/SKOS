/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Learning Engine
 * Module    : Pattern Detector
 *
 * Build     : BUILD-000059
 * Sprint    : Sprint 05
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { Feedback } from "./feedback-collector";

export interface LearningPattern {

    id: string;

    category: string;

    occurrences: number;

    confidence: number;

}

export class PatternDetector {

    /**
     * Detect recurring patterns from feedback.
     */
    public detect(

        feedbacks: Feedback[]

    ): LearningPattern[] {

        const counter = new Map<string, number>();

        for (const feedback of feedbacks) {

            const key = feedback.category;

            counter.set(

                key,

                (counter.get(key) ?? 0) + 1

            );

        }

        const patterns: LearningPattern[] = [];

        counter.forEach((count, category) => {

            patterns.push({

                id: `PATTERN-${category}`,

                category,

                occurrences: count,

                confidence: Math.min(count / 10, 1)

            });

        });

        return patterns;

    }

}

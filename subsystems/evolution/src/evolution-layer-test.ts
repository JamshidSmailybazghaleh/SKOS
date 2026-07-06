/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000135
 * Sprint: Sprint 20
 *
 * Evolution Layer Integration Test
 * ==========================================================
 */

import { ExperienceCollector } from "../../learning/src/experience-collector";
import { FeedbackEngine } from "../../learning/src/feedback-engine";
import { SelfEvolutionEngine } from "./self-evolution-engine";

export class EvolutionLayerIntegrationTest {

    public run(): boolean {

        const experiences =
            new ExperienceCollector();

        experiences.collect({

            id: "EXP-001",

            source: "Execution",

            description: "Workflow completed.",

            timestamp: Date.now()

        });

        const feedback =
            new FeedbackEngine();

        feedback.record({

            id: "FDB-001",

            source: "Agent",

            score: 82,

            comment: "Execution successful.",

            timestamp: Date.now()

        });

        const evolution =
            new SelfEvolutionEngine();

        const suggestions =
            evolution.analyze(

                feedback.averageScore()

            );

        return (

            experiences.count() === 1 &&

            feedback.averageScore() > 0 &&

            suggestions.length > 0

        );

    }

}

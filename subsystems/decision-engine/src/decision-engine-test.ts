/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Decision Engine
 *
 * Build     : BUILD-000075
 * Sprint    : Sprint 08
 * Version   : 0.0.1
 *
 * Status    : Integration Test
 * ==========================================================
 */

import {
    DecisionEngine
} from "./decision-engine";

import {
    DecisionEvaluator
} from "./decision-evaluator";

import {
    DecisionPolicyManager
} from "./decision-policy-manager";

import {
    DecisionService
} from "./decision-service";

export class DecisionEngineTest {

    public run(): boolean {

        const policyManager = new DecisionPolicyManager();

        policyManager.add({

            id: "POLICY-001",

            name: "Default Policy",

            description: "Integration Test",

            weight: 1,

            enabled: true

        });

        const evaluator = new DecisionEvaluator();

        const engine = new DecisionEngine();

        const service = new DecisionService(

            engine,

            evaluator,

            policyManager

        );

        const result = service.decide([

            {

                id: "OPTION-001",

                title: "Option A",

                score: 20

            },

            {

                id: "OPTION-002",

                title: "Option B",

                score: 80

            }

        ]);

        return result.selected.id === "OPTION-002";

    }

}

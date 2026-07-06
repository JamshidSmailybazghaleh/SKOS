/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Build : BUILD-000115
 * Sprint: Sprint 16
 *
 * Reasoning Layer Integration Test
 * ==========================================================
 */

import { RuleEngine } from "./rule-engine";
import { ReasoningEngine } from "./reasoning-engine";
import { DecisionEngine } from "./decision-engine";
import { Planner } from "./planner";

export class ReasoningLayerIntegrationTest {

    public run(): boolean {

        const rules = new RuleEngine();

        rules.register({

            id: "RULE-001",

            name: "Knowledge Exists",

            description: "At least one fact exists.",

            enabled: true,

            evaluate(facts: string[]) {

                return facts.length > 0;

            }

        });

        const activeRules = rules.evaluate([

            "Knowledge Graph",

            "Reasoning"

        ]);

        const reasoning = new ReasoningEngine();

        const reasoningResult = reasoning.evaluate({

            facts: [

                "Knowledge Graph",

                "Reasoning"

            ]

        });

        const decision = new DecisionEngine();

        const decisionResult = decision.decide({

            reasoningSuccessful:

                reasoningResult.success,

            conclusion:

                reasoningResult.conclusion

        });

        const planner = new Planner();

        const plan = planner.createPlan(

            decisionResult.decision

        );

        return (

            activeRules.length === 1 &&

            reasoningResult.success &&

            decisionResult.accepted &&

            plan.steps.length === 1

        );

    }

}

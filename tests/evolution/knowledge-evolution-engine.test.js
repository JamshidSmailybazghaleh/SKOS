/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Knowledge Evolution Engine
 * File : knowledge-evolution-engine.test.js
 *
 * Build : BUILD-000701.1
 * Version : 1.0.0
 * ==========================================================
 */

const KnowledgeEvolutionEngine =
    require("../../src/evolution/knowledge-evolution-engine");


describe("Knowledge Evolution Engine Tests", () => {

    let engine;

    beforeEach(() => {

        engine =
            new KnowledgeEvolutionEngine();

    });


    test("Should create evolution engine", () => {

        expect(engine).toBeDefined();

        expect(engine.name)
            .toBe("Knowledge Evolution Engine");

    });


    test("Should add evolution rule", () => {

        const rule =
            () => ({ id: "EV-001" });

        expect(engine.addRule(rule))
            .toBe(true);

        expect(engine.rules.length)
            .toBe(1);

    });


    test("Should reject invalid evolution rule", () => {

        expect(() =>

            engine.addRule("invalid")

        ).toThrow();

    });


    test("Should generate evolution result", () => {

        engine.addRule(

            (context) => {

                if (context.maturity > 80) {

                    return {

                        id: "EV-001",

                        version: "2.0",

                        action: "CREATE_NEXT_VERSION"

                    };

                }

            }

        );

        const result =
            engine.evolve({

                maturity: 90

            });

        expect(result.length)
            .toBe(1);

        expect(result[0].id)
            .toBe("EV-001");

    });


    test("Should store evolution history", () => {

        engine.addRule(

            () => ({

                id: "EV-HISTORY"

            })

        );

        engine.evolve({});

        expect(engine.getEvolutionHistory().length)
            .toBe(1);

    });


    test("Should store evolution results", () => {

        engine.addRule(

            () => ({

                id: "EV-RESULT"

            })

        );

        engine.evolve({});

        expect(engine.getEvolutionResults().length)
            .toBe(1);

    });


    test("Should execute multiple evolution rules", () => {

        engine.addRule(

            () => ({ id: "EV-A" })

        );

        engine.addRule(

            () => ({ id: "EV-B" })

        );

        const result =
            engine.evolve({});

        expect(result.length)
            .toBe(2);

    });


    test("Should clear evolution engine", () => {

        engine.addRule(

            () => ({ id: "EV-CLEAR" })

        );

        engine.evolve({});

        expect(engine.clear())
            .toBe(true);

        expect(engine.rules.length)
            .toBe(0);

        expect(engine.getEvolutionHistory().length)
            .toBe(0);

        expect(engine.getEvolutionResults().length)
            .toBe(0);

    });


    test("Should return evolution status", () => {

        const status =
            engine.getStatus();

        expect(status.status)
            .toBe("READY");

        expect(status.rules)
            .toBe(0);

        expect(status.evolutions)
            .toBe(0);

        expect(status.history)
            .toBe(0);

    });

});

/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Test : Knowledge Adaptation Engine
 * File : knowledge-adaptation-engine.test.js
 *
 * Build : BUILD-000700.10
 * Version : 1.0.0
 * ==========================================================
 */

const KnowledgeAdaptationEngine =
    require("../../src/adaptation/knowledge-adaptation-engine");


describe("Knowledge Adaptation Engine Tests", () => {

    let engine;

    beforeEach(() => {

        engine =
            new KnowledgeAdaptationEngine();

    });


    test("Should create adaptation engine", () => {

        expect(engine).toBeDefined();

        expect(engine.name)
            .toBe("Knowledge Adaptation Engine");

    });


    test("Should add adaptation rule", () => {

        const rule =
            () => ({ type: "UPDATED" });

        expect(engine.addRule(rule))
            .toBe(true);

        expect(engine.rules.length)
            .toBe(1);

    });


    test("Should reject invalid rule", () => {

        expect(() =>

            engine.addRule("invalid")

        ).toThrow();

    });


    test("Should execute adaptation", () => {

        engine.addRule(

            () => ({

                type: "RELATION_UPDATED",

                action: "Increase Weight"

            })

        );

        const result =
            engine.adapt({

                frequency: 15

            });

        expect(result.length)
            .toBe(1);

        expect(result[0].type)
            .toBe("RELATION_UPDATED");

    });


    test("Should record adaptation history", () => {

        engine.addRule(

            () => ({

                type: "TEST"

            })

        );

        engine.adapt({});

        expect(engine.getHistory().length)
            .toBe(1);

    });


    test("Should store adaptations", () => {

        engine.addRule(

            () => ({

                type: "STORE"

            })

        );

        engine.adapt({});

        expect(

            engine.getAdaptations().length

        ).toBe(1);

    });


    test("Should clear adaptation data", () => {

        engine.addRule(

            () => ({

                type: "CLEAR"

            })

        );

        engine.adapt({});

        expect(engine.clear())
            .toBe(true);

        expect(engine.rules.length)
            .toBe(0);

        expect(engine.getHistory().length)
            .toBe(0);

        expect(engine.getAdaptations().length)
            .toBe(0);

    });


    test("Should return engine status", () => {

        const status =
            engine.getStatus();

        expect(status.status)
            .toBe("READY");

        expect(status.rules)
            .toBe(0);

        expect(status.adaptations)
            .toBe(0);

        expect(status.history)
            .toBe(0);

    });

});

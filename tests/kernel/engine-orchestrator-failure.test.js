const EngineOrchestrator =
    require("../../src/kernel/engine-orchestrator");

describe("FSP-005 — Engine Orchestrator Failure Propagation", () => {

    test("should propagate engine initialization failure to monitoring", () => {

        const monitoring = {
            updateHealth: jest.fn(),
            recordEvent: jest.fn()
        };

        const orchestrator =
            new EngineOrchestrator({ monitoring });

        const failingEngine = {
            initialize: jest.fn(() => {
                throw new Error("BOOT_FAILURE");
            })
        };

        orchestrator.registerEngine(
            "FAIL_ENGINE",
            failingEngine
        );

        expect(() => {
            orchestrator.startAll();
        }).toThrow("BOOT_FAILURE");

        expect(
            monitoring.updateHealth
        ).toHaveBeenCalledWith(
            "FAIL_ENGINE",
            "FAILED"
        );

        expect(
            monitoring.recordEvent
        ).toHaveBeenCalledWith(
            "ENGINE_FAILED",
            expect.objectContaining({
                engineId: "FAIL_ENGINE"
            })
        );
    });

    test("should preserve successful engine behavior", () => {

        const monitoring = {
            updateHealth: jest.fn(),
            recordEvent: jest.fn()
        };

        const orchestrator =
            new EngineOrchestrator({ monitoring });

        const engine = {
            initialize: jest.fn()
        };

        orchestrator.registerEngine(
            "TEST_ENGINE",
            engine
        );

        orchestrator.startAll();

        expect(
            monitoring.updateHealth
        ).toHaveBeenCalledWith(
            "TEST_ENGINE",
            "HEALTHY"
        );

        expect(
            monitoring.recordEvent
        ).toHaveBeenCalledWith(
            "ENGINE_STARTED",
            {
                engineId: "TEST_ENGINE"
            }
        );
    });

    test("should preserve operation without monitoring", () => {

        const orchestrator =
            new EngineOrchestrator();

        const engine = {
            initialize: jest.fn()
        };

        orchestrator.registerEngine(
            "TEST_ENGINE",
            engine
        );

        expect(() => {
            orchestrator.startAll();
        }).not.toThrow();
    });

});

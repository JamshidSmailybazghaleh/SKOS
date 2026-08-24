const EngineOrchestrator =
    require("../../src/kernel/engine-orchestrator");

describe("FSP-006-A — Engine Orchestrator Recovery Contract", () => {

    test("should recover a failed engine and propagate HEALTHY state", () => {

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
            "RECOVER_ENGINE",
            engine
        );

        const result =
            orchestrator.recoverEngine("RECOVER_ENGINE");

        expect(result).toBe(true);

        expect(
            engine.initialize
        ).toHaveBeenCalledTimes(1);

        expect(
            monitoring.updateHealth
        ).toHaveBeenCalledWith(
            "RECOVER_ENGINE",
            "HEALTHY"
        );

        expect(
            monitoring.recordEvent
        ).toHaveBeenCalledWith(
            "ENGINE_RECOVERED",
            expect.objectContaining({
                engineId: "RECOVER_ENGINE"
            })
        );
    });

    test("should propagate recovery failure as FAILED", () => {

        const monitoring = {
            updateHealth: jest.fn(),
            recordEvent: jest.fn()
        };

        const orchestrator =
            new EngineOrchestrator({ monitoring });

        const engine = {
            initialize: jest.fn(() => {
                throw new Error("RECOVERY_FAILURE");
            })
        };

        orchestrator.registerEngine(
            "BROKEN_ENGINE",
            engine
        );

        expect(() => {
            orchestrator.recoverEngine("BROKEN_ENGINE");
        }).toThrow("RECOVERY_FAILURE");

        expect(
            monitoring.updateHealth
        ).toHaveBeenCalledWith(
            "BROKEN_ENGINE",
            "FAILED"
        );

        expect(
            monitoring.recordEvent
        ).toHaveBeenCalledWith(
            "ENGINE_RECOVERY_FAILED",
            expect.objectContaining({
                engineId: "BROKEN_ENGINE"
            })
        );
    });

    test("should reject unknown engine", () => {

        const orchestrator =
            new EngineOrchestrator();

        expect(() => {
            orchestrator.recoverEngine("UNKNOWN_ENGINE");
        }).toThrow();
    });

});

const EngineOrchestrator =
    require("../../src/kernel/engine-orchestrator");

const MonitoringEngine =
    require("../../src/monitoring/monitoring-engine");

describe("FSP-006-C — Live Recovery Integration", () => {

    test("should recover a failed engine through real monitoring", () => {

        const monitoring =
            new MonitoringEngine();

        monitoring.initialize();

        let attempts = 0;

        const engine = {
            initialize: jest.fn(() => {
                attempts++;

                if (attempts === 1) {
                    throw new Error("BOOT_FAILURE");
                }

                return true;
            })
        };

        const orchestrator =
            new EngineOrchestrator({
                monitoring
            });

        orchestrator.registerEngine(
            "RECOVERY_ENGINE",
            engine
        );

        expect(() => {
            orchestrator.startAll();
        }).toThrow("BOOT_FAILURE");

        const failedHealth =
            monitoring.getHealth()
                .find(item =>
                    Array.isArray(item) &&
                    item[0] === "RECOVERY_ENGINE"
                );

        expect(failedHealth[1].state)
            .toBe("FAILED");

        const result =
            orchestrator.recoverEngine(
                "RECOVERY_ENGINE"
            );

        expect(result)
            .toBe(true);

        const recoveredHealth =
            monitoring.getHealth()
                .find(item =>
                    Array.isArray(item) &&
                    item[0] === "RECOVERY_ENGINE"
                );

        expect(recoveredHealth[1].state)
            .toBe("HEALTHY");

        const events =
            monitoring.getEvents();

        expect(
            events.some(event =>
                event.event === "ENGINE_FAILED" &&
                event.metadata &&
                event.metadata.engineId ===
                    "RECOVERY_ENGINE"
            )
        ).toBe(true);

        expect(
            events.some(event =>
                event.event === "ENGINE_RECOVERED" &&
                event.metadata &&
                event.metadata.engineId ===
                    "RECOVERY_ENGINE"
            )
        ).toBe(true);

        expect(
            engine.initialize
        ).toHaveBeenCalledTimes(2);
    });

});

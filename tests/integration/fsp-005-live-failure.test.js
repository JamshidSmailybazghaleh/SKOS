const EngineOrchestrator =
    require("../../src/kernel/engine-orchestrator");

const MonitoringEngine =
    require("../../src/monitoring/monitoring-engine");

describe("FSP-005 — Live Failure Propagation Integration", () => {

    test("should propagate real engine failure into real monitoring", () => {

        const monitoring =
            new MonitoringEngine();

        monitoring.initialize();

        const orchestrator =
            new EngineOrchestrator({
                monitoring
            });

        const failingEngine = {

            initialize() {
                throw new Error("FSP-005-LIVE-BOOT-FAILURE");
            }

        };

        orchestrator.registerEngine(
            "FAIL_ENGINE",
            failingEngine
        );

        expect(() => {
            orchestrator.startAll();
        }).toThrow("FSP-005-LIVE-BOOT-FAILURE");

        const health =
            monitoring.getHealth();

        const failed =
            health.find(
                item =>
                    Array.isArray(item)
                        ? item[0] === "FAIL_ENGINE"
                        : item.id === "FAIL_ENGINE"
            );

        expect(failed).toBeTruthy();

        const events =
            monitoring.getEvents();

        expect(
            events.some(
                event =>
                    event.event === "ENGINE_FAILED" &&
                    event.metadata &&
                    event.metadata.engineId === "FAIL_ENGINE"
            )
        ).toBe(true);

    });

});

const MonitoringHTTPBridge =
    require("../../src/monitoring/monitoring-http-bridge");

const MonitoringEngine =
    require("../../src/monitoring/monitoring-engine");

const EngineOrchestrator =
    require("../../src/kernel/engine-orchestrator");

const http =
    require("http");

describe("FSP-006-D — HTTP Recovery Observability", () => {

    let monitoring;
    let orchestrator;
    let bridge;

    beforeAll(async () => {

        monitoring =
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

        orchestrator =
            new EngineOrchestrator({
                monitoring
            });

        orchestrator.registerEngine(
            "HTTP_RECOVERY_ENGINE",
            engine
        );

        try {
            orchestrator.startAll();
        } catch (error) {
            // Expected first boot failure.
        }

        orchestrator.recoverEngine(
            "HTTP_RECOVERY_ENGINE"
        );

        bridge =
            new MonitoringHTTPBridge({
                port: 18787,
                monitoring
            });

        await bridge.start();
    });

    afterAll(async () => {

        if (bridge) {
            await bridge.stop();
        }
    });

    test("should expose failure and recovery events over HTTP", async () => {

        const port =
            bridge.server.address().port;

        const result =
            await new Promise((resolve, reject) => {

                const req =
                    http.get(
                        `http://127.0.0.1:${port}/api/monitoring/events`,
                        res => {

                            let body = "";

                            res.on(
                                "data",
                                chunk => {
                                    body += chunk;
                                }
                            );

                            res.on(
                                "end",
                                () => {
                                    resolve({
                                        statusCode:
                                            res.statusCode,
                                        body
                                    });
                                }
                            );
                        }
                    );

                req.on(
                    "error",
                    reject
                );
            });

        expect(result.statusCode)
            .toBe(200);

        const events =
            JSON.parse(result.body);

        expect(
            events.some(event =>
                event.event === "ENGINE_FAILED" &&
                event.metadata &&
                event.metadata.engineId ===
                    "HTTP_RECOVERY_ENGINE"
            )
        ).toBe(true);

        expect(
            events.some(event =>
                event.event === "ENGINE_RECOVERED" &&
                event.metadata &&
                event.metadata.engineId ===
                    "HTTP_RECOVERY_ENGINE"
            )
        ).toBe(true);
    });
});

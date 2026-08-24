const MonitoringHTTPBridge =
    require("../../src/monitoring/monitoring-http-bridge");

const http = require("http");

describe("FSP-004-A — Monitoring HTTP Event Observability", () => {

    let bridge;

    beforeAll(async () => {

        const monitoring = {
            getStatus: () => ({
                name: "Monitoring Engine",
                version: "1.0.0",
                status: "INITIALIZED",
                components: 1,
                events: 1
            }),

            getHealth: () => [],

            getMetrics: () => [],

            getStatistics: () => ({
                components: 1,
                events: 1,
                metrics: 0,
                healthChecks: 1,
                alerts: 0
            }),

            getEvents: () => [
                {
                    event: "ENGINE_STARTED",
                    metadata: {
                        engineId: "TEST_ENGINE"
                    }
                }
            ],

            getAlerts: () => []
        };

        bridge = new MonitoringHTTPBridge({
            host: "127.0.0.1",
            port: 18787,
            monitoring
        });

        await bridge.start();
    });

    afterAll(async () => {
        await bridge.stop();
    });

    test("should expose monitoring events over HTTP", async () => {

        const result = await new Promise((resolve, reject) => {

            http.get(
                "http://127.0.0.1:18787/api/monitoring/events",
                response => {

                    let body = "";

                    response.on(
                        "data",
                        chunk => body += chunk
                    );

                    response.on(
                        "end",
                        () => resolve({
                            statusCode: response.statusCode,
                            body
                        })
                    );

                }
            ).on("error", reject);

        });

        expect(result.statusCode).toBe(200);

        const events = JSON.parse(result.body);

        expect(Array.isArray(events)).toBe(true);

        expect(events).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    event: "ENGINE_STARTED"
                })
            ])
        );
    });
});

const http = require("http");

const MonitoringAPI = require("./monitoring-api");
const MonitoringDashboardBridge = require("./monitoring-dashboard-bridge");
const OperationalDashboardAdapter = require("./operational-dashboard-adapter");

class MonitoringHTTPBridge {
    constructor(options = {}) {
        this.name = "SKOS Monitoring HTTP Bridge";
        this.version = "1.0.0";
        this.host = options.host || "127.0.0.1";
        this.port = options.port || 8787;
        this.monitoring = options.monitoring || null;

        this.monitoringAPI = null;
        this.dashboardBridge = null;
        this.dashboardAdapter = null;
        this.server = null;
    }

    initialize() {
        this.monitoringAPI = new MonitoringAPI();
        this.monitoringAPI.attach(
            this.monitoring
        );

        if (!this.monitoringAPI.monitoring) {
            throw new Error("SKOS Monitoring Engine is not exposed.");
        }

        this.dashboardBridge =
            new MonitoringDashboardBridge(this.monitoringAPI);

        this.dashboardBridge.initialize();

        this.dashboardAdapter =
            new OperationalDashboardAdapter(this.dashboardBridge);

        this.dashboardAdapter.initialize();

        return true;
    }

    getStatus() {
        return this.monitoringAPI.getRuntimeStatus();
    }

    getDashboard() {
        return this.dashboardAdapter.getOperationalModel();
    }

    start() {
        if (!this.monitoringAPI) {
            this.initialize();
        }

        if (this.server) {
            return Promise.resolve(true);
        }

        this.server = http.createServer((req, res) => {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");

            if (req.method !== "GET") {
                res.writeHead(405);
                return res.end(
                    JSON.stringify({ error: "Method Not Allowed" })
                );
            }

            if (req.url === "/api/monitoring/status") {
                res.writeHead(200);
                return res.end(
                    JSON.stringify(this.getStatus())
                );
            }

            if (req.url === "/api/monitoring/dashboard") {
                res.writeHead(200);
                return res.end(
                    JSON.stringify(this.getDashboard())
                );
            }

            if (req.url === "/api/monitoring/events") {
                res.writeHead(200);
                return res.end(
                    JSON.stringify(
                        this.monitoringAPI.getEvents()
                    )
                );
            }

            res.writeHead(404);
            res.end(
                JSON.stringify({ error: "Not Found" })
            );
        });

        return new Promise((resolve, reject) => {
            const server = this.server;

            const onError = (error) => {
                server.removeListener("listening", onListening);
                this.server = null;
                reject(error);
            };

            const onListening = () => {
                server.removeListener("error", onError);
                resolve(true);
            };

            server.once("error", onError);
            server.once("listening", onListening);

            server.listen(
                this.port,
                this.host
            );
        });
    }

    stop() {
        if (!this.server) {
            return Promise.resolve(true);
        }

        const server = this.server;
        this.server = null;

        return new Promise((resolve, reject) => {
            server.close((error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(true);
            });
        });
    }
}

module.exports = MonitoringHTTPBridge;

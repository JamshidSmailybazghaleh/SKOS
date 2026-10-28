const http = require("http");

class CommerceAPI {
    constructor(options = {}) {
        this.orderEngine = options.orderEngine || null;
        this.gateway = options.gateway || null;
        this.host = options.host || "127.0.0.1";
        this.port = options.port || 4782;
        this.server = null;
        this.status = "CREATED";
    }

    initialize() {
        if (!this.orderEngine) {
            throw new Error("Order Engine not attached.");
        }

        this.status = "INITIALIZED";
        return true;
    }

    async handle(req, res) {
        try {
            const url = new URL(
                req.url,
                `http://${this.host}:${this.port}`
            );

            if (req.method === "OPTIONS") {
                return this.respond(res, 204, null);
            }

            if (
                req.method === "GET" &&
                url.pathname === "/commerce/status"
            ) {
                return this.respond(res, 200, {
                    status: "success",
                    result: {
                        service: "Commerce API",
                        status: this.status,
                        orderEngine: this.orderEngine.getStatus()
                    }
                });
            }

            if (
                req.method === "POST" &&
                url.pathname === "/commerce/orders"
            ) {
                const body = await this.readBody(req);

                const request = this.gateway
                    ? this.gateway.handleRequest(
                        "/commerce/orders",
                        body
                    )
                    : null;

                const result = request
                    ? request.response
                    : this.orderEngine.createOrder(body);

                return this.respond(res, 201, {
                    status: "success",
                    result
                });
            }

            return this.respond(res, 404, {
                status: "error",
                message: "Unknown commerce endpoint."
            });
        } catch (error) {
            return this.respond(res, 500, {
                status: "error",
                message: error.message
            });
        }
    }

    start() {
        if (this.server) {
            return true;
        }

        this.server = http.createServer(
            this.handle.bind(this)
        );

        this.server.listen(
            this.port,
            this.host
        );

        this.status = "RUNNING";
        return true;
    }

    readBody(req) {
        return new Promise((resolve, reject) => {
            let data = "";

            req.on("data", chunk => {
                data += chunk;
            });

            req.on("end", () => {
                try {
                    resolve(
                        data ? JSON.parse(data) : {}
                    );
                } catch (error) {
                    reject(
                        new Error("Invalid JSON body.")
                    );
                }
            });

            req.on("error", reject);
        });
    }

    respond(res, statusCode, payload) {
        res.writeHead(statusCode, {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
                "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers":
                "Content-Type"
        });

        res.end(
            payload === null
                ? ""
                : JSON.stringify(payload)
        );
    }
}

module.exports = CommerceAPI;

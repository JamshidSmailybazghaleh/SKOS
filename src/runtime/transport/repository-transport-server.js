const http = require("http");

class RepositoryTransportServer {
    constructor(options = {}) {
        this.connector = options.connector || null;
        this.host = options.host || "127.0.0.1";
        this.port = options.port ?? 4780;
        this.server = null;
        this.status = "CREATED";
    }

    attachConnector(connector) {
        this.connector = connector;
        return true;
    }

    async handle(req, res) {
        try {
            if (!this.connector) {
                throw new Error("SDKC Runtime Connector not attached.");
            }

            const url = new URL(
                req.url,
                `http://${this.host}:${this.port}`
            );

            const parts = url.pathname.split("/").filter(Boolean);

            if (parts[0] !== "repository") {
                return this.respond(res, 404, {
                    status: "error",
                    message: "Unknown endpoint."
                });
            }

            if (req.method === "GET" && parts[1] === "status") {
                return this.respond(res, 200, {
                    status: "success",
                    result: this.connector.getStatus()
                });
            }

            if (
                req.method === "POST" &&
                parts[1] === "synchronize" &&
                parts.length === 2
            ) {
                return this.respond(res, 200, {
                    status: "success",
                    result: this.connector.synchronizeRepository()
                });
            }


            if (
                req.method === "GET" &&
                parts.length === 3 &&
                parts[1] === "assets" &&
                parts[2] === "file"
            ) {
                const rootName = url.searchParams.get("root");
                const relativePath = url.searchParams.get("path");

                const asset =
                    this.connector.resolveAsset(
                        relativePath,
                        rootName
                    );

                const mimeTypes = {
                    ".jpg": "image/jpeg",
                    ".jpeg": "image/jpeg",
                    ".png": "image/png",
                    ".gif": "image/gif",
                    ".webp": "image/webp",
                    ".svg": "image/svg+xml",
                    ".mp4": "video/mp4",
                    ".webm": "video/webm",
                    ".mov": "video/quicktime",
                    ".mp3": "audio/mpeg",
                    ".wav": "audio/wav",
                    ".ogg": "audio/ogg",
                    ".pdf": "application/pdf",
                    ".txt": "text/plain; charset=utf-8",
                    ".md": "text/markdown; charset=utf-8",
                    ".html": "text/html; charset=utf-8"
                };

                const extension =
                    require("path")
                        .extname(asset.filePath)
                        .toLowerCase();

                const contentType =
                    mimeTypes[extension] ||
                    "application/octet-stream";

                res.writeHead(200, {
                    "Content-Type": contentType,
                    "Content-Length": asset.size,
                    "Content-Disposition":
                        `inline; filename="${asset.name.replace(/"/g, "")}"`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                        "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers":
                        "Content-Type"
                });

                return require("fs")
                    .createReadStream(asset.filePath)
                    .pipe(res);
            }

            if (
                req.method === "GET" &&
                parts.length === 2 &&
                parts[1] === "assets"
            ) {
                return this.respond(res, 200, {
                    status: "success",
                    result: this.connector.listAssets()
                });
            }


            if (req.method === "GET" && parts.length === 1) {
                return this.respond(res, 200, {
                    status: "success",
                    result: this.connector.listKnowledgeObjects()
                });
            }

            if (
                req.method === "GET" &&
                parts.length === 3 &&
                parts[2] === "exists"
            ) {
                return this.respond(res, 200, {
                    status: "success",
                    result: this.connector.existsKnowledgeObject(
                        parts[1]
                    )
                });
            }

            if (
                req.method === "GET" &&
                parts.length === 3 &&
                parts[2] === "content"
            ) {
                return this.respond(res, 200, {
                    status: "success",
                    result: this.connector.loadKnowledgeObjectContent(
                        parts[1]
                    )
                });
            }


            if (req.method === "GET" && parts.length === 2) {
                return this.respond(res, 200, {
                    status: "success",
                    result: this.connector.loadKnowledgeObject(parts[1])
                });
            }

            const body = await this.readBody(req);

            if (req.method === "POST" && parts.length === 1) {
                return this.respond(res, 200, {
                    status: "success",
                    result: this.connector.saveKnowledgeObject(body)
                });
            }

            if (req.method === "PUT" && parts.length === 2) {
                return this.respond(res, 200, {
                    status: "success",
                    result: this.connector.updateKnowledgeObject(
                        parts[1],
                        body
                    )
                });
            }

            if (
                req.method === "DELETE" &&
                parts.length === 2
            ) {
                return this.respond(res, 200, {
                    status: "success",
                    result: this.connector.removeKnowledgeObject(
                        parts[1]
                    )
                });
            }

            return this.respond(res, 405, {
                status: "error",
                message: "Method not supported."
            });

        } catch (error) {
            return this.respond(res, 500, {
                status: "error",
                message: error.message
            });
        }
    }

    readBody(req) {
        return new Promise((resolve, reject) => {
            let data = "";

            req.on("data", chunk => {
                data += chunk;
            });

            req.on("end", () => {
                if (!data) {
                    resolve({});
                    return;
                }

                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    reject(new Error("Invalid JSON payload."));
                }
            });

            req.on("error", reject);
        });
    }

    respond(res, statusCode, payload) {
        res.writeHead(statusCode, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        });

        res.end(JSON.stringify(payload));
    }

    async initialize() {
        if (this.server) {
            return true;
        }

        const server =
            http.createServer(
                this.handle.bind(this)
            );

        this.server = server;
        this.status = "STARTING";

        await new Promise((resolve, reject) => {
            const onError = error => {
                server.removeListener(
                    "listening",
                    onListening
                );

                this.server = null;
                this.status = "FAILED";

                reject(error);
            };

            const onListening = () => {
                server.removeListener(
                    "error",
                    onError
                );

                this.status = "RUNNING";

                resolve();
            };

            server.once(
                "error",
                onError
            );

            server.once(
                "listening",
                onListening
            );

            server.listen(
                this.port,
                this.host
            );
        });

        return true;
    }

    async shutdown() {
        if (!this.server) {
            this.status = "STOPPED";
            return true;
        }

        const server = this.server;

        await new Promise((resolve, reject) => {
            server.close(error => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });

        this.server = null;
        this.status = "STOPPED";

        return true;
    }

    getStatus() {
        return {
            status: this.status,
            host: this.host,
            port: this.port,
            transport: "HTTP",
            authority: "SDKC Runtime Connector"
        };
    }
}

module.exports = RepositoryTransportServer;

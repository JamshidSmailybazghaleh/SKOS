const http = require("http");
const fs = require("fs");
const path = require("path");

const HOST = "127.0.0.1";
const PORT = 4781;
const ROOT = path.resolve(__dirname, "..");

const MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon"
};

function createWebServer(launcher = null) {
    const server = http.createServer((req, res) => {
        let requestPath =
            decodeURIComponent(req.url.split("?")[0]);

        if (requestPath === "/api/monitoring") {
            if (
                !launcher ||
                !launcher.dashboardAdapter ||
                typeof launcher.dashboardAdapter.getOperationalModel !== "function"
            ) {
                res.writeHead(503, {
                    "Content-Type":
                        "application/json; charset=utf-8",
                    "Cache-Control": "no-store",
                    "Access-Control-Allow-Origin": "*"
                });

                return res.end(JSON.stringify({
                    status: "UNAVAILABLE"
                }));
            }

            try {
                const model =
                    launcher.dashboardAdapter
                        .getOperationalModel();

                res.writeHead(200, {
                    "Content-Type":
                        "application/json; charset=utf-8",
                    "Cache-Control": "no-store",
                    "Access-Control-Allow-Origin": "*"
                });

                return res.end(JSON.stringify(model));
            } catch (error) {
                res.writeHead(503, {
                    "Content-Type":
                        "application/json; charset=utf-8",
                    "Cache-Control": "no-store",
                    "Access-Control-Allow-Origin": "*"
                });

                return res.end(JSON.stringify({
                    status: "DEGRADED",
                    error: error.message
                }));
            }
        }

        if (requestPath === "/") {
            requestPath =
                "/mission-control/index.html";
        }

        if (requestPath === "/manifest.webmanifest") {
            requestPath =
                "/mission-control/manifest.webmanifest";
        } else if (requestPath === "/sw.js") {
            requestPath =
                "/mission-control/sw.js";
        }

        for (const mount of ["/assets", "/data", "/modules"]) {
            if (
                requestPath === mount ||
                requestPath.startsWith(mount + "/")
            ) {
                requestPath =
                    "/mission-control" + requestPath;
                break;
            }
        }

        const filePath =
            path.resolve(ROOT, "." + requestPath);

        if (!filePath.startsWith(ROOT + path.sep)) {
            res.writeHead(403);
            return res.end("Forbidden");
        }

        fs.stat(filePath, (err, stat) => {
            if (err || !stat.isFile()) {
                res.writeHead(404);
                return res.end("Not Found");
            }

            const type =
                MIME[
                    path.extname(filePath).toLowerCase()
                ] || "application/octet-stream";

            res.writeHead(200, {
                "Content-Type": type,
                "Cache-Control": "no-store"
            });

            fs.createReadStream(filePath).pipe(res);
        });
    });

    return server;
}

function startWebServer(launcher = null) {
    const server = createWebServer(launcher);

    return new Promise((resolve, reject) => {
        server.once("error", reject);

        server.listen(PORT, HOST, () => {
            console.log("SKOS_WEB_SERVER=RUNNING");
            console.log("SKOS_WEB_HOST=" + HOST);
            console.log("SKOS_WEB_PORT=" + PORT);
            console.log(
                "SKOS_WEB_URL=http://" +
                HOST + ":" + PORT + "/"
            );

            resolve(server);
        });
    });
}

module.exports = {
    createWebServer,
    startWebServer,
    HOST,
    PORT
};

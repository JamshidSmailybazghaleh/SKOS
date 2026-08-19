
/* BUILD-000502.45.153 — TOP LEVEL EXECUTION PROBE */
(function () {
    console.log("BUILD-000502.45.153 — TOP LEVEL JS EXECUTION: ACTIVE");

    const probe = document.createElement("div");
    probe.id = "browser-runtime-top-level-probe";

    probe.style.cssText =
        "position:fixed;" +
        "bottom:10px;" +
        "left:10px;" +
        "z-index:999999;" +
        "padding:10px 14px;" +
        "background:#111;" +
        "color:#0f0;" +
        "font:14px monospace;" +
        "border:2px solid #0f0;" +
        "border-radius:6px;";

    probe.textContent =
        "TOP LEVEL JS EXECUTION: ACTIVE";

    if (document.body) {
        document.body.appendChild(probe);
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            document.body.appendChild(probe);
        }, { once: true });
    }
})();

/*
====================================================
SKOS Mission Control
Dual-Module Browser Runtime Smoke Test
Build: BUILD-000502.45.147
Status: DIAGNOSTIC
====================================================
*/

window.addEventListener("DOMContentLoaded", async () => {

    console.log("================================");
    console.log("BUILD-000502.45.147");
    console.log("DUAL-MODULE BROWSER RUNTIME TEST");
    console.log("================================");

    const result = {
        config: typeof CONFIG !== "undefined",
        logger: typeof Logger !== "undefined",
        registry: typeof Registry !== "undefined",
        moduleLoader: typeof ModuleLoader !== "undefined",
        kernelAPI: typeof KernelAPI !== "undefined",
        kernel: typeof SKOS !== "undefined",
        bootstrap: typeof Bootstrap !== "undefined"
    };

    console.log("CORE GLOBALS:", result);

    if (!result.kernel || !result.bootstrap) {
        console.error("CORE_RUNTIME_CONTRACT: FAILED");
        return;
    }

    try {

        console.log("--- STARTING BOOT ---");

        await Bootstrap.initialize();

        console.log("--- BOOT RETURNED ---");

        const executiveContainer =
            document.getElementById(
                "executive-summary-container"
            );

        const buildContainer =
            document.getElementById(
                "build-center-container"
            );

        const runtime = {
            kernelInitialized:
                SKOS.isInitialized(),

            loadedModules:
                SKOS.getLoadedModules(),

            executiveSummaryGlobal:
                typeof window.ExecutiveSummary !== "undefined",

            buildCenterGlobal:
                typeof window.BuildCenter !== "undefined",

            executiveSummaryContainer:
                !!executiveContainer,

            buildCenterContainer:
                !!buildContainer,

            executiveSummaryRendered:
                !!(
                    executiveContainer &&
                    executiveContainer.querySelector(
                        "#executive-summary-module"
                    )
                ),

            buildCenterRendered:
                !!(
                    buildContainer &&
                    buildContainer.querySelector(
                        "#build-center-module"
                    )
                )
        };

        console.log(
            "RUNTIME RESULT:",
            runtime
        );

        const passed =
            runtime.kernelInitialized &&
            runtime.executiveSummaryGlobal &&
            runtime.buildCenterGlobal &&
            runtime.executiveSummaryContainer &&
            runtime.buildCenterContainer &&
            runtime.executiveSummaryRendered &&
            runtime.buildCenterRendered;

        if (passed) {
            console.log(
                "DUAL_MODULE_BROWSER_RUNTIME: PASSED"
            );
        } else {
            console.error(
                "DUAL_MODULE_BROWSER_RUNTIME: FAILED"
            );
        }

    } catch (error) {

        console.error(
            "DUAL_MODULE_BROWSER_RUNTIME: ERROR",
            error
        );

    }

});

window.addEventListener("DOMContentLoaded", () => {
    const probe = document.createElement("div");
    probe.id = "browser-runtime-execution-probe";
    probe.style.cssText =
        "position:fixed;bottom:10px;right:10px;" +
        "z-index:99999;padding:10px 14px;" +
        "background:#111;color:#0f0;font:14px monospace;" +
        "border:1px solid #0f0;border-radius:6px;";
    probe.textContent = "BROWSER JS EXECUTION: ACTIVE";
    document.body.appendChild(probe);
});


/* BUILD-000502.45.154 — DEPENDENCY GATE */
window.addEventListener("DOMContentLoaded", () => {
    const names = [
        "CONFIG",
        "Logger",
        "Registry",
        "ModuleLoader",
        "KernelAPI",
        "SKOS",
        "Bootstrap",
        "ExecutiveSummary",
        "BuildCenter"
    ];

    const results = names.map(name => ({
        name,
        present: typeof window[name] !== "undefined"
    }));

    const gate = document.createElement("div");
    gate.id = "browser-runtime-dependency-gate";

    gate.style.cssText =
        "position:fixed;" +
        "top:10px;" +
        "left:10px;" +
        "z-index:999999;" +
        "padding:14px 18px;" +
        "background:#111;" +
        "color:#fff;" +
        "font:13px monospace;" +
        "line-height:1.7;" +
        "border:2px solid #888;" +
        "border-radius:8px;" +
        "max-width:90vw;";

    const title =
        "<strong>BUILD-000502.45.154 — RUNTIME DEPENDENCY GATE</strong>";

    const rows = results.map(item =>
        item.name + ": " + (item.present ? "PRESENT" : "MISSING")
    );

    gate.innerHTML =
        title + "<br><br>" + rows.join("<br>");

    document.body.appendChild(gate);

    console.log(
        "BUILD-000502.45.154 — RUNTIME DEPENDENCY GATE",
        results
    );
});

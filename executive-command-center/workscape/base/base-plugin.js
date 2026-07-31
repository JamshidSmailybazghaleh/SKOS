/*
==========================================================
SKOS Framework
Base Plugin
Version : 1.0.0
BUILD : BUILD-000030
==========================================================
*/

class BasePlugin {

    constructor(config = {}) {

        this.id = config.id || null;

        this.name = config.name || "Plugin";

        this.version = config.version || "1.0.0";

        this.author = config.author || "";

        this.description = config.description || "";

        this.enabled = false;

        this.context = null;

    }

    async install(context = {}) {

        this.context = context;

        console.info(
            "[" + this.name + "] Installed"
        );

    }

    async enable() {

        this.enabled = true;

        console.info(
            "[" + this.name + "] Enabled"
        );

    }

    async disable() {

        this.enabled = false;

        console.info(
            "[" + this.name + "] Disabled"
        );

    }

    isEnabled() {

        return this.enabled;

    }

    async execute(payload = {}) {

        console.warn(
            "[" + this.name +
            "] execute() must be overridden.",
            payload
        );

    }

    async update(config = {}) {

        Object.assign(this, config);

        console.info(
            "[" + this.name + "] Updated"
        );

    }

    async uninstall() {

        this.enabled = false;

        this.context = null;

        console.info(
            "[" + this.name + "] Uninstalled"
        );

    }

}

export default BasePlugin;

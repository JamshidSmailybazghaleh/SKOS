/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Panel Registry
 * File      : panel-registry.js
 *
 * Build     : BUILD-000900.2
 * Version   : 1.0.0
 *
 * ==========================================================
 */

class PanelRegistry {

    constructor() {

        this.name = "Panel Registry";

        this.version = "1.0.0";

        this.status = "CREATED";

        this.registry = new Map();

        this.loadingSequence = [];

    }



    initialize() {

        this.status = "INITIALIZED";

        return true;

    }



    register(panel) {

        if (!panel) {

            throw new Error(
                "Panel required."
            );

        }

        if (!panel.name) {

            throw new Error(
                "Panel name required."
            );

        }

        this.registry.set(

            panel.name,

            panel

        );

        if (

            !this.loadingSequence.includes(

                panel.name

            )

        ) {

            this.loadingSequence.push(

                panel.name

            );

        }

        return true;

    }



    unregister(panelName) {

        this.loadingSequence =

            this.loadingSequence.filter(

                item =>

                    item !== panelName

            );

        return this.registry.delete(

            panelName

        );

    }



    exists(panelName) {

        return this.registry.has(

            panelName

        );

    }



    get(panelName) {

        return this.registry.get(

            panelName

        );

    }



    getAll() {

        return Array.from(

            this.registry.values()

        );

    }



    getNames() {

        return Array.from(

            this.registry.keys()

        );

    }



    getCount() {

        return this.registry.size;

    }



    getLoadingSequence() {

        return [

            ...this.loadingSequence

        ];

    }



    validate() {

        const problems = [];

        for (

            const panel

            of

            this.registry.values()

        ) {

            if (

                typeof panel.initialize !==

                "function"

            ) {

                problems.push(

                    panel.name

                );

            }

        }

        return {

            valid:

                problems.length === 0,

            problems

        };

    }



    async loadAll() {

        for (

            const panelName

            of

            this.loadingSequence

        ) {

            const panel =

                this.registry.get(

                    panelName

                );

            if (

                panel &&

                typeof panel.initialize ===

                "function"

            ) {

                await panel.initialize();

            }

        }

        return true;

    }



    async unloadAll() {

        const reverse =

            [...this.loadingSequence]

            .reverse();

        for (

            const panelName

            of

            reverse

        ) {

            const panel =

                this.registry.get(

                    panelName

                );

            if (

                panel &&

                typeof panel.shutdown ===

                "function"

            ) {

                await panel.shutdown();

            }

        }

        return true;

    }



    reset() {

        this.registry.clear();

        this.loadingSequence = [];

        return true;

    }



    shutdown() {

        this.status = "SHUTDOWN";

        return true;

    }



    getStatus() {

        return {

            name:

                this.name,

            version:

                this.version,

            status:

                this.status,

            panels:

                this.registry.size

        };

    }

}

module.exports =
PanelRegistry;

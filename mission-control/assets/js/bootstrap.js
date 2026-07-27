/*
====================================================
SKOS Mission Control

Bootstrap

File:
bootstrap.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const Bootstrap = {

    async initialize() {

        console.log(
            "================================"
        );

        console.log(
            "Bootstrap Started"
        );

        console.log(
            "================================"
        );

        try {

            if (typeof CONFIG === "undefined") {

                throw new Error(
                    "CONFIG not loaded."
                );

            }

            if (typeof SKOS === "undefined") {

                throw new Error(
                    "Kernel not loaded."
                );

            }

            await SKOS.initialize();

            console.log(
                "Bootstrap Finished."
            );

        }

        catch (error) {

    

    console.error(
        "Bootstrap Error:",
        error
    );

}

    }

};

window.addEventListener(

    "DOMContentLoaded",

    () => {

        Bootstrap.initialize();

    }

);

Object.freeze(Bootstrap);

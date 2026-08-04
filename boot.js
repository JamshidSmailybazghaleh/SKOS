const SKOS = require("./src/skos");

(async () => {

    try {

        const report =
            await SKOS.start();

        console.log(report);

    } catch (error) {

        console.error(error);

    }

})();

/*
====================================================
SKOS Mission Control

Configuration Service

BUILD-000387

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class ConfigurationService {


    constructor() {

        this.configurations = new Map();

        this.featureFlags = new Map();

        this.initialized = false;

    }



    async initialize() {

        Logger.info(

            "Configuration Service Initializing..."

        );


        this.loadDefaultConfiguration();


        this.initialized = true;


        return true;

    }



    set(

        component,

        key,

        value,

        environment = "default"

    ) {


        const configId =

            "CFG-" + Date.now();



        const configuration = {


            configId,


            component,


            key,


            value,


            environment,


            status:

                "ACTIVE",


            updatedAt:

                new Date().toISOString()

        };



        this.configurations.set(

            `${component}.${key}.${environment}`,

            configuration

        );



        AuditService.record(

            "CONFIG_UPDATED",

            configuration

        );



        return configuration;

    }




    get(

        component,

        key,

        environment = "default"

    ) {


        return this.configurations.get(

            `${component}.${key}.${environment}`

        );

    }





    enableFeature(

        featureName

    ) {


        this.featureFlags.set(

            featureName,

            true

        );


        return true;

    }





    disableFeature(

        featureName

    ) {


        this.featureFlags.set(

            featureName,

            false

        );


        return true;

    }





    isFeatureEnabled(

        featureName

    ) {


        return (

            this.featureFlags.get(

                featureName

            ) === true

        );

    }





    loadDefaultConfiguration() {


        this.set(

            "system",

            "mode",

            "production"

        );


        this.set(

            "repository-engine",

            "autoBackup",

            true

        );


        this.enableFeature(

            "event-driven-architecture"

        );

    }





    list() {


        return Array.from(

            this.configurations.values()

        );

    }





    status() {

        return {

            initialized:

                this.initialized,


            configurations:

                this.configurations.size,


            features:

                this.featureFlags.size

        };

    }


}



window.ConfigurationService =

    new ConfigurationService();



Object.freeze(

    window.ConfigurationService

);

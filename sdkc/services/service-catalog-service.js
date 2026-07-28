/*
====================================================
SKOS Mission Control

Service Catalog Service

BUILD-000402

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class ServiceCatalogService {


    constructor() {


        this.catalog = new Map();

        this.dependencies = [];

        this.initialized = false;


    }





    async initialize() {


        Logger.info(

            "Service Catalog Service Initializing..."

        );


        this.registerDefaultServices();


        this.initialized = true;


        return true;

    }





    registerService(service) {


        const record = {


            serviceId:

                service.serviceId ||

                "SVC-" + Date.now(),


            name:

                service.name,


            category:

                service.category || "GENERAL",


            description:

                service.description || "",


            owner:

                service.owner || "SKOS",


            version:

                service.version || "1.0.0",


            status:

                "ACTIVE",


            dependencies:

                service.dependencies || [],


            createdAt:

                new Date().toISOString()


        };



        this.catalog.set(

            record.serviceId,

            record

        );



        AuditService.record(

            "SERVICE_CATALOG_REGISTERED",

            record

        );



        return record;

    }





    updateService(

        serviceId,

        updates

    ) {


        const service =

            this.catalog.get(

                serviceId

            );



        if (!service) {

            throw new Error(

                "Service Not Found."

            );

        }



        Object.assign(

            service,

            updates

        );



        service.updatedAt =

            new Date().toISOString();



        return service;

    }





    registerDependency(

        source,

        target,

        type

    ) {


        const dependency = {


            source,


            target,


            type:

                type || "DEPENDS_ON",


            createdAt:

                new Date().toISOString()

        };



        this.dependencies.push(

            dependency

        );



        return dependency;

    }





    getService(

        serviceId

    ) {


        return this.catalog.get(

            serviceId

        );

    }





    search(

        keyword

    ) {


        return Array.from(

            this.catalog.values()

        ).filter(

            service =>

            service.name

            .toLowerCase()

            .includes(

                keyword.toLowerCase()

            )

        );

    }





    listCatalog() {


        return Array.from(

            this.catalog.values()

        );

    }





    registerDefaultServices() {


        this.registerService({

            name:

                "SKOS Kernel",


            category:

                "CORE_ENGINE",


            owner:

                "SKOS Architecture Team"

        });



        this.registerService({

            name:

                "Knowledge Query Engine",


            category:

                "KNOWLEDGE_SERVICE",


            owner:

                "Knowledge Platform Team"

        });



        this.registerService({

            name:

                "Publication Engine",


            category:

                "PUBLICATION_SERVICE",


            owner:

                "Publishing Team"

        });


    }





    status() {


        return {


            initialized:

                this.initialized,


            services:

                this.catalog.size,


            dependencies:

                this.dependencies.length


        };

    }


}



window.ServiceCatalogService =

    new ServiceCatalogService();



Object.freeze(

    window.ServiceCatalogService

);

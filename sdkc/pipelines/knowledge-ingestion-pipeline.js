/*
====================================================
SKOS Mission Control

Knowledge Ingestion Pipeline

BUILD-000360

Version:
1.0

Status:
ACTIVE
====================================================
*/

const KnowledgeIngestionPipeline = {

    async ingest(source) {

        Logger.info(
            "Knowledge Ingestion Started"
        );

        /*
        =============================
        STEP 1
        Create Object
        =============================
        */

        const object =

            ObjectFactory.create(source);

        /*
        =============================
        STEP 2
        Metadata
        =============================
        */

        MetadataService.create(

            object,

            source.metadata || {}

        );

        const metadataResult =

            MetadataValidator.validate(object);

        if (!metadataResult.valid) {

            throw new Error(

                metadataResult.errors.join(",")

            );

        }

        /*
        =============================
        STEP 3
        Object Validation
        =============================
        */

        const objectResult =

            KnowledgeObjectValidator.validate(
                object
            );

        if (!objectResult.valid) {

            throw new Error(

                objectResult.errors.join(",")

            );

        }

        /*
        =============================
        STEP 4
        Identity
        =============================
        */

        await IDRegistryService.register(
            object
        );

        /*
        =============================
        STEP 5
        Integrity
        =============================
        */

        await IntegrityService.updateChecksum(
            object
        );

        /*
        =============================
        STEP 6
        Version
        =============================
        */

        VersionService.createInitialVersion(
            object
        );

        /*
        =============================
        STEP 7
        Lifecycle
        =============================
        */

        ObjectLifecycleService.changeStatus(

            object,

            "INGESTED"

        );

        /*
        =============================
        STEP 8
        Repository
        =============================
        */

        await RepositoryService.store(
            object
        );

        /*
        =============================
        STEP 9
        SDKC Index
        =============================
        */

        await RepositoryEngine.indexObject(
            object
        );

        /*
        =============================
        STEP 10
        Audit
        =============================
        */

        AuditService.record(

            "OBJECT_INGESTED",

            object

        );

        /*
        =============================
        STEP 11
        Dashboard Refresh
        =============================
        */

        if (window.DashboardService) {

            await DashboardService.getDashboard();

        }

        Logger.info(

            "Knowledge Ingestion Completed"

        );

        return object;

    }

};

window.KnowledgeIngestionPipeline =
    KnowledgeIngestionPipeline;

Object.freeze(
    KnowledgeIngestionPipeline
);

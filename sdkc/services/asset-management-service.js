/*
====================================================
SKOS Mission Control

Asset Management Service

BUILD-000403

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class AssetManagementService {


    constructor() {


        this.assets = new Map();

        this.lifecycleHistory = [];

        this.initialized = false;


    }





    async initialize() {


        Logger.info(

            "Asset Management Service Initializing..."

        );


        this.registerDefaultAssets();


        this.initialized = true;


        return true;

    }





    registerAsset(asset) {


        const record = {


            assetId:

                "AST-" + Date.now(),


            name:

                asset.name,


            type:

                asset.type || "GENERAL",


            owner:

                asset.owner || "SKOS",


            version:

                asset.version || "1.0.0",


            location:

                asset.location || "",


            status:

                "ACTIVE",


            createdAt:

                new Date().toISOString()


        };



        this.assets.set(

            record.assetId,

            record

        );



        AuditService.record(

            "ASSET_REGISTERED",

            record

        );



        EventBusService.publish(

            "ASSET_CREATED",

            record,

            "asset-management-service"

        );



        return record;

    }





    updateAsset(

        assetId,

        changes

    ) {


        const asset =

            this.assets.get(

                assetId

            );



        if (!asset) {

            throw new Error(

                "Asset Not Found."

            );

        }



        Object.assign(

            asset,

            changes

        );



        this.recordLifecycle(

            assetId,

            "UPDATED"

        );



        return asset;

    }





    changeStatus(

        assetId,

        status

    ) {


        const asset =

            this.assets.get(

                assetId

            );



        if (!asset) {

            throw new Error(

                "Asset Not Found."

            );

        }



        asset.status = status;



        this.recordLifecycle(

            assetId,

            status

        );



        AuditService.record(

            "ASSET_STATUS_CHANGED",

            {

                assetId,

                status

            }

        );


        return asset;

    }





    recordLifecycle(

        assetId,

        action

    ) {


        this.lifecycleHistory.push({


            assetId,


            action,


            timestamp:

                new Date().toISOString()


        });

    }





    findAsset(

        assetId

    ) {


        return this.assets.get(

            assetId

        );

    }





    search(

        keyword

    ) {


        return Array.from(

            this.assets.values()

        ).filter(

            asset =>

            asset.name

            .toLowerCase()

            .includes(

                keyword.toLowerCase()

            )

        );

    }





    listAssets() {


        return Array.from(

            this.assets.values()

        );

    }





    registerDefaultAssets() {


        this.registerAsset({

            name:

                "SKOS Core Repository",


            type:

                "INFRASTRUCTURE_ASSET",


            owner:

                "SKOS Architecture Team"

        });



        this.registerAsset({

            name:

                "Knowledge Object Collection",


            type:

                "KNOWLEDGE_ASSET",


            owner:

                "Knowledge Management Team"

        });


    }





    status() {


        return {


            initialized:

                this.initialized,


            assets:

                this.assets.size,


            lifecycleEvents:

                this.lifecycleHistory.length


        };

    }


}



window.AssetManagementService =

    new AssetManagementService();



Object.freeze(

    window.AssetManagementService

);

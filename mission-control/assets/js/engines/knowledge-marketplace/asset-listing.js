/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * Asset Listing
 * ------------------------------------------------------------
 * File      : asset-listing.js
 * Operation : OP-014
 * Build     : BUILD-000367
 * Version   : 1.0.0
 * Status    : ACTIVE
 * ============================================================
 *
 * Mission:
 * Manages the public presentation and marketplace listing
 * lifecycle of knowledge assets.
 *
 * Responsibilities:
 * - Convert knowledge products into marketplace listings
 * - Manage listing visibility
 * - Maintain listing metadata
 * - Control availability status
 * - Support marketplace discovery
 *
 * Principle:
 * Asset Listing creates the bridge between
 * knowledge products and market exposure.
 *
 * It does not:
 * - create knowledge
 * - process payments
 * - evaluate intellectual quality
 *
 * ============================================================
 */


class AssetListing {


    constructor(catalog = null, config = {}) {


        this.name = "AssetListing";

        this.version = "1.0.0";


        this.catalog = catalog;

        this.config = config;


        this.initialized = false;

        this.running = false;



        this.listings = new Map();

        this.history = [];



        this.statistics = {


            totalListings: 0,

            activeListings: 0,

            views: 0,

            updates: 0


        };


    }





    /**
     * Initialize Listing Service
     */
    initialize() {


        if (this.initialized) {


            return true;


        }



        this.initialized = true;



        return true;


    }





    /**
     * Execute
     */
    execute() {


        if (!this.initialized) {


            this.initialize();


        }



        this.running = true;



        return true;


    }





    /**
     * Shutdown
     */
    shutdown() {


        this.running = false;



        return true;


    }





    /**
     * Attach Product Catalog
     */
    attachCatalog(catalog) {


        this.catalog = catalog;


    }





    /**
     * Create Listing
     */
    create(productID, options = {}) {



        let product = null;



        if (this.catalog) {


            product = this.catalog.get(

                productID

            );


        }



        if (!product) {


            return null;


        }





        const listing = {


            id: this.generateID(),


            productID,


            title: product.title,


            description:

                options.description ||

                product.description,



            category:

                options.category ||

                product.category,



            visibility:

                options.visibility ||

                "PUBLIC",



            accessType:

                options.accessType ||

                "OPEN",



            pricingModel:

                options.pricingModel ||

                "FREE",



            status: "ACTIVE",



            createdAt: new Date()



        };





        this.listings.set(

            listing.id,

            listing

        );



        this.statistics.totalListings++;


        this.statistics.activeListings++;



        this.record({

            action: "LISTING_CREATED",

            listingID: listing.id


        });



        return listing;


    }





    /**
     * Update Listing
     */
    update(id, changes = {}) {



        const listing = this.listings.get(

            id

        );



        if (!listing) {


            return false;


        }



        Object.assign(

            listing,

            changes

        );



        listing.updatedAt = new Date();



        this.statistics.updates++;



        this.record({

            action: "LISTING_UPDATED",

            listingID: id


        });



        return listing;


    }





    /**
     * Activate Listing
     */
    activate(id) {


        const listing = this.listings.get(id);



        if (!listing) {


            return false;


        }



        listing.status = "ACTIVE";



        this.statistics.activeListings++;



        return true;


    }





    /**
     * Deactivate Listing
     */
    deactivate(id) {


        const listing = this.listings.get(id);



        if (!listing) {


            return false;


        }



        listing.status = "INACTIVE";



        this.statistics.activeListings--;



        return true;


    }





    /**
     * Record View
     */
    recordView(id) {


        const listing = this.listings.get(id);



        if (!listing) {


            return false;


        }



        listing.views =

            (listing.views || 0) + 1;



        this.statistics.views++;



        return true;


    }





    /**
     * Get Listing
     */
    get(id) {


        return this.listings.get(id);


    }





    /**
     * List Active Listings
     */
    listActive() {


        return Array.from(

            this.listings.values()

        ).filter(

            item => item.status === "ACTIVE"

        );


    }





    /**
     * Search Listings
     */
    search(criteria = {}) {


        return this.listActive().filter(item => {


            return Object.keys(criteria)

                .every(

                    key =>

                    item[key] === criteria[key]

                );


        });


    }





    /**
     * Record History
     */
    record(event) {


        this.history.push({


            timestamp: new Date(),


            ...event


        });


    }





    /**
     * Generate ID
     */
    generateID() {


        return (

            "listing-" +

            Date.now() +

            "-" +

            Math.floor(

                Math.random() * 100000

            )

        );


    }





    /**
     * Health Check
     */
    healthCheck() {


        return {


            component: this.name,


            version: this.version,


            initialized: this.initialized,


            running: this.running,


            listings: this.listings.size,


            statistics: this.statistics



        };


    }





    /**
     * Reset
     */
    reset() {


        this.listings.clear();

        this.history = [];



        this.statistics = {


            totalListings: 0,

            activeListings: 0,

            views: 0,

            updates: 0


        };


    }


}





/**
 * Export
 */

if (typeof module !== "undefined") {


    module.exports = AssetListing;


}



if (typeof window !== "undefined") {


    window.AssetListing = AssetListing;


}

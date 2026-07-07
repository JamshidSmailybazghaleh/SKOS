import { AssetRecord } from "./asset-record";
import { RegistryReport } from "./registry-report";

export class AssetRegistry {

    private readonly assets =

        new Map<string, AssetRecord>();

    /**
     * Register asset.
     */
    public register(

        asset: AssetRecord

    ): void {

        this.assets.set(

            asset.id,

            asset

        );

    }

    /**
     * Retrieve asset.
     */
    public get(

        id: string

    ): AssetRecord | undefined {

        return this.assets.get(id);

    }

    /**
     * Retrieve all assets.
     */
    public getAll(): AssetRecord[] {

        return Array.from(

            this.assets.values()

        );

    }

    /**
     * Total assets.
     */
    public count(): number {

        return this.assets.size;

    }

    /**
     * Generate registry report.
     */
    public report(): RegistryReport {

        const books =

            new Set(

                this.getAll()

                    .map(

                        asset => asset.bookId

                    )

            );

        return {

            totalAssets:

                this.assets.size,

            totalBooks:

                books.size,

            duplicates: 0,

            generatedAt:

                Date.now()

        };

    }

}

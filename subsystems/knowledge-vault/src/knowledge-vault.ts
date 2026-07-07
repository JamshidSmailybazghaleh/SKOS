import { VaultRecord } from "./vault-record";
import { VaultManifest } from "./vault-manifest";
import { VaultOptions } from "./vault-options";

export class KnowledgeVault {

    private readonly records =

        new Map<string, VaultRecord>();

    constructor(

        private readonly options: VaultOptions

    ) {}

    /**
     * Store asset.
     */
    public store(

        record: VaultRecord

    ): void {

        this.records.set(

            record.id,

            record

        );

    }

    /**
     * Retrieve asset.
     */
    public get(

        id: string

    ): VaultRecord | undefined {

        return this.records.get(id);

    }

    /**
     * Retrieve all assets.
     */
    public getAll(): VaultRecord[] {

        return Array.from(

            this.records.values()

        );

    }

    /**
     * Total assets.
     */
    public count(): number {

        return this.records.size;

    }

    /**
     * Vault manifest.
     */
    public manifest(): VaultManifest {

        return {

            vaultId: "SKOS-VAULT",

            totalAssets: this.records.size,

            createdAt: Date.now(),

            lastUpdated: Date.now()

        };

    }

}

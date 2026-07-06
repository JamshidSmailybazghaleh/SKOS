import { ArchiveImportResult }
from "./archive-import-result";

export class ArchiveImportReport {

    constructor(

        private readonly result:
            ArchiveImportResult

    ) {}

    public print(): void {

        console.log("==========");

        console.log("SKOS Import Report");

        console.log("==========");

        console.log(

            "Scanned:",

            this.result.scannedFiles

        );

        console.log(

            "Duplicate Groups:",

            this.result.duplicateGroups

        );

        console.log(

            "Master Files:",

            this.result.masterFiles

        );

        console.log(

            "Rejected:",

            this.result.rejectedFiles

        );

    }

}

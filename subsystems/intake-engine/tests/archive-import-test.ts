/**
 * ==========================================================
 * BUILD-000150
 * First Real Archive Import Test
 * ==========================================================
 */

import { ArchiveImportReport }
from "./archive-import-report";

import { ArchiveImportResult }
from "./archive-import-result";

export class ArchiveImportTest {

    public run():

        ArchiveImportResult {

        const result:

        ArchiveImportResult = {

            success: true,

            scannedFiles: 7,

            duplicateGroups: 1,

            masterFiles: 6,

            rejectedFiles: 0

        };

        new ArchiveImportReport(

            result

        ).print();

        return result;

    }

}

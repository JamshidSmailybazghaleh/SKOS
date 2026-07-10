import { StorageProvider } from "./storage-provider";
import { MetadataExtractor } from "./metadata-extractor";
import { FileMetadata } from "./file-metadata";

export class FileSystemEnumerator {

    constructor(
        private readonly provider: StorageProvider,
        private readonly extractor: MetadataExtractor
    ) {}

    public async enumerate(
        root: string
    ): Promise<FileMetadata[]> {

        const result: FileMetadata[] = [];

        await this.enumerateDirectory(
            root,
            result
        );

        return result;

    }

    private async enumerateDirectory(
        path: string,
        result: FileMetadata[]
    ): Promise<void> {

        const directories =
            await this.provider.listDirectories(path);

        for (const directory of directories) {

            await this.enumerateDirectory(
                directory,
                result
            );

        }

        const files =
            await this.provider.listFiles(path);

        for (const file of files) {

            result.push(

                this.extractor.extract(file)

            );

        }

    }

}

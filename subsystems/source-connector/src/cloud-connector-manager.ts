import { CloudConnector } from "./cloud-connector";

export class CloudConnectorManager {

    private readonly connectors: CloudConnector[] = [];

    public register(

        connector: CloudConnector

    ): void {

        this.connectors.push(connector);

    }

    public getAll(): CloudConnector[] {

        return [...this.connectors];

    }

}

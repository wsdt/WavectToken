import { EnvironmentService } from "./Environment.service";

export class AssetService {
    /**
     * Enriches file path related to environment (production/dev)
     * @param filePath Path to media
     */
    public static getPath(filePath: string) {
        return `/${filePath}`;
        // return EnvironmentService.isProductionEnv() ? `/token/${filePath}` : `/${filePath}`;
    }
}
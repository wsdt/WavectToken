
export class AssetService {
    /**
     * Enriches file path related to environment (production/dev)
     * @param filePath Path to media
     */
    public static getPath(filePath: string) {
        return process.env.NODE_ENV === 'production' ? `/token/${filePath}` : filePath;
    }
}
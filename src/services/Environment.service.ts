
export class EnvironmentService {
    public static isProductionEnv() {
        return process.env.NODE_ENV === 'production';
    }
}
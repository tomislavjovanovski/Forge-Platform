export declare class ForgeError extends Error {
    code: string;
    message: string;
    statusCode: number;
    context?: Record<string, unknown> | undefined;
    name: string;
    constructor(code: string, message: string, statusCode?: number, context?: Record<string, unknown> | undefined);
}
export declare const ErrorCode: {
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly SERVER_ERROR: "SERVER_ERROR";
};
//# sourceMappingURL=index.d.ts.map
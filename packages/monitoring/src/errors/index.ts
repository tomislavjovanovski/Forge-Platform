export class ForgeError extends Error {
  override name = 'ForgeError';

  constructor(
    public code: string,
    override message: string,
    public statusCode: number = 500,
    public context?: Record<string, unknown>
  ) {
    super(message);
  }
}

export const ErrorCode = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
} as const;

import type { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }): ReactNode => {
  return <>{children}</>;
};

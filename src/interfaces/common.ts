export interface Cookies<T = string> {
  get(
    key: string
  ): { name: string; value: T } | undefined;

  set?(
    key: string,
    value: T,
    options?: {
      expires?: Date;
      maxAge?: number;
      path?: string;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
      httpOnly?: boolean;
    }
  ): void;
}

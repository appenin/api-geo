export type Optional<T> = T | undefined;

export type ValidationError = {
  code: string;
  detail: string;
  source?: string;
  value?: string;
  name?: string;
};

export type Error = {
  error: {
    code: number;
    error?: string;
    errors?: ValidationError[];
    message?: string;
  };
};

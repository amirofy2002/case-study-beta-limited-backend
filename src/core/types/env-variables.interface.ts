export interface IAppVariables {
  port: number;
}

export interface IGroqVariables {
  apiKey: string;
}

export interface IEnvironmentVariables {
  app: IAppVariables;
  groq: IGroqVariables;
}

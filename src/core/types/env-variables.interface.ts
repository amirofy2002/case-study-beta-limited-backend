export interface IAppVariables {
  port: number;
}

export interface ILLMVariable {
  apiKey: string;
  model: string;
}

export interface IEnvironmentVariables {
  app: IAppVariables;
  groq: ILLMVariable;
  deepseek: ILLMVariable;
}

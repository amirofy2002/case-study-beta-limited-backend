import { registerAs } from '@nestjs/config';

export default registerAs('deepseek', () => ({
  apiKey: process.env.DEEPSEEK_API_KEY,
  model: process.env.DEEPSEEK_MODEL,
}));

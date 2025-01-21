import { GenericService } from '@core/shared/generic-service';
import { ITransaction } from '@core/types/transactions.interface';
import { GroqService } from '@frameworks/groq/groq.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessTransactionUsecase extends GenericService {
  constructor(private readonly groqService: GroqService) {
    super();
  }

  async normalizeTransaction(transaction: ITransaction) {
    const prompt = `Your task is to normalize the following transaction and You need the generate the following schema:

    
    "normalized": {
        "merchant": "Amazon", // required
        "category": "Shopping", // required
        "sub_category": "Online Retail", // optional
        "confidence": NUMBER BETWEEN 0 - 1, // confidence level of the normalization
        "is_subscription": false, // is this a subscription?
        "flags": ["online_purchase", "marketplace"] // flags for the transaction
    }

    ----------
    Transaction: 

    ${JSON.stringify(transaction, null, 2)}
    `;
    this.logger.debug({
      message: 'prompt for normalization',
      context: 'ProcessTransactionUsecase',
      prompt,
    });
    const reponse = await this.groqService.complete(prompt);
    const json = this.extractJson(reponse);
    return JSON.parse(json);
  }

  async detectPattern(transactions: ITransaction[]) {
    const prompt = `Extract patterns from the following list of transactions and generate a JSON array with the detected patterns.
for detecting the subscription type you can use the amount of the transaction that might be the same from the same merchant and the frequency of the transaction.
in case of recurrent transaction the amount can be the average of the transactions amount.

Each pattern should follow this schema:

“type”: “subscription” or “recurring” based on the nature of the transaction 
“merchant”: the name of the merchant that must be extracted from the transaction description
“amount”: the transaction amount
“frequency”: “monthly”, “weekly”, or “daily”
“confidence”: confidence level of the pattern detection (between 0 and 1)
“next_expected”: next expected transaction date in “YYYY-MM-DD” format
If only one pattern is found, return a list with a single pattern.

---------------
The list of transactions is provided below:
${transactions.map((tr) => `Amount:${tr.amount},Date:${tr.date},Description:${tr.description}`).join('\n,')}
---------------
Generate ONLY the JSON array with the detected patterns.

`;
    this.logger.debug({
      message: 'prompt for pattern detection',
      context: 'ProcessTransactionUsecase',
      prompt,
    });
    const reponse = await this.groqService.complete(prompt);
    const json = this.extractArray(reponse);
    return JSON.parse(json);
  }

  private extractJson(text: string) {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    const trimmedText = text.substring(start, end + 1);
    return trimmedText.replaceAll('\n', '');
  }

  private extractArray(text: string) {
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    const trimmedText = text.substring(start, end + 1);
    return trimmedText.replaceAll('\n', '');
  }
}

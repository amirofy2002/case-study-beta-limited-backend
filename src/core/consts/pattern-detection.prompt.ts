import { ITransaction } from '@core/types/transactions.interface';

export const generatePatternDetectionPrompt = (
  transactions: ITransaction[],
) => {
  return `Extract patterns from the following list of transactions and generate a JSON array with the detected patterns.
    - each transaction must have a pattern
    - for detecting the subscription type you can use the amount of the transaction that might be the same from the same merchant and the frequency of the transaction.
    - in case of recurrent transaction the amount can be the average of the transactions amount.
    - for the frequency you can use the date of the transaction to calculate the frequency of the transaction.
    - monthly means that the transaction is every month, weekly means that a transaction can happens once a week and daily means that the transaction is every day.
    
    - Each pattern should follow this schema:
    
      “type”: “subscription” or “recurring” based on the nature of the transaction 
      “merchant”: the name of the merchant that must be extracted from the transaction description
      “amount”: the transaction amount
      “frequency”: “monthly”, “weekly”, or “daily”
      “confidence”: confidence level of the pattern detection (between 0 and 1)
      “next_expected”: next expected transaction date in “YYYY-MM-DD” format
      "notes" : any notes about the pattern
      "founded_transaction": list of transactions that led to this pattern
    
    
    ---------------
    The list of transactions is provided below:
    
    Amount,Date,Description
    ${transactions.map((tr) => `${tr.amount},${tr.date},${tr.description}`).join('\n,')}
    ---------------
    Generate ONLY the JSON array without any comments for the values as the result.
    
    `;
};

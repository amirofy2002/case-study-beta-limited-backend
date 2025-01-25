import { ITransaction } from '@core/types/transactions.interface';

export const generatePatternDetectionPrompt = (
  transactions: ITransaction[],
) => {
  return `Analyze financial transactions to identify patterns with special emphasis on subscription detection. Follow these rules:

1. **Subscription Identification** (Priority Detection):
- Must meet ALL criteria:
  a) Fixed amount (±5% variance allowed)
  b) Regular monthly intervals (30±3 days between charges)
  c) Same normalized merchant name
  d) At least 2 occurrences in 60 days
- Auto-classify as 'subscription' type
- Confidence score = 0.4 + (0.2 * occurrences) [Max 1.0]
- Predict next date: Last occurrence + 30 days

2. **Recurring Transaction Detection**:
- Must meet ALL criteria:
  a) Variable amounts (>5% difference)
  b) Regular non-monthly frequency (daily/weekly/bi-weekly)
  c) Same merchant category
- Classify as 'recurring' type
- Confidence score = 0.5 + (0.1 * occurrences) [Max 1.0]

3. **Merchant Normalization Rules**:
- Remove special characters/digits after first space (e.g., 'AMZN MKTP US*Z1234ABC' → 'AMZN')
- Retain brand names before descriptors (e.g., 'SPOTIFY P5D4E9B1D1' → 'SPOTIFY')
- Group digital/physical variants (e.g., 'AMZN DIGITAL' and 'AMZN MKTP' → 'AMZN')

4. **Output Requirements**:


json
[
  {
    "type": "subscription",
    "merchant": "Normalized name",
    "amount": "Exact fixed amount",
    "frequency": "monthly",
    "confidence": 0.6-1.0,
    "next_expected": "YYYY-MM-DD",
    "notes": "Subscription details"
  },
  {
    "type": "recurring",
    "merchant": "Category/merchant",
    "amount": "Average amount",
    "frequency": "daily/weekly",
    "confidence": 0.5-1.0,
    "next_expected": "YYYY-MM-DD", 
    "notes": "Usage pattern observations"
  }
]

5. Special Handling:

- Prioritize subscription detection over recurring patterns



Use transaction dates to verify frequency accuracy. Handle multiple patterns per merchant when applicable.


----- transactions list  -------
 Amount,Date,Description
 ${transactions.map((tr) => `${tr.amount},${tr.date},${tr.description}`).join('\n,')}

  
  `;
};

// return `Extract patterns from the following list of transactions and generate a JSON array with the detected patterns.
// - each transaction must have a pattern
// - for detecting the subscription type you can use the amount of the transaction that might be the same from the same merchant and the frequency of the transaction.
// - in case of recurrent transaction the amount can be the average of the transactions amount.
// - for the frequency you can use the date of the transaction to calculate the frequency of the transaction.
// - monthly means that the transaction is every month, weekly means that a transaction can happens once a week and daily means that the transaction is every day.

// - Each pattern should follow this schema:

//   “type”: “subscription” or “recurring” based on the nature of the transaction
//   “merchant”: the name of the merchant that must be extracted from the transaction description
//   “amount”: the transaction amount
//   “frequency”: “monthly”, “weekly”, or “daily”
//   “confidence”: confidence level of the pattern detection (between 0 and 1)
//   “next_expected”: next expected transaction date in “YYYY-MM-DD” format
//   "notes" : any notes about the pattern
//   "founded_transaction": list of transactions that led to this pattern

// ---------------
// The list of transactions is provided below:

// Amount,Date,Description
// ${transactions.map((tr) => `${tr.amount},${tr.date},${tr.description}`).join('\n,')}
// ---------------
// Generate ONLY the JSON array without any comments for the values as the result.

// `;

import { ITransaction } from '@core/types/transactions.interface';

export const generatePatternDetectionPrompt = (
  transactions: ITransaction[],
) => {
  return `Analyze financial transactions to identify patterns with special emphasis on subscription detection. Follow these rules:
1. Merchant Normalization:
- Extract primary merchant names from transaction descriptions
- Remove extra codes, locations, and transactional details
- Standardize naming (e.g., "NFLX DIGITAL NTFLX US" → "NETFLIX")
- Maintain consistent casing (all caps for normalized names)

2. **Subscription Identification** (Priority Detection):
- Must meet ALL criteria:
  a) Fixed amount (±5% variance allowed)
  b) Regular monthly intervals (30±3 days between charges)
  c) Same normalized merchant name
  d) At least 2 occurrences in 60 days
- Auto-classify as 'subscription' type
- Confidence score = 0.4 + (0.2 * occurrences) [Max 1.0]
- Predict next date: Last occurrence + 30 days
- Notes must include:
  • Payment anchors ('1st/15th of month') 
  • Service type identification ('streaming','membership')
  • Billing consistency ('3+ consecutive months')
  Example note: 'Consistent payment on 15th - streaming service'

3. **Recurring Transaction Detection**:
- Must meet ALL criteria:
  a) Variable amounts (>5% difference)
  b) Regular non-monthly frequency (daily/weekly/bi-weekly)
  c) Same merchant category
- Classify as 'recurring' type
- Confidence score = 0.5 + (0.1 * occurrences) [Max 1.0]
- Notes must include:
  • Spending averages ('Avg $X per occurrence')
  • Location patterns ('Same store #2389')
  • Behavioral context ('Commute rides','coffee breaks')
  Example note: 'Weekday purchases ($5.75 avg)'

4. **Merchant Normalization Rules**:
- Remove special characters/digits after first space (e.g., 'AMZN MKTP US*Z1234ABC' → 'AMZN')
- Retain brand names before descriptors (e.g., 'SPOTIFY P5D4E9B1D1' → 'SPOTIFY')
- Group digital/physical variants (e.g., 'AMZN DIGITAL' and 'AMZN MKTP' → 'AMZN')


5. **Enhanced Notes Requirements**:
- Specify payment anchors for subscriptions (1st/5th/15th/25th)
- Include numerical averages for recurring expenses
- Identify service categories (streaming, fuel, food,...)
- Flag date exceptions ('Weekend charges','holiday spikes',...)

6. **Output Requirements**:
json
[
   {
    "type": "subscription",
    "merchant": "NFLX",
    "amount": 19.99,
    "frequency": "monthly",
    "confidence": 0.8,
    "next_expected": "2024-02-01",
    "notes": "Consistent payment on 1st - streaming service" 
  },
  {
    "type": "recurring",
    "merchant": "STARBUCKS",
    "amount": 5.75,
    "frequency": "daily",
    "confidence": 0.7,
    "next_expected": "2024-01-31",
    "notes": "Weekday purchases at Store #8752 ($5.75 avg)"
]

7. Special Handling:
- Prioritize subscription detection over recurring patterns

8. Validation Safeguards:
- Auto-escape special characters in notes
- Validate JSON structure before output
- Capsule notes at 120 characters maximum


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

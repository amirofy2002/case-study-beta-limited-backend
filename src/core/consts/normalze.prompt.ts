import { ITransaction } from '@core/types/transactions.interface';

export const normalizeTransactionPrompt = (transactions: ITransaction[]) => {
  return `Act as a financial transaction normalization expert. Process the following transactions with these strict rules:

1. **Merchant Normalization**:
- Extract CLEAN merchant names using these patterns:
  - Remove: Transaction codes (e.g., *2X4KP0), locations (US/UK), digits, and extra spaces
  - Keep: Primary brand identifiers (first meaningful 2-5 words)
  - Standardize casing to Title Case
  - Merge variants (AMZN MKTP/US → Amazon, NFLX DIGITAL → Netflix)
  - Use known parent companies (DOORDASH*SUBWAY → Doordash)

2. **Categorization**:
- Main categories: Use these exact labels:
  [Subscription, Retail, Dining, Transportation, Utilities, Entertainment, Fuel, Groceries, Technology]
- Sub-categories: Be specific (e.g., "Streaming" under Entertainment)
- Confidence: Calculate based on:
  1.0 = Exact pattern match
  0.9 = Known merchant variation
  0.7 = Partial match with context
  0.5 = Generic/no clear pattern

3. **Subscription Detection**:
Mark is_subscription=True ONLY if:
- Same merchant appears ≥2 times with identical amount
- OR recurring within 28-35 day intervals
- With supporting flags like "auto-renew"

4. **Flags System**:
Use these exact tags when applicable:
["recurring", "auto-renew", "online_service", "physical_store", 
"food_delivery", "fuel_purchase", "digital_product"]

5. **Output Requirements**:
- Strict JSON array format
- No null/empty fields except sub_category
- Maintain original transaction order
- Escape special characters
- No additional explanations

Example Input/Output Pattern:
[Original transaction list from initial question]

[{
  "original": "UBER   *TRIP HELP.UBER.CO",
  "normalized": {
    "merchant": "Uber",
    "category": "Transportation",
    "sub_category": "Rideshare",
    "confidence": 0.95,
    "is_subscription": false,
    "flags": ["recurring"]
  }
}]
    
        ----------
        Transactions list: 
    
        Amount,Date,Description
        ${transactions.map((tr) => `${tr.amount},${tr.date},${tr.description}`).join('\n,')}
    
        ----------
        Generate ONLY the JSON array for the normalized list of transactions.
    
        `;
};

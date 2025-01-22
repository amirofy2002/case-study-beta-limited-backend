import { ITransaction } from '@core/types/transactions.interface';

export const normalizeTransactionPrompt = (transactions: ITransaction[]) => {
  return `Your task is to normalize the following transaction list and You need the generate the following schema:
    for detecting the subscription you need to view the transactions list then for the type you can use the amount of the transaction that might be the same from the same merchant and the frequency of the transaction.
    in case of recurrent transaction the amount can be the average of the transactions amount.
    no need to add comments for the output.
       each normalized transaction should follow this schema:
        
       {
            original: string // the original transaction description
            normalized:{
                "merchant": string, // required, the normalized merchant name
                "category": string, // required,  
                "sub_category": string, // optional
                "confidence": number // BETWEEN 0 - 1 : confidence level of the normalization
                "is_subscription": boolean, // true if it is this a subscription
                "flags": string[] // you can assign some flags to the transaction for more information about the nature of merchant like transportation, online shopping, etc.
            }
        }
    
        ----------
        Transactions list: 
    
        Amount,Date,Description
        ${transactions.map((tr) => `${tr.amount},${tr.date},${tr.description}`).join('\n,')}
    
        ----------
        Generate ONLY the JSON array for the normalized list of transactions.
    
        `;
};

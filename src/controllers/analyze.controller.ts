import {
  DetectPatternsDto,
  NormalizeTransactionDto,
} from '@core/dto/transaction.dto';
import { GenericService } from '@core/shared/generic-service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ProcessTransactionUsecase } from '@use-cases/process-transctions/prcess-transcation.usecase';

@Controller('analyze')
export class AnalyzeController extends GenericService {
  constructor(private usecase: ProcessTransactionUsecase) {
    super();
  }

  @Post('/merchant')
  @ApiOperation({ summary: 'Normalize a transaction' })
  @ApiBody({
    description: 'example of a transaction',
    examples: {
      ex1: {
        summary: '',
        value: {
          transaction: {
            description: 'NFLX DIGITAL NTFLX US',
            amount: 19.99,
            date: '2024-01-01',
          },
        },
      },
    },
  })
  async postNormalize(@Body() dto: NormalizeTransactionDto) {
    const normalized = await this.usecase.normalizeTransaction([
      dto.transaction,
    ]);
    return {
      status: 200,
      normalized,
    };
  }

  @Post('/patterns')
  @ApiBody({
    description: 'example of a transaction',
    examples: {
      ex1: {
        summary: '',
        value: {
          transactions: [
            {
              description: 'NFLX DIGITAL NTFLX US',
              amount: 19.99,
              date: '2024-01-01',
            },
            {
              description: 'AMZN MKTP US*Z1234ABC',
              amount: 89.97,
              date: '2024-01-01',
            },
            {
              description: 'UBER   *TRIP HELP.UBER.CO',
              amount: 35.5,
              date: '2024-01-02',
            },
            {
              description: 'SPOTIFY P5D4E9B1D1',
              amount: 9.99,
              date: '2024-01-02',
            },
            {
              description: 'TST* THAI SPICE	',
              amount: 42.15,
              date: '2024-01-03',
            },
            {
              description: 'AMZN DIGITAL*2X4KP0',
              amount: 14.99,
              date: '2024-01-05',
            },
            {
              description: 'UBER   *TRIP HELP.UBER.CO',
              amount: 28.75,
              date: '2024-01-07',
            },
            {
              description: 'WALMART STORE #2389',
              amount: 156.23,
              date: '2024-01-08',
            },
            {
              description: 'SHELL OIL 57442897200',
              amount: 45.82,
              date: '2024-01-08',
            },
            {
              description: 'DOORDASH*SUBWAY',
              amount: 18.45,
              date: '2024-01-10',
            },
            {
              description: 'STARBUCKS STORE #8752',
              amount: 5.75,
              date: '2024-01-12',
            },
            {
              description: 'UBER   *TRIP HELP.UBER.CO',
              amount: 32.25,
              date: '2024-01-14',
            },
            {
              description: 'NFLX DIGITAL NTFLX US',
              amount: 19.99,
              date: '2024-01-15',
            },
            {
              description: 'APPLE.COM/BILL',
              amount: 2.99,
              date: '2024-01-15',
            },
            {
              description: 'STARBUCKS STORE #8752	',
              amount: 5.75,
              date: '2024-01-16',
            },
            {
              description: 'AMZN MKTP US*Y789XYZ	',
              amount: 65.43,
              date: '2024-01-17',
            },
            {
              description: 'SPOTIFY P5D4E9B1D1	',
              amount: 9.99,
              date: '2024-01-18',
            },
            {
              description: 'DOORDASH*MCDONALDS',
              amount: 15.67,
              date: '2024-01-20',
            },
            {
              description: 'UBER   *TRIP HELP.UBER.CO',
              amount: 29.99,
              date: '2024-01-21',
            },
            {
              description: 'TARGET STORE #4578	',
              amount: 98.76,
              date: '2024-01-22',
            },
            {
              description: 'STARBUCKS STORE #8752	',
              amount: 5.75,
              date: '2024-01-23',
            },
            {
              description: 'SHELL OIL 57442897200	',
              amount: 48.92,
              date: '2024-01-25',
            },
            {
              description: 'WALMART STORE #2389	',
              amount: 142.87,
              date: '2024-01-26',
            },

            {
              description: 'UBER   *TRIP HELP.UBER.CO',
              amount: 31.5,
              date: '2024-01-28',
            },
            {
              description: 'APPLE.COM/BILL',
              amount: 2.99,
              date: '2024-01-29',
            },
            {
              description: 'STARBUCKS STORE #8752',
              amount: 5.75,
              date: '2024-01-30',
            },
          ],
        },
      },
    },
  })
  @ApiOperation({ summary: 'detect pattern for a transaction' })
  async postPatternDetection(@Body() dto: DetectPatternsDto) {
    const response = await this.usecase.detectPattern(dto.transactions);
    return {
      status: 200,
      response,
    };
  }
}

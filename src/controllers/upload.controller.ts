import { GenericService } from '@core/shared/generic-service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ProcessTransactionUsecase } from '@use-cases/process-transctions/prcess-transcation.usecase';

@Controller('/upload')
export class UploadController extends GenericService {
  constructor(private usecase: ProcessTransactionUsecase) {
    super();
  }

  @Post('')
  @ApiOperation({ summary: 'Upload a file to be processed' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 30 * 1000000 } }),
  )
  async postFile(@UploadedFile('file') file: Express.Multer.File) {
    this.logger.debug({ file: file.originalname, size: file.size });
    const [transactions, patterns, normalized] =
      await this.usecase.processBatch(file.buffer);
    return {
      status: 200,
      file: file.originalname,
      normalized_transactions: normalized,
      detected_patterns: patterns,
      transactions,
    };
  }
}

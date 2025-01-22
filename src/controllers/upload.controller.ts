import { GenericService } from '@core/shared/generic-service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProcessTransactionUsecase } from '@use-cases/process-transctions/prcess-transcation.usecase';

@Controller('/upload')
export class UploadController extends GenericService {
  constructor(private usecase: ProcessTransactionUsecase) {
    super();
  }

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 30 * 1000000 } }),
  )
  postFile(@UploadedFile('file') file: Express.Multer.File) {
    this.logger.debug({ file: file.originalname, size: file.size });
    return {
      status: 200,
      file: file.originalname,
    };
  }
}

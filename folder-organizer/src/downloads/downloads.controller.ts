import { Controller, Post,Body } from '@nestjs/common';
import { DownloadsService } from './downloads.service';

@Controller('downloads')
export class DownloadsController {
  constructor(private readonly downloadsService: DownloadsService) {}

    @Post('organise')
  organiseDownloads(@Body('path') folderPath:string) {
    return this.downloadsService.organise(folderPath);
    }
}

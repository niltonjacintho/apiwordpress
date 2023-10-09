import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

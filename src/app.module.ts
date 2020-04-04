import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [DbModule, ApiModule],
})
export class AppModule {}

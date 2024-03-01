import { Module, OnModuleInit } from '@nestjs/common';
import { DbService } from './db.service';

@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly dbService: DbService) {}

  async onModuleInit() {
    await this.dbService.getDB();
  }
}

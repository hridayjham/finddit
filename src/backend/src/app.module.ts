import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NearbySearchModule } from './nearby-search/nearby-search.module';
import { DatabaseModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { GroupsService } from './groups/groups.service';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [NearbySearchModule, DatabaseModule, UsersModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService, GroupsService],
})
export class AppModule {}

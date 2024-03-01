import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { DatabaseModule } from 'src/db/db.module';
import { NearbySearchModule } from '../nearby-search/nearby-search.module';

@Module({
  imports: [DatabaseModule, NearbySearchModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}

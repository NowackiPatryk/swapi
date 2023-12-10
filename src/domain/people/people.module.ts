import { Module } from '@nestjs/common';
import { PeopleService } from './services/people.service';
import { SWApiModule } from '../swapi/swap.module';
import { PeopleCacheService } from './services/people-cache.service';
import { CachingModule } from '../../core/cache/caching.module';

@Module({
  imports: [SWApiModule, CachingModule],
  providers: [PeopleService, PeopleCacheService],
  exports: [PeopleService],
})
export class PeopleModule {}

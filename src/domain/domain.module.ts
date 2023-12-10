import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { FilmsModule } from './films/films.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [PeopleModule, FilmsModule, StatisticsModule],
  exports: [PeopleModule, FilmsModule, StatisticsModule]
})
export class DomainModule {}

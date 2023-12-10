import { Module } from '@nestjs/common';
import { StatisticsService } from './services/statistics.service';
import { FilmsModule } from '../films/films.module';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [FilmsModule, PeopleModule],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}

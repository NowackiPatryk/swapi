import { Query, Resolver } from '@nestjs/graphql';
import { StatisticsService } from '../../../../domain/statistics/services/statistics.service';
import { mapWordsStatisticsToUniqueWordsGrapql } from './mappers/map-words-statistics-to-unique-words-graphql';
import { UniqueWordsGraphql } from '../../models/statistics.graphql';

@Resolver()
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Query(returns => [UniqueWordsGraphql])
  async getUniqueWordsCount() {
    const result = await this.statisticsService.getPairsOfUniqueWords();
    return mapWordsStatisticsToUniqueWordsGrapql(result);
  }

  @Query(returns => [String])
  async getMostMentionedPeopleNames() {
    return this.statisticsService.getMostMentionedPeopleNames();
  }
}

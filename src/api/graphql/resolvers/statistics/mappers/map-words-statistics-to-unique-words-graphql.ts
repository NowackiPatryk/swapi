import { WordsStatistics } from '../../../../../domain/statistics/services/statistics.service';
import { UniqueWordsGraphql } from '../../../models/statistics.graphql';

export const mapWordsStatisticsToUniqueWordsGrapql = (
  statistics: WordsStatistics,
): UniqueWordsGraphql[] => {
  return Object.entries(statistics).map((statistic) => {
    const [word, count] = statistic;
    return {
      word,
      count,
    };
  });
};

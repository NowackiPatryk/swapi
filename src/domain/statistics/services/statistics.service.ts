import { Injectable } from '@nestjs/common';
import { FilmService } from '../../films/services/films.service';
import { PeopleService } from '../../people/services/people.service';
import { PeopleListResponse } from '../../swapi/types';

export type WordsStatistics = Record<string, number>;

@Injectable()
export class StatisticsService {
  constructor(
    private readonly filmsService: FilmService,
    private readonly peopleService: PeopleService,
  ) {
    // this.getPairsOfUniqueWords();
    this.getMostMentionedPeopleNames();
  }

  async getPairsOfUniqueWords(): Promise<WordsStatistics> {
    const allFilms = await this.filmsService.getAllFilms();
    const openings = allFilms.results.map((film) => film.opening_crawl);

    const tokenized = this.extractTokenizedFromFromArrayOfStrings(openings);
    const counted = this.countUniquTokens(tokenized);

    return counted;
  }

  async getMostMentionedPeopleNames(): Promise<string[]> {
    const allNames = await this.getAllPeopleNames();
    const uniqueWordsCount = await this.getPairsOfUniqueWords();
    const allNamesCount = this.countNamesOccured(allNames, uniqueWordsCount);

    return this.getMostCountedWords(allNamesCount);
  }

  private getMostCountedWords(words: WordsStatistics): string[] {
    const biggestCount = Object.values(words).reduce((max, current) => {
      if (current > max) {
        return current;
      }

      return max;
    }, 0);

    const names: string[] = [];

    Object.entries(words).forEach((word) => {
      const [name, count] = word;
      if (count === biggestCount) {
        names.push(name);
      }
    });

    return names;
  }

  private countNamesOccured(
    allNames: string[],
    uniqueWordsCount: WordsStatistics,
  ) {
    const uniqueWordsKeys = Object.keys(uniqueWordsCount);
    const allNamesOccured: WordsStatistics = {};

    for (const name of allNames) {
      const normalizedName = name.toLowerCase();
      if (uniqueWordsKeys.includes(normalizedName)) {
        allNamesOccured[normalizedName] = uniqueWordsCount[normalizedName];
      }
    }

    return allNamesOccured;
  }

  private extractTokenizedFromFromArrayOfStrings(strings: string[]): string[] {
    const combinedOpenings = strings.join(' ');
    const tokenized = combinedOpenings.toLowerCase().match(/\b\w+\b/g);

    return tokenized;
  }

  private countUniquTokens(words: string[]): Record<string, number> {
    const occurenciesMap: Record<string, number> = {};

    for (const token of words) {
      occurenciesMap[token] = Object.keys(occurenciesMap).includes(token)
        ? occurenciesMap[token] + 1
        : 1;
    }

    return occurenciesMap;
  }

  private async getAllPeopleNames() {
    // const responses: PeopleListResponse[] = [];
    // const allTaken = () => responses.some((response) => response.next === null);
    // let currentPage = 1;

    // while (!allTaken()) {
    //   const response = await this.peopleService.getAllPeople({
    //     page: currentPage,
    //   });

    //   responses.push(response);
    //   currentPage++;
    // }

    // const fullNames = responses
    //   .map((response) => response.results)
    //   .map((results) => results.map((result) => result.name))
    //   .flat();

    const fullNames = [
      'Luke Skywalker',
      'C-3PO',
      'R2-D2',
      'Darth Vader',
      'Leia Organa',
      'Owen Lars',
      'Beru Whitesun lars',
      'R5-D4',
      'Biggs Darklighter',
      'Obi-Wan Kenobi',
      'Anakin Skywalker',
      'Wilhuff Tarkin',
      'Chewbacca',
      'Han Solo',
      'Greedo',
      'Jabba Desilijic Tiure',
      'Wedge Antilles',
      'Jek Tono Porkins',
      'Yoda',
      'Palpatine',
      'Boba Fett',
      'IG-88',
      'Bossk',
      'Lando Calrissian',
      'Lobot',
      'Ackbar',
      'Mon Mothma',
      'Arvel Crynyd',
      'Wicket Systri Warrick',
      'Nien Nunb',
      'Qui-Gon Jinn',
      'Nute Gunray',
      'Finis Valorum',
      'Padmé Amidala',
      'Jar Jar Binks',
      'Roos Tarpals',
      'Rugor Nass',
      'Ric Olié',
      'Watto',
      'Sebulba',
      'Quarsh Panaka',
      'Shmi Skywalker',
      'Darth Maul',
      'Bib Fortuna',
      'Ayla Secura',
      'Ratts Tyerel',
      'Dud Bolt',
      'Gasgano',
      'Ben Quadinaros',
      'Mace Windu',
      'Ki-Adi-Mundi',
      'Kit Fisto',
      'Eeth Koth',
      'Adi Gallia',
      'Saesee Tiin',
      'Yarael Poof',
      'Plo Koon',
      'Mas Amedda',
      'Gregar Typho',
      'Cordé',
      'Cliegg Lars',
      'Poggle the Lesser',
      'Luminara Unduli',
      'Barriss Offee',
      'Dormé',
      'Dooku',
      'Bail Prestor Organa',
      'Jango Fett',
      'Zam Wesell',
      'Dexter Jettster',
      'Lama Su',
      'Taun We',
      'Jocasta Nu',
      'R4-P17',
      'Wat Tambor',
      'San Hill',
      'Shaak Ti',
      'Grievous',
      'Tarfful',
      'Raymus Antilles',
      'Sly Moore',
      'Tion Medon',
    ];

    return fullNames.map((name) => name.split(/[-_ ]+/)[0]);
  }
}

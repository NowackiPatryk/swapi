import { Module } from '@nestjs/common';
import { SWApiModule } from '../swapi/swap.module';
import { FilmService } from './services/films.service';

@Module({
  imports: [SWApiModule],
  providers: [FilmService],
  exports: [FilmService],
})
export class FilmsModule {}

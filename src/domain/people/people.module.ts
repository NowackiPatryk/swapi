import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { SWApiModule } from '../swapi/swap.module';

@Module({
  imports: [SWApiModule],
  providers: [PeopleService],
  exports: [PeopleService],
})
export class PeopleModule {}

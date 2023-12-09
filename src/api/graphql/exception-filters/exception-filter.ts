import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { UnallowedFiltersException } from '../../../domain/people/exceptions/unallowed-filters.exception';

@Catch()
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    if (exception instanceof UnallowedFiltersException) {
      throw new BadRequestException(exception.message);
    }

    return exception;
  }
}

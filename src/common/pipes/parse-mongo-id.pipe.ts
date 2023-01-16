import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

// Los pipes deven de implementar => PipeTransform

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  // el value => retorna el valor por parametro
  transform(value: string, metadata: ArgumentMetadata) {
    console.log({ value, metadata })

    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a valid MongoID`);
    }
    return value;
  }
}
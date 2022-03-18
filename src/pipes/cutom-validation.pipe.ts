import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomValidatorPipe implements PipeTransform {
  constructor(private classValidatorFunction: (any)) { }

  transform(value: any[], metadata: ArgumentMetadata) {
    if (Array.isArray(value)) {
      const errors = value.reduce((result, element, index) => {
        if (!this.classValidatorFunction(element)) {
          result.push(`${element} at index ${index} failed validation`);
        }
        return result;
      }, []);

      if (errors.length > 0) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Validation failed',
          errors,
        });
      }

      return value;
    }
  }
}

import { PipeTransform, UnauthorizedException, Next } from "@nestjs/common";
import * as validator from 'email-validator'

export class emailValidation implements PipeTransform {
    transform(value: any, metadata: import("@nestjs/common").ArgumentMetadata) {
        let match: boolean = validator.validate(value.email)
        console.log("match :------------", match)
        if (match !== true) {
            return new UnauthorizedException()
        } else {
            return value;
        }
    }

}
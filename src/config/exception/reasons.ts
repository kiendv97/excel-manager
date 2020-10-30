import { HttpException, HttpStatus } from "@nestjs/common";

export class ReasonException {
    public static INTERNAL_ERROR = new HttpException('Internal server error.', HttpStatus.INTERNAL_SERVER_ERROR);
    public static VALIDATION_FAILED = new HttpException('Validation failed.', HttpStatus.BAD_REQUEST);
    public static FIELD_INVALID = new HttpException('Path or name is invalid.', HttpStatus.BAD_REQUEST);
    public static FIELD_NOT_FOUND = new HttpException('Enough path or name', HttpStatus.BAD_REQUEST);
}
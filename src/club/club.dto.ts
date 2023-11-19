import { IsDate, IsNotEmpty, IsString } from 'class-validator';
export class ClubDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthday: Date;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

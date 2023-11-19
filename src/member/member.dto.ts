import { IsDate, IsNotEmpty, IsString } from 'class-validator';
export class MemberDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthday: Date;
}

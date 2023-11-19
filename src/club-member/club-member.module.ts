import { Module } from '@nestjs/common';
import { ClubMemberController } from './club-member.controller';

@Module({
  controllers: [ClubMemberController]
})
export class ClubMemberModule {}

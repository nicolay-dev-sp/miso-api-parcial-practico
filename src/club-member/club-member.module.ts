import { Module } from '@nestjs/common';
import { ClubMemberController } from './club-member.controller';
import { ClubEntity } from 'src/club/club.entity';
import { MemberEntity } from 'src/member/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubMemberService } from './club-member.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, MemberEntity])],
  controllers: [ClubMemberController],
  providers: [ClubMemberService],
})
export class ClubMemberModule {}

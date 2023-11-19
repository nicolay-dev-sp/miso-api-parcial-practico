import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { ClubController } from './club/club.controller';
import { ClubModule } from './club/club.module';
import { ClubMemberService } from './club-member/club-member.service';
import { ClubMemberModule } from './club-member/club-member.module';

@Module({
  imports: [MemberModule, ClubModule, ClubMemberModule],
  controllers: [AppController, ClubController],
  providers: [AppService, ClubMemberService],
})
export class AppModule {}

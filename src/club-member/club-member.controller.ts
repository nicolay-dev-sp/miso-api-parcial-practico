import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ClubMemberService } from './club-member.service';
import { MemberDto } from '../member/member.dto';
import { plainToInstance } from 'class-transformer';
import { MemberEntity } from '../member/member.entity';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubMemberController {
  constructor(private readonly clubMemberService: ClubMemberService) {}

  @Post(':clubId/members/:memberId')
  async addMemberToClub(
    @Param('clubId') clubId: number,
    @Param('memberId') memberId: number,
  ) {
    return await this.clubMemberService.addMemberToClub(clubId, memberId);
  }

  @Get(':clubId/members/:memberId')
  async findMemberFromClub(
    @Param('clubId') clubId: number,
    @Param('memberId') memberId: number,
  ) {
    return await this.clubMemberService.findMemberFromClub(clubId, memberId);
  }

  @Get(':clubId/members')
  async findMembersFromClub(@Param('clubId') clubId: number) {
    return await this.clubMemberService.findMembersFromClub(clubId);
  }

  @Put(':clubId/members')
  async updateMembersFromClub(
    @Body() memberDto: MemberDto[],
    @Param('clubId') clubId: number,
  ) {
    const members = plainToInstance(MemberEntity, memberDto);
    return await this.clubMemberService.updateMembersFromClub(clubId, members);
  }

  @Delete(':clubId/members/:memberId')
  @HttpCode(204)
  async deleteMemberFromClub(
    @Param('clubId') clubId: number,
    @Param('memberId') memberId: number,
  ) {
    return await this.clubMemberService.deleteMemberFromClub(clubId, memberId);
  }
}

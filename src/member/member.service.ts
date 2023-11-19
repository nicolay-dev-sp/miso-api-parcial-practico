import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  async findAll(): Promise<MemberEntity[]> {
    return await this.memberRepository.find({
      relations: ['clubs'],
    });
  }

  async findOne(id: number): Promise<MemberEntity> {
    const member: MemberEntity = await this.memberRepository.findOne({
      where: { id },
      relations: ['clubs'],
    });
    if (!member)
      throw new BusinessLogicException(
        'The member with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return member;
  }

  async create(member: MemberEntity): Promise<MemberEntity> {
    if (!member.email.includes('@')) {
      throw new BusinessLogicException(
        'The member email has not a valid format',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.memberRepository.save(member);
  }

  async update(id: number, member: MemberEntity): Promise<MemberEntity> {
    const persistedMember: MemberEntity = await this.memberRepository.findOne({
      where: { id },
    });
    if (!persistedMember)
      throw new BusinessLogicException(
        'The member with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    if (!member.email.includes('@')) {
      throw new BusinessLogicException(
        'The member email has not a valid format',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return await this.memberRepository.save({ ...persistedMember, ...member });
  }

  async delete(id: number) {
    const member: MemberEntity = await this.memberRepository.findOne({
      where: { id },
    });
    if (!member)
      throw new BusinessLogicException(
        'The member with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.memberRepository.remove(member);
  }

  validateEmail(email: string): boolean {
    return email.includes('@');
  }
}

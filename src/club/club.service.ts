import { Injectable } from '@nestjs/common';
import { ClubEntity } from './club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
  ) {}

  async findAll(): Promise<ClubEntity[]> {
    return await this.clubRepository.find({
      relations: ['members'],
    });
  }

  async findOne(id: number): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id },
      relations: ['members'],
    });
    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return club;
  }

  async create(club: ClubEntity): Promise<ClubEntity> {
    if (club.description.length >= 100) {
      throw new BusinessLogicException(
        'The club description is longer than 100 chars',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.clubRepository.save(club);
  }

  async update(id: number, club: ClubEntity): Promise<ClubEntity> {
    const persistedClub: ClubEntity = await this.clubRepository.findOne({
      where: { id },
    });
    if (!persistedClub)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    if (club.description.length >= 100) {
      throw new BusinessLogicException(
        'The club description is longer than 100 chars',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.clubRepository.save({ ...persistedClub, ...club });
  }

  async delete(id: number) {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id },
    });
    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.clubRepository.remove(club);
  }
}

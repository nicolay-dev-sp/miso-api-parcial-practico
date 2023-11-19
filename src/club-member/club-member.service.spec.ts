import { Test, TestingModule } from '@nestjs/testing';
import { ClubMemberService } from './club-member.service';
import { ClubEntity } from '../club/club.entity';
import { MemberEntity } from '../member/member.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ClubMemberService', () => {
  let service: ClubMemberService;
  let clubRepository: Repository<ClubEntity>;
  let memberRepository: Repository<MemberEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubMemberService,
        {
          provide: getRepositoryToken(ClubEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(MemberEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClubMemberService>(ClubMemberService);
    clubRepository = module.get<Repository<ClubEntity>>(
      getRepositoryToken(ClubEntity),
    );
    memberRepository = module.get<Repository<MemberEntity>>(
      getRepositoryToken(MemberEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a member to a club', async () => {
    const memberId = 1;
    const clubId = 2;
    const member: MemberEntity = {
      id: 1,
      username: 'username',
      birthday: new Date(),
      email: 'email@email.com',
      clubs: [],
    };
    const club: ClubEntity = {
      id: 1,
      name: 'name',
      birthday: new Date(),
      image: 'src/image',
      description: 'description',
      members: [],
    };

    jest.spyOn(memberRepository, 'findOne').mockResolvedValue(member);
    jest.spyOn(clubRepository, 'findOne').mockResolvedValue(club);
    jest.spyOn(clubRepository, 'save').mockResolvedValue(club);

    const result = await service.addMemberToClub(memberId, clubId);

    expect(result).toEqual(club);
  });

  it('should find a member from a club', async () => {
    const memberId = 1;
    const clubId = 2;
    const member: MemberEntity = {
      id: 1,
      username: 'username',
      birthday: new Date(),
      email: 'email@email.com',
      clubs: [],
    };
    const club: ClubEntity = {
      id: 1,
      name: 'name',
      birthday: new Date(),
      image: 'src/image',
      description: 'description',
      members: [],
    };
    club.members = [member];

    jest.spyOn(memberRepository, 'findOne').mockResolvedValue(member);
    jest.spyOn(clubRepository, 'findOne').mockResolvedValue(club);

    const result = await service.findMemberFromClub(memberId, clubId);

    expect(result).toEqual(member);
  });

  it('should find members from a club', async () => {
    const clubId = 2;
    const members: MemberEntity[] = [
      {
        id: 1,
        username: 'username',
        birthday: new Date(),
        email: 'email@email.com',
        clubs: [],
      },
      {
        id: 2,
        username: 'username2',
        birthday: new Date(),
        email: 'email2@email.com',
        clubs: [],
      },
    ];
    const club: ClubEntity = {
      id: 1,
      name: 'name',
      birthday: new Date(),
      image: 'src/image',
      description: 'description',
      members: [],
    };
    club.members = members;

    jest.spyOn(clubRepository, 'findOne').mockResolvedValue(club);

    const result = await service.findMembersFromClub(clubId);

    expect(result).toEqual(members);
  });

  it('should update members from a club', async () => {
    const clubId = 2;
    const members: MemberEntity[] = [
      {
        id: 1,
        username: 'username',
        birthday: new Date(),
        email: 'email@email.com',
        clubs: [],
      },
      {
        id: 2,
        username: 'username2',
        birthday: new Date(),
        email: 'email2@email.com',
        clubs: [],
      },
    ];
    const club: ClubEntity = {
      id: 1,
      name: 'name',
      birthday: new Date(),
      image: 'src/image',
      description: 'description',
      members: [],
    };

    jest.spyOn(clubRepository, 'findOne').mockResolvedValue(club);
    jest.spyOn(memberRepository, 'findOne').mockResolvedValue({
      id: 1,
      username: 'username',
      birthday: new Date(),
      email: 'email@email.com',
      clubs: [],
    });
    jest.spyOn(clubRepository, 'save').mockResolvedValue(club);

    const result = await service.updateMembersFromClub(clubId, members);

    expect(result).toEqual(club);
  });

  it('should delete a member from a club', async () => {
    const memberId = 1;
    const clubId = 2;
    const member: MemberEntity = {
      id: 1,
      username: 'username',
      birthday: new Date(),
      email: 'email@email.com',
      clubs: [],
    };
    const club: ClubEntity = {
      id: 1,
      name: 'name',
      birthday: new Date(),
      image: 'src/image',
      description: 'description',
      members: [],
    };
    club.members = [member];

    jest.spyOn(memberRepository, 'findOne').mockResolvedValue(member);
    jest.spyOn(clubRepository, 'findOne').mockResolvedValue(club);
    jest.spyOn(clubRepository, 'save').mockResolvedValue(club);

    await service.deleteMemberFromClub(memberId, clubId);

    expect(club.members.length).toBe(0);
  });
});

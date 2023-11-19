import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { MemberEntity } from './member.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('MemberService', () => {
  let service: MemberService;
  let repository: Repository<MemberEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(MemberEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
    repository = module.get<Repository<MemberEntity>>(
      getRepositoryToken(MemberEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all members', async () => {
    const expectedMembers: MemberEntity[] = [
      {
        id: 1,
        username: 'username',
        birthday: new Date(),
        email: 'email@email.com',
        clubs: [],
      },
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(expectedMembers);

    const result = await service.findAll();

    expect(result).toEqual(expectedMembers);
  });

  it('should find one member by id', async () => {
    const expectedMember: MemberEntity = {
      id: 1,
      username: 'username',
      birthday: new Date(),
      email: 'email@email.com',
      clubs: [],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(expectedMember);

    const result = await service.findOne(1);

    expect(result).toEqual(expectedMember);
  });

  it('should create a new member', async () => {
    const memberToCreate: MemberEntity = {
      id: 1,
      username: 'username',
      birthday: new Date(),
      email: 'email@email.com',
      clubs: [],
    };
    jest.spyOn(repository, 'save').mockResolvedValue(memberToCreate);

    const result = await service.create(memberToCreate);

    expect(result).toEqual(memberToCreate);
  });

  it('should update an existing member', async () => {
    const existingMember: MemberEntity = {
      id: 1,
      username: 'username',
      birthday: new Date(),
      email: 'email@email.com',
      clubs: [],
    };
    const updatedMember: MemberEntity = {
      id: 1,
      username: 'NewUsername',
      birthday: new Date(),
      email: 'email2@email.com',
      clubs: [],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(existingMember);
    jest.spyOn(repository, 'save').mockResolvedValue(updatedMember);

    const result = await service.update(1, updatedMember);

    expect(result).toEqual(updatedMember);
  });

  it('should delete an existing member', async () => {
    const existingMember: MemberEntity = {
      id: 1,
      username: 'username',
      birthday: new Date(),
      email: 'email@email.com',
      clubs: [],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(existingMember);
    jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

    await expect(service.delete(1)).resolves.not.toThrow();
  });

  it('should validate a valid email', () => {
    const validEmail = 'test@example.com';
    const result = service.validateEmail(validEmail);
    expect(result).toBe(true);
  });

  it('should not validate an invalid email', () => {
    const invalidEmail = 'invalid-email';
    const result = service.validateEmail(invalidEmail);
    expect(result).toBe(false);
  });
});

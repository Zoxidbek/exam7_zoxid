import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = this.groupRepository.create(createGroupDto);
    return await this.groupRepository.save(newGroup);
  }

  async findAll(search?: string): Promise<Group[]> {
    if (search) {
      return await this.groupRepository.find({
        where: { sbj_name: ILike(`%${search}%`) },
        order: { id: 'DESC' },
      });
    }

    return await this.groupRepository.find({
      order: { id: 'DESC' },
    });
  }

  async update(id: number, updateData: Partial<CreateGroupDto>): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Group topilmadi');

    Object.assign(group, updateData);
    return await this.groupRepository.save(group);
  }

  async remove(id: number): Promise<{ message: string }> {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Group topilmadi');

    await this.groupRepository.remove(group);
    return { message: 'Group muvaffaqiyatli o‘chirildi ✅' };
  }
}

import { Controller, Get, Post, Body, Query, Put, Delete,Param, ParseIntPipe } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}


  @Post('add')
  async create(@Body() body: CreateGroupDto) {
    return await this.groupService.create(body);
  }

  @Get('get_all')
  async getAll(@Query('search') search?: string) {
    return await this.groupService.findAll(search);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<CreateGroupDto>) {
    return await this.groupService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.groupService.remove(id);
  }
}

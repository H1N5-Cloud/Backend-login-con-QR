import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from '../dto/create-docente.dto';
import { UpdateDocenteDto } from '../dto/update-docente.dto';

@Controller('docente')
export class DocenteController {
  constructor(private readonly DocenteService: DocenteService) {}

  @Post()
  create(@Body() createDocenteDto: CreateDocenteDto) {
    return this.DocenteService.create(createDocenteDto);
  }

  @Get()
  findAll() {
    return this.DocenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.DocenteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedocenteDto: UpdateDocenteDto) {
    return this.DocenteService.update(id, updatedocenteDto);
  }
  @Delete('all')
  async deleteAll() {
    return await this.DocenteService.deleteAll();
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    const result = await this.DocenteService.remove(id);
    return {
      message: 'docente borrado correctamente',
      count: result.deletedCount,
    };
  }
}

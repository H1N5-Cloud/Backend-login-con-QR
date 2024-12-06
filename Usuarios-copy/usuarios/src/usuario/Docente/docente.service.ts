import { Injectable } from '@nestjs/common';
import { CreateDocenteDto } from '../dto/create-docente.dto';
import { UpdateDocenteDto } from '../dto/update-docente.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Docente } from './tschema/docente.schema';

@Injectable()
export class DocenteService {
 
constructor(@InjectModel(Docente.name) private DocenteModel: Model<Docente>) {}
  
async create(createDocenteDto: CreateDocenteDto): Promise<Docente> {
  const createdDocente = new this.DocenteModel(createDocenteDto);
  return createdDocente.save();  
}
async findAll() {
  return await this.DocenteModel.find().exec();
}

async findOne(id: string) {
  return await this.DocenteModel.findOne({ _id: id }).exec();
}
async update(id: string, updateDocenteDto: UpdateDocenteDto): Promise<Docente> {
  const updatedDocente = await this.DocenteModel.findOneAndUpdate({ _id: id }, updateDocenteDto, { new: true }).exec();
  return updatedDocente;
}
  async deleteAll() {
    return await this.DocenteModel.deleteMany({});
  }

  async remove(id: string): Promise<{ deletedCount: number }> {
    const result = await this.DocenteModel.deleteOne({ _id: id }).exec();
    return { deletedCount: result.deletedCount };
}}


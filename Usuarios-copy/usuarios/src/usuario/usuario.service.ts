import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './tschema/usuario.schema';

@Injectable()
export class UsuarioService {
 
constructor(@InjectModel(Usuario.name) private UsuarioModel: Model<Usuario>) {}
  
async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
  const createdUsuario = new this.UsuarioModel(createUsuarioDto);
  return createdUsuario.save();  
}
async findAll() {
  return await this.UsuarioModel.find().exec();
}

async findOne(id: string) {
  return await this.UsuarioModel.findOne({ _id: id }).exec();
}
async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
  const updatedUsuario = await this.UsuarioModel.findOneAndUpdate({ _id: id }, updateUsuarioDto, { new: true }).exec();
  return updatedUsuario;
}
  async deleteAll() {
    return await this.UsuarioModel.deleteMany({});
  }

  async remove(id: string): Promise<{ deletedCount: number }> {
    const result = await this.UsuarioModel.deleteOne({ _id: id }).exec();
    return { deletedCount: result.deletedCount };
}}


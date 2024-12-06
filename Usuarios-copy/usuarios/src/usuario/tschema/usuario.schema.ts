import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type usuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
  @Prop()
  nombre: string;

  @Prop()
  usuario: string;

  @Prop()
  contraseña: string;

  @Prop()
  correo: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
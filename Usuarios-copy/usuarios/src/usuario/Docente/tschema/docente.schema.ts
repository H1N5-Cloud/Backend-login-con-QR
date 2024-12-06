import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type docenteDocument = HydratedDocument<Docente>;

@Schema()
export class Docente {
  @Prop()
  nombre: string;

  @Prop()
  usuario: string;

  @Prop()
  contraseña: string;

  @Prop()
  correo: string;
}

export const DocenteSchema = SchemaFactory.createForClass(Docente);
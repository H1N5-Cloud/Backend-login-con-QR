/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { HydratedDocument } from 'mongoose';
export type usuarioDocument = HydratedDocument<Usuario>;
export declare class Usuario {
    nombre: string;
    usuario: string;
    contraseña: string;
    correo: string;
}
export declare const UsuarioSchema: import("mongoose").Schema<Usuario, import("mongoose").Model<Usuario, any, any, any, import("mongoose").Document<unknown, any, Usuario> & Usuario & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Usuario, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Usuario>> & import("mongoose").FlatRecord<Usuario> & {
    _id: import("mongoose").Types.ObjectId;
}>;

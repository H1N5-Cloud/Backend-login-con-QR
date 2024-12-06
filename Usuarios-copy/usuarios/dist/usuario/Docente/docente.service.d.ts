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
import { CreateDocenteDto } from '../dto/create-docente.dto';
import { UpdateDocenteDto } from '../dto/update-docente.dto';
import { Model } from 'mongoose';
import { Docente } from './tschema/docente.schema';
export declare class DocenteService {
    private DocenteModel;
    constructor(DocenteModel: Model<Docente>);
    create(createDocenteDto: CreateDocenteDto): Promise<Docente>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Docente> & Docente & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Docente> & Docente & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateDocenteDto: UpdateDocenteDto): Promise<Docente>;
    deleteAll(): Promise<import("mongodb").DeleteResult>;
    remove(id: string): Promise<{
        deletedCount: number;
    }>;
}

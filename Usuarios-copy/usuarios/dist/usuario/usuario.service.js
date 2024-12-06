"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const usuario_schema_1 = require("./tschema/usuario.schema");
let UsuarioService = class UsuarioService {
    constructor(UsuarioModel) {
        this.UsuarioModel = UsuarioModel;
    }
    async create(createUsuarioDto) {
        const createdUsuario = new this.UsuarioModel(createUsuarioDto);
        return createdUsuario.save();
    }
    async findAll() {
        return await this.UsuarioModel.find().exec();
    }
    async findOne(id) {
        return await this.UsuarioModel.findOne({ _id: id }).exec();
    }
    async update(id, updateUsuarioDto) {
        const updatedUsuario = await this.UsuarioModel.findOneAndUpdate({ _id: id }, updateUsuarioDto, { new: true }).exec();
        return updatedUsuario;
    }
    async deleteAll() {
        return await this.UsuarioModel.deleteMany({});
    }
    async remove(id) {
        const result = await this.UsuarioModel.deleteOne({ _id: id }).exec();
        return { deletedCount: result.deletedCount };
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(usuario_schema_1.Usuario.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map
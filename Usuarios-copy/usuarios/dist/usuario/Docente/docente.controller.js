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
exports.DocenteController = void 0;
const common_1 = require("@nestjs/common");
const docente_service_1 = require("./docente.service");
const create_docente_dto_1 = require("../dto/create-docente.dto");
const update_docente_dto_1 = require("../dto/update-docente.dto");
let DocenteController = class DocenteController {
    constructor(DocenteService) {
        this.DocenteService = DocenteService;
    }
    create(createDocenteDto) {
        return this.DocenteService.create(createDocenteDto);
    }
    findAll() {
        return this.DocenteService.findAll();
    }
    findOne(id) {
        return this.DocenteService.findOne(id);
    }
    update(id, updatedocenteDto) {
        return this.DocenteService.update(id, updatedocenteDto);
    }
    async deleteAll() {
        return await this.DocenteService.deleteAll();
    }
    async remove(id) {
        const result = await this.DocenteService.remove(id);
        return {
            message: 'docente borrado correctamente',
            count: result.deletedCount,
        };
    }
};
exports.DocenteController = DocenteController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_docente_dto_1.CreateDocenteDto]),
    __metadata("design:returntype", void 0)
], DocenteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocenteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocenteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_docente_dto_1.UpdateDocenteDto]),
    __metadata("design:returntype", void 0)
], DocenteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocenteController.prototype, "deleteAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocenteController.prototype, "remove", null);
exports.DocenteController = DocenteController = __decorate([
    (0, common_1.Controller)('docente'),
    __metadata("design:paramtypes", [docente_service_1.DocenteService])
], DocenteController);
//# sourceMappingURL=docente.controller.js.map
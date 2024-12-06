"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocenteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_docente_dto_1 = require("./create-docente.dto");
class UpdateDocenteDto extends (0, mapped_types_1.PartialType)(create_docente_dto_1.CreateDocenteDto) {
}
exports.UpdateDocenteDto = UpdateDocenteDto;
//# sourceMappingURL=update-docente.dto.js.map
import { IsString, IsNumber, isStrongPassword ,IsEmail, IsStrongPassword } from 'class-validator';
export class CreateUsuarioDto {
    @IsString()
    nombre: string;

    @IsString()
    usuario: string;

    @IsStrongPassword()
    contraseña: string;

      @IsEmail()
    correo: string;
}

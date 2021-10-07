import { SetMetadata } from "@nestjs/common";





export const IS_PUBLIC_KEY = `ìsPublic`;
export const Public =() => SetMetadata(IS_PUBLIC_KEY,true); // si es publico  al devolver true no se necesita validacion  de Athorization
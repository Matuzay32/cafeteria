import {IsString} from "class-validator"

export class CreateCoffeeDto {
    @IsString()
    readonly name:string


    @IsString()
    readonly brand:string


    @IsString({ each: true }) //El {each:true} indica que es un array
    readonly flavors:string[]
}

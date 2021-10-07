import { PartialType } from "@nestjs/swagger"; // Uso esta libreria para tomar todos los elementos y propiedades de CreateCoffeDto
                                                    //Luego extiendo la clase para que UpdateCoffeeDto obtenga el PartialType




import { CreateCoffeeDto } from "./create-coffee.dto";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto)//paso como parametro el CreateCoffeeDto 
                                                                 // lo que hace este metodo es que toma todas las propiedades y las hace ocionales
{
    
}

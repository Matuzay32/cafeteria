import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from "./coffe.entity";

@Entity()
export class Flavor {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @ManyToMany((type)=>Coffee, (coffee)=>coffee.flavors)   //Ahora tomamos la otra parte de la relacion que es la otra entidad Coffee
                                                            //Luego tomamos la parte que queremos relacionar de coffe en este caso flavors
                                                            


    coffees:Coffee[];
}

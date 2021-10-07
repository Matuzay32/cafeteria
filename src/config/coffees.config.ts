import{registerAs} from "@nestjs/config"

export default registerAs('coffees', () => ({ // 👈
    foo: 'lo traigo desde el coffes config  lo registro en coffes module  como si fuera una tabla', // 👈
  }));
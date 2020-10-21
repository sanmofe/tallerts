export class Student{

    name:string;
    Código:number;
    Cédula:number;
    Edad:number;
    Dirección:string;
    Teléfono:number;

    constructor(name:string, code:number, id:number, age:number, address:string, tel:number){
        this.name = name;
        this.Código = code;
        this.Cédula = id;
        this.Edad = age;
        this.Dirección = address;
        this.Teléfono = tel;
    }

}
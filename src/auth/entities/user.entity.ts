import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column('text')
    firstname: string;

    @Column('text', {unique:true})
    email: string;

    @Column('text', {select: false})
    password: string;
    
    @Column('text', {array: true, default: []})
    roles: string;
    
    @Column('bool', {default: true})
    isActive: boolean; 
}
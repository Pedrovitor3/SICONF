import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany,  ManyToOne,  OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'; 
import { Pessoa } from './Pessoa';

@Entity("frequencia")
export class Frequencia {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    data: string;

    @OneToMany(()=> Pessoa,(pessoa) => pessoa.frequencia)
    pessoa: Pessoa[];
  
   
    @DeleteDateColumn()
    deleted_at: Date;

    @CreateDateColumn() // Para já capturar a data e fazer a formatação
    created_at: Date;

    @UpdateDateColumn() // Para já capturar a data e fazer a formatação
    update_at: Date;



    constructor() {
        // Se esse ID não existir, gerar um id
        if (!this.id) {
          this.id = uuid();
        }
      }
}
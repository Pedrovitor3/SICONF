import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany,  ManyToOne,  OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'; 
import { Frequencia } from './frequencia';

@Entity("pessoa")
export class Pessoa {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    position: number;

    @Column({nullable: true})
    situacao: string;
    
    @Column({nullable: true})
    faltas: string;
    
    @Column({nullable: true})
    observacao: string;

    @Column()
    regional: string;
    
    @Column()
    unidade_policial: string;

    @Column()
    cargo: string;
   
    @ManyToOne(() => Frequencia, (frequencia) => frequencia.pessoa, {nullable: false, eager: true})
    frequencia: Frequencia;  

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
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'movie_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  title: string;

  @Column({
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    nullable: false,
    unique: false,
  })
  author: number;

  @CreateDateColumn({type: 'timestamp with time zone'})
  datePosted: Date;

  @Column('int', {
    array: true,
    default: []
  })
  likes: number[];
  @Column('int', {
    array: true,
    default: []
  })
  hates: number[];
}
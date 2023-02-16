import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    nullable: false,
    unique: false,
  })
  authorName: string;

  @CreateDateColumn({type: 'timestamp with time zone'})
  datePosted: Date;

  @Column({
    type: 'int',
    nullable: false,
    array: true,
    default: []
  })
  likes: number[];

  @Column({
    type: 'int',
    nullable: false,
    array: true,
    default: []
  })
  hates: number[];
}
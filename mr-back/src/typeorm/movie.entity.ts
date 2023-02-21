import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

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

  // @Column({
  //   nullable: false,
  //   unique: false,
  // })
  // author: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: "author" })
  author: User;

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
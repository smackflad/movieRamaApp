import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({
    nullable: false,
    unique: false,
  })
  author: number;

  @CreateDateColumn({type: 'timestamp with time zone'})
  datePosted: Date;

  // @Column({
  //   type: 'int',
  //   nullable: false,
  //   array: true,
  //   default: []
  // })
  // likes: number[];
  @ManyToMany(() => User)
  @Column({ 
    array: true,
    default: []
   })
  likes: User[];

  // @Column({
  //   type: 'int',
  //   nullable: false,
  //   array: true,
  //   default: []
  // })
  // hates: number[];

  @ManyToMany(() => User)
  @Column({ 
    array: true,
    default: []
   })
  hates: User[];
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sbj_name: string;

  @Column('text', { array: true })
  lesson_days: string[];

  @Column()
  lesson_time: string;

  @Column()
  teacher_FIO: string;

  @Column()
  teacher_phone: string;

  @Column({ nullable: true })
  img: string;
}

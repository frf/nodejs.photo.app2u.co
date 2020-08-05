import { Entity, ObjectIdColumn, Column, BaseEntity } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity("images")
export class Image extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @ObjectIdColumn({ name: 'id' })
  _id!: string;

  @Column("int", { default: 0 })
  count: number;

  @IsNotEmpty()
  @Column()
  url: string;
}

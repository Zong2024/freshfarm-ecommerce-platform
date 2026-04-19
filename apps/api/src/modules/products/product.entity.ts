import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  title!: string;

  @Column({ length: 50 })
  category!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'text', nullable: true })
  content!: string;

  @Column({ length: 500, nullable: true })
  imageUrl!: string;

  @Column({ type: 'simple-json', nullable: true })
  imagesUrl!: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  origin_price!: number;

  @Column({ type: 'int', default: 0 })
  is_enabled!: number;

  @Column({ length: 20, nullable: true })
  unit!: string;

  @Column({ length: 100, nullable: true })
  farm!: string;

  @Column({ length: 50, nullable: true })
  origin!: string;

  @Column({ length: 50, nullable: true })
  weight!: string;

  @Column({ type: 'int', nullable: true })
  num!: number;

  @Column({ length: 500, nullable: true })
  eating_tips!: string;

  @Column({ length: 500, nullable: true })
  origin_info!: string;

  @Column({ length: 100, nullable: true })
  shelf_life!: string;

  @Column({ length: 200, nullable: true })
  storage_method!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ nullable: true })
	name: string;

	@Column()
	price: number;

	@Column()
	description: string;

	@Column()
	image: string;
}

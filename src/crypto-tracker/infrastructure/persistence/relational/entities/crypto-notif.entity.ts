import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from '../../../../dto/create-notif.dto';

@Entity({ name: 'crypto_notif' })
export class CryptoNotifEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  chain!: Tokens;

  @ApiProperty()
  @Column({ type: 'double precision' })
  dollar!: number;

  @ApiProperty()
  @Column({ type: 'boolean', default: 1 })
  enable!: boolean;

  @ApiProperty()
  @Column({ type: 'varchar' })
  email!: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}

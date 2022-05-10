import { MigrationInterface, QueryRunner, Table } from 'typeorm';


export class CreateCustomerUsers1649789231001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'customer_users',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
              },
              {
                name: 'customer_id',
                type: 'uuid',
              },
              {
                name: 'user_id',
                type: 'uuid',
              },
              {
                name: 'telephone',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'position',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'created_at',
                type: 'timestamptz',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamptz',
                default: 'now()',
              },
            ],
            foreignKeys: [
              {
                name: 'CustomerUsers',
                referencedTableName: 'customer',
                referencedColumnNames: ['id'],
                columnNames: ['customer_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
              },
              {
                name: 'UsersCustomerUsers',
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
              },
            ],
          }),
        );
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('customer_users');
      }

}

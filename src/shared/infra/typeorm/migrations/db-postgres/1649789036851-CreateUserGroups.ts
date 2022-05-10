import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
  } from 'typeorm';

export class CreateUserGroups1649789036851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'users_groups',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
              },
              {
                name: 'user_id',
                type: 'uuid',
              },
              {
                name: 'group_id',
                type: 'uuid',
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
          }),
        );

        await queryRunner.createForeignKey(
          'users_groups',
          new TableForeignKey({
            name: 'usersGroups',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        );

        await queryRunner.createForeignKey(
          'users_groups',
          new TableForeignKey({
            name: 'groupsUsers',
            columnNames: ['group_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'groups',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }),
        );
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_groups', 'usersGroups');
        await queryRunner.dropForeignKey('users_groups', 'groupsUsers');
        await queryRunner.dropTable('users_groups');
      }

}

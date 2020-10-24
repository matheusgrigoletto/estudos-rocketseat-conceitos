import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderColumnToProviderId1603560328486
  implements MigrationInterface {
  private tableName = 'appointments';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'provider');
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'fk_appointment_provider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, 'fk_appointment_provider');
    await queryRunner.dropColumn(this.tableName, 'provider_id');

    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}

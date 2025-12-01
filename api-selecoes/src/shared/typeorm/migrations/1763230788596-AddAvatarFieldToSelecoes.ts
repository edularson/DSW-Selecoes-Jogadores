import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAvatarFieldToSelecoes1763230788596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'selecoes',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('selecoes', 'avatar');
  }
}
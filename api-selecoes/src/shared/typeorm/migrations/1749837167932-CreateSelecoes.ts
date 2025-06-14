import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSelecoes1749837167932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'selecoes',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'pais',
                type: 'varchar',
              },
              {
                name: 'tecnico',
                type: 'varchar',
              },
              {
                name: 'confederacao',
                type: 'varchar',
              },
              {
                name: 'ranking_fifa',
                type: 'int',
              },
              {
                name: 'titulos_copa',
                type: 'int',
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
              },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('selecoes');
      }

}

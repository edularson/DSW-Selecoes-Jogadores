import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateJogadores1749837245953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'jogadores',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                    },
                    {
                        name: 'posicao',
                        type: 'varchar',
                    },
                    {
                        name: 'numero',
                        type: 'int',
                    },
                    {
                        name: 'clube',
                        type: 'varchar',
                    },
                    {
                        name: 'data_nascimento',
                        type: 'date',
                    },
                    {
                        name: 'selecao_id',
                        type: 'uuid',
                        isNullable: true,
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

        await queryRunner.createForeignKey(
            'jogadores',
            new TableForeignKey({
                name: 'FKJogadorSelecao',
                columnNames: ['selecao_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'selecoes',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('jogadores', 'FKJogadorSelecao');
        await queryRunner.dropTable('jogadores');
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1692151006397 implements MigrationInterface {
    name = 'Migrations1692151006397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "track_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_9cc0e8a743e689434dac0130098" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_c6ec16b57b60c8096406808021d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_319a74c2085b42849b15412a3bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_entity" ("id" uuid NOT NULL, CONSTRAINT "PK_e42953e6be13870839a04a3fa88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites_entity_artists_artist_entity" ("favoritesEntityId" uuid NOT NULL, "artistEntityId" uuid NOT NULL, CONSTRAINT "PK_468b69eb7c73065a5b39e94058f" PRIMARY KEY ("favoritesEntityId", "artistEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_61949671b9c5316b4c02d424cf" ON "favorites_entity_artists_artist_entity" ("favoritesEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f18979348ebc7f271d754f8663" ON "favorites_entity_artists_artist_entity" ("artistEntityId") `);
        await queryRunner.query(`CREATE TABLE "favorites_entity_albums_album_entity" ("favoritesEntityId" uuid NOT NULL, "albumEntityId" uuid NOT NULL, CONSTRAINT "PK_f280b153900d752d541cbf91e51" PRIMARY KEY ("favoritesEntityId", "albumEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a96e86025f5dddbc002ce05367" ON "favorites_entity_albums_album_entity" ("favoritesEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7de5ec2bd34b4cce844a624b43" ON "favorites_entity_albums_album_entity" ("albumEntityId") `);
        await queryRunner.query(`CREATE TABLE "favorites_entity_tracks_track_entity" ("favoritesEntityId" uuid NOT NULL, "trackEntityId" uuid NOT NULL, CONSTRAINT "PK_347c847ec432f350ba70631b929" PRIMARY KEY ("favoritesEntityId", "trackEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a544864e9562ab108b395ad130" ON "favorites_entity_tracks_track_entity" ("favoritesEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ab8b6c4c32778aa7b758950533" ON "favorites_entity_tracks_track_entity" ("trackEntityId") `);
        await queryRunner.query(`ALTER TABLE "track_entity" ADD CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track_entity" ADD CONSTRAINT "FK_f75df6098780938c05b7a65d2ca" FOREIGN KEY ("albumId") REFERENCES "album_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album_entity" ADD CONSTRAINT "FK_4aea5943406bd89eced202b012b" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites_entity_artists_artist_entity" ADD CONSTRAINT "FK_61949671b9c5316b4c02d424cf2" FOREIGN KEY ("favoritesEntityId") REFERENCES "favorites_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_entity_artists_artist_entity" ADD CONSTRAINT "FK_f18979348ebc7f271d754f86637" FOREIGN KEY ("artistEntityId") REFERENCES "artist_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_entity_albums_album_entity" ADD CONSTRAINT "FK_a96e86025f5dddbc002ce053675" FOREIGN KEY ("favoritesEntityId") REFERENCES "favorites_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_entity_albums_album_entity" ADD CONSTRAINT "FK_7de5ec2bd34b4cce844a624b43d" FOREIGN KEY ("albumEntityId") REFERENCES "album_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_entity_tracks_track_entity" ADD CONSTRAINT "FK_a544864e9562ab108b395ad1308" FOREIGN KEY ("favoritesEntityId") REFERENCES "favorites_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_entity_tracks_track_entity" ADD CONSTRAINT "FK_ab8b6c4c32778aa7b7589505337" FOREIGN KEY ("trackEntityId") REFERENCES "track_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites_entity_tracks_track_entity" DROP CONSTRAINT "FK_ab8b6c4c32778aa7b7589505337"`);
        await queryRunner.query(`ALTER TABLE "favorites_entity_tracks_track_entity" DROP CONSTRAINT "FK_a544864e9562ab108b395ad1308"`);
        await queryRunner.query(`ALTER TABLE "favorites_entity_albums_album_entity" DROP CONSTRAINT "FK_7de5ec2bd34b4cce844a624b43d"`);
        await queryRunner.query(`ALTER TABLE "favorites_entity_albums_album_entity" DROP CONSTRAINT "FK_a96e86025f5dddbc002ce053675"`);
        await queryRunner.query(`ALTER TABLE "favorites_entity_artists_artist_entity" DROP CONSTRAINT "FK_f18979348ebc7f271d754f86637"`);
        await queryRunner.query(`ALTER TABLE "favorites_entity_artists_artist_entity" DROP CONSTRAINT "FK_61949671b9c5316b4c02d424cf2"`);
        await queryRunner.query(`ALTER TABLE "album_entity" DROP CONSTRAINT "FK_4aea5943406bd89eced202b012b"`);
        await queryRunner.query(`ALTER TABLE "track_entity" DROP CONSTRAINT "FK_f75df6098780938c05b7a65d2ca"`);
        await queryRunner.query(`ALTER TABLE "track_entity" DROP CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab8b6c4c32778aa7b758950533"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a544864e9562ab108b395ad130"`);
        await queryRunner.query(`DROP TABLE "favorites_entity_tracks_track_entity"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7de5ec2bd34b4cce844a624b43"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a96e86025f5dddbc002ce05367"`);
        await queryRunner.query(`DROP TABLE "favorites_entity_albums_album_entity"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f18979348ebc7f271d754f8663"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_61949671b9c5316b4c02d424cf"`);
        await queryRunner.query(`DROP TABLE "favorites_entity_artists_artist_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "favorites_entity"`);
        await queryRunner.query(`DROP TABLE "album_entity"`);
        await queryRunner.query(`DROP TABLE "artist_entity"`);
        await queryRunner.query(`DROP TABLE "track_entity"`);
    }

}

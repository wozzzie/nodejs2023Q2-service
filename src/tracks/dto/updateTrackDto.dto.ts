import { IsString, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsUUID()
  artistId: string | null;

  @ApiProperty({ required: false })
  @IsUUID()
  albumId: string | null;

  @ApiProperty()
  @IsNumber()
  duration: number;
}

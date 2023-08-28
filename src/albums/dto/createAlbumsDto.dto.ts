import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumsDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  artistId: string;
}

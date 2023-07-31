import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumsDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  artistId: string;
}

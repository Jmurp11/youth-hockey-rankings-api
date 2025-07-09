import { ApiProperty } from '@nestjs/swagger';

export class Association {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  country: string;
}

export class League {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  abbreviation: string;
  @ApiProperty()
  location: string;
  @ApiProperty({ type: [Association], description: 'List of associations in the league' })
  associations?: Association[];
}

export class Team {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({description: 'The age group of the team.', example: '9u'})
  age: string;
  @ApiProperty()
  rating: number;
  @ApiProperty()
  record: string;
  @ApiProperty()
  agd: number;
  @ApiProperty()
  sched: number;
  @ApiProperty({ description: 'The association the team belongs to' })
  association: Association;
}

export class AssociationFull extends Association {
  @ApiProperty({ type: [League], description: 'List of leagues in the association' })
  leagues: League[];
  @ApiProperty({ type: [Team], description: 'List of teams in the association' })
  teams: Team[];
}

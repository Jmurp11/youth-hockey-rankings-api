import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from '../types';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('teams')
@Controller('v1/teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get('team/:id')
  @ApiResponse({
    status: 200,
    description: 'The team has been successfully returned.',
    type: Team,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the team' })
  async getTeam(@Param('id') id: number): Promise<Team | null> {
    return this.teamsService.getTeam(id);
  }

  @Get('age/:age')
  @ApiResponse({
    status: 200,
    description: 'The teams have been successfully returned.',
    type: [Team],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiParam({
    name: 'age',
    required: true,
    description: 'Get all teams by age group',
  })
  async getTeams(@Param('age') age: string): Promise<Team[]> {
    return this.teamsService.getTeams(age);
  }

  @Get('girls/:age')
  @ApiResponse({
    status: 200,
    description: 'The teams have been successfully returned.',
    type: [Team],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiParam({
    name: 'age',
    required: true,
    description: 'Get all girls teams by age group',
  })
  async getGirlsTeams(@Param('age') age: string): Promise<Team[]> {
    return this.teamsService.getGirlsTeams(age);
  }
}

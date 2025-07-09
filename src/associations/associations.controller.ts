import { Controller, Get, Param, Query } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationFull } from '../types';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('associations')
@Controller('v1/associations')
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The association has been successfully returned.',
    type: AssociationFull,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the association',
  })
  async getAssociation(
    @Param('id') id: string,
  ): Promise<AssociationFull | null> {
    return this.associationsService.getAssociation(parseInt(id));
  }

  @Get(':city/:state')
  @ApiResponse({
    status: 200,
    description: 'The associations have been successfully returned.',
    type: [AssociationFull],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiParam({ name: 'city', required: false, description: 'Filter by city' })
  @ApiParam({ name: 'state', required: false, description: 'Filter by state or province' })
  async getAssociations(
    @Param('city') city: string = '',
    @Param('state') state: string = '',
  ): Promise<AssociationFull[]> {
    return this.associationsService.getAssociations(city, state);
  }
}

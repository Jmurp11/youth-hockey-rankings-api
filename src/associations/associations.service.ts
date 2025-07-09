import { Injectable } from '@nestjs/common';
import { AssociationFull } from '../types';
import { supabase } from '../supabase';
@Injectable()
export class AssociationsService {
  async getAssociation(id: number): Promise<AssociationFull | null> {
    let { data: associationsfull, error } = await supabase
      .from('associationsfull')
      .select('*')
      .eq('id', `${id}`);
    if (error) {
      console.error('Error fetching association:', error);
      throw new Error('Failed to fetch association data');
    }

    if (!associationsfull || associationsfull.length === 0) {
      console.warn(`No association found with id: ${id}`);
      return null;
    }

    associationsfull = associationsfull.map((assoc) => ({
      ...assoc,
      leagues: assoc.leagues.map((league) => JSON.parse(league)),
      teams: assoc.teams.map((team) => JSON.parse(team)),
    }));

    return associationsfull[0] as AssociationFull;
  }

  async getAssociations(
    city: string,
    state: string,
  ): Promise<AssociationFull[]> {
    let { data: associationsfull, error } = await supabase
      .from('associationsfull')
      .select('*')
      .ilike('city', `%${city}%`)
      .ilike('state', `%${state}%`);
    if (error) {
      console.error('Error fetching associations:', error);
      throw new Error('Failed to fetch associations data');
    }
    if (!associationsfull || associationsfull.length === 0) {
      console.warn('No associations found');
      return [];
    }

    associationsfull = associationsfull.map((assoc) => ({
      ...assoc,
      leagues: assoc.leagues.map((league) => JSON.parse(league)),
      teams: assoc.teams.map((team) => JSON.parse(team)),
    }));

    return associationsfull as AssociationFull[];
  }

  async getAssociationsByState(state: string): Promise<AssociationFull[]> {
    let { data: associationsfull, error } = await supabase
      .from('associationsfull')
      .select('*')
      .ilike('state', `%${state}%`);
    if (error) {
      console.error('Error fetching associations:', error);
      throw new Error('Failed to fetch associations data');
    }
    if (!associationsfull || associationsfull.length === 0) {
      console.warn('No associations found');
      return [];
    }

    associationsfull = associationsfull.map((assoc) => ({
      ...assoc,
      leagues: assoc.leagues.map((league) => JSON.parse(league)),
      teams: assoc.teams.map((team) => JSON.parse(team)),
    }));

    return associationsfull as AssociationFull[];
  }
}

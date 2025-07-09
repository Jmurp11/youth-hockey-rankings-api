import { Injectable } from '@nestjs/common';
import { Team } from '../types';
import { supabase } from '../supabase';

@Injectable()
export class TeamsService {
  async getTeam(id: number): Promise<Team | null> {
    let { data: rankingswithassoc, error } = await supabase
      .from('rankingswithassoc')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching team:', error);
      throw new Error('Failed to fetch team data');
    }

    return {
      id: rankingswithassoc.id,
      name: rankingswithassoc.team_name,
      age: rankingswithassoc.age,
      rating: rankingswithassoc.rating,
      record: rankingswithassoc.record,
      agd: rankingswithassoc.agd,
      sched: rankingswithassoc.sched,
      association: {
        name: rankingswithassoc.name,
        city: rankingswithassoc.city,
        state: rankingswithassoc.state,
        country: rankingswithassoc.country,
      },
    } as Team;
  }

  async getTeams(age: string): Promise<Team[]> {
    let { data: rankingswithassoc, error } = await supabase
      .from('rankingswithassoc')
      .select('*')
      .ilike('age', age)
      .eq('girls_only', false);

    if (error) {
      console.error('Error fetching teams:', error);
      throw new Error('Failed to fetch teams data');
    }
    if (!rankingswithassoc || rankingswithassoc.length === 0) {
      console.warn(`No teams found for age group: ${age}`);
      return [];
    }
    rankingswithassoc = rankingswithassoc.map((team) => ({
      id: team.id,
      team: team.team_name,
      age: team.age,
      rating: team.rating,
      record: team.record,
      agd: team.agd,
      sched: team.sched,
      association: {
        name: team.name,
        city: team.city,
        state: team.state,
        country: team.country,
      },
    }));
    return rankingswithassoc as Team[];
  }
  async getGirlsTeams(age: string): Promise<Team[]> {
    let { data: rankingswithassoc, error } = await supabase
      .from('rankingswithassoc')
      .select('*')
      .ilike('age', age)
      .eq('girls_only', true);

    if (error) {
      console.error('Error fetching teams:', error);
      throw new Error('Failed to fetch teams data');
    }
    if (!rankingswithassoc || rankingswithassoc.length === 0) {
      console.warn(`No teams found for age group: ${age}`);
      return [];
    }
    rankingswithassoc = rankingswithassoc.map((team) => ({
      id: team.id,
      team: team.team_name,
      age: team.age,
      rating: team.rating,
      record: team.record,
      agd: team.agd,
      sched: team.sched,
      association: {
        name: team.name,
        city: team.city,
        state: team.state,
        country: team.country,
      },
    }));
    return rankingswithassoc as Team[];
  }
}

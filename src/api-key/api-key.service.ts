import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase';
@Injectable()
export class ApiKeyService {
  async findByKey(apikey: string): Promise<any | null> {
    let { data: api_users, error } = await supabase
      .from('api_users')
      .select('*')
      .eq('api_key', `${apikey}`);

    if (error) {
      console.error('Error fetching API key:', error);
      throw new Error('Failed to fetch API key data');
    }

    return api_users;
  }
}

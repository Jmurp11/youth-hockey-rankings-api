import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeaguesModule } from './leagues/leagues.module';
import { AssociationsModule } from './associations/associations.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [AssociationsModule, LeaguesModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

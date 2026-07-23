import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { EpisodesService } from './episodes.service';
import { ConfigService } from '../config/config.service';
import { IsPositivePipe } from '../pipes/is-positive-pipe';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe)
    limit: number,
  ) {
    return this.episodesService.findAll(sort);
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    return episode;
  }

  @Post()
  create(@Body(ValidationPipe) dto: CreateEpisodeDto) {
    return this.episodesService.create(dto);
  }
}

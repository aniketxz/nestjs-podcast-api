import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { EpisodesService } from './episodes.service';
import { ConfigService } from '../config/config.service';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
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
  create(@Body() dto: CreateEpisodeDto) {
    return this.episodesService.create(dto);
  }
}

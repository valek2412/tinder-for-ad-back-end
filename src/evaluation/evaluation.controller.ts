import { Body, Controller, Post } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { AddMarkDto } from './dto/addMark.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private evaluationService: EvaluationService) {}

  @Post()
  addMark(@Body() dto: AddMarkDto) {
    const mark = this.evaluationService.addMark(dto);
    return mark;
  }
}

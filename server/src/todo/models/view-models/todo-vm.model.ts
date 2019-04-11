import { ApiModelProperty } from '@nestjs/swagger';
import { EnumToArray } from '../../../shared/utilities/enum-to-array';
import { TodoLevel } from '../todo-level.enum';
import { BaseModelVm } from '../../../shared/base.model';

export class TodoVm extends BaseModelVm {
  @ApiModelProperty()
  content: string;

  @ApiModelProperty({ enum: EnumToArray(TodoLevel) })
  level: TodoLevel;

  @ApiModelProperty()
  isCompleted: boolean;
}
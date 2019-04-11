import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../user-role.enum';
import { BaseModelVm } from '../../../shared/base.model';
import { EnumToArray } from '../../../shared/utilities/enum-to-array';

export class UserVm extends BaseModelVm {
  @ApiModelProperty()
  username: string;

  @ApiModelPropertyOptional()
  firstName?: string;
  
  @ApiModelPropertyOptional()
  lastName?: string;

  @ApiModelPropertyOptional()
  fullName?: string;

  @ApiModelPropertyOptional({ enum: EnumToArray(UserRole) })
  role?: UserRole;
}
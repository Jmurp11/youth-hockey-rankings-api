import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ApiKeyService } from "./api-key.service";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) throw new UnauthorizedException();

    const record = await this.apiKeyService.findByKey(apiKey);
    if (!record || !record.is_active) throw new UnauthorizedException();

    req.apiKeyRecord = record;
    return true;
  }
}
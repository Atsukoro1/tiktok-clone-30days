import { Controller } from "@nestjs/common";
import { MeService } from "./@me.service";

@Controller()
export class MeController {
    constructor(
        private readonly service: MeService
    ) {}
}
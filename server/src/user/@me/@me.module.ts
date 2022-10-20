import { MeController } from "./@me.controller";
import { MeService } from "./@me.service";
import { Module } from "@nestjs/common";

@Module({
    controllers: [MeController],
    providers: [MeService]
})
export class MeModule {};
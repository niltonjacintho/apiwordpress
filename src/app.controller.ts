import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/getUsers')
  getUsers(): Promise<any> {
    return this.appService.getUsuarios();
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: number): Promise<any> {
    return this.appService.removerUsuarios(id);
  }
}

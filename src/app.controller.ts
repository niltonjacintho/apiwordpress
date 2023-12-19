import { Controller, Delete, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(): Promise<string> {
    await this.appService.getHello();
    return 'this.appService.getHello();'
  }

  @Get('/getUsers')
  getUsers(): Promise<any> {
    return this.appService.getUsuarios();
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string): Promise<any> {
    return this.appService.removerUsuarios(id);
  }

  @Get('/update')
  async updateDadosLocais(): Promise<any> {
    console.log('updateDadosLoca');
    return await this.appService.updateDadosLocais(true);
  }
}

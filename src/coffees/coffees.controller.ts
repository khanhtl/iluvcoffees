import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  getAll() {
    return this.coffeesService.getAll();
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto, @Res() res: Response) {
    return res.status(HttpStatus.CREATED).json(this.coffeesService.addCoffee(createCoffeeDto));
  }

  @Patch(':id')
  update(@Body() createCoffeeDto: CreateCoffeeDto, @Param('id') id: number, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.coffeesService.updateCoffee(id, createCoffeeDto));
  }

  @Get(':id')
  findById(@Param('id') id: number, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.coffeesService.findCoffeeById(id));
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.coffeesService.deleteCoffee(id));
  }
}

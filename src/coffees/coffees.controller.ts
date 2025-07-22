import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  getAll() {
    return this.coffeesService.getAll();
  }

  @Post()
  async create(@Body() createCoffeeDto: CreateCoffeeDto, @Res() res: Response) {
    const coffee = await this.coffeesService.addCoffee(createCoffeeDto);
    return res.status(HttpStatus.CREATED).json(coffee);
  }

  @Patch(':id')
  async update(@Body() updateCoffeeDto: UpdateCoffeeDto, @Param('id') id: number, @Res() res: Response) {
    const coffee = await this.coffeesService.updateCoffee(id, updateCoffeeDto);
    return res.status(HttpStatus.OK).json(coffee);
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response) {
    const coffee = await this.coffeesService.findCoffeeById(id);
    return res.status(HttpStatus.OK).json(coffee);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    const result = await this.coffeesService.deleteCoffee(id);
    return res.status(HttpStatus.OK).json(result);
  }
}

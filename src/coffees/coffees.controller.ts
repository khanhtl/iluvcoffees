import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) { }
    @Get()
    getAll() {
        return this.coffeesService.getAll();
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeesService.addCoffee(createCoffeeDto);
    }

    @Patch(':id')
    update(@Body() createCoffeeDto: CreateCoffeeDto, @Param('id') id: number) {
        return this.coffeesService.updateCoffee(id, createCoffeeDto);
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.coffeesService.findCoffeeById(id);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.coffeesService.deleteCoffee(id);
    }

}

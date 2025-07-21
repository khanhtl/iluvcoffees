import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entity/coffee';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [{
        id: 1,
        name: 'Espresso',
        brand: 'CoffeeBrand',
        flavors: ['bitter', 'strong']
    }];
    
    getAll() {
        return this.coffees;
    }
    
    addCoffee(createCoffeeDto: CreateCoffeeDto) {
        const newCoffee = {
            ...createCoffeeDto,
            id: Date.now(), 
        };
        this.coffees.push(newCoffee);
        return newCoffee;
    }

    findCoffeeById(id: number): Coffee {
        const coffee =  this.coffees.find(coffee => coffee.id === id);
        if (!coffee) {
            throw new NotFoundException(`Coffee with ID ${id} not found`);
        }
        return coffee;
    }

    updateCoffee(id: number, updatedCoffee: UpdateCoffeeDto): Coffee | undefined {
        const coffee = this.findCoffeeById(id);
        if (coffee) {
            Object.assign(coffee, updatedCoffee);
            return coffee;
        }
        return undefined;
    }

    deleteCoffee(id: number): boolean {
        this.findCoffeeById(id);
        const index = this.coffees.findIndex(coffee => coffee.id === id);
        if (index !== -1) {
            this.coffees.splice(index, 1);
            return true;
        }
        return false;
    }
}

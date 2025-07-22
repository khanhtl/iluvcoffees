import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entity/coffee';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeesRepository: Repository<Coffee>
    ) {}
    
    getAll() {
        return this.coffeesRepository.find();
    }
    
    addCoffee(createCoffeeDto: CreateCoffeeDto) {
        const newCoffee = this.coffeesRepository.create(createCoffeeDto);
        return this.coffeesRepository.save(newCoffee);
    }

    async findCoffeeById(id: number): Promise<Coffee> {
        const coffee = await this.coffeesRepository.findOne({ where: { id } });
        if (!coffee) {
            throw new NotFoundException(`Coffee with ID ${id} not found`);
        }
        return coffee;
    }

    async updateCoffee(id: number, updatedCoffee: UpdateCoffeeDto): Promise<Coffee> {
        const coffee = await this.coffeesRepository.preload({ id, ...updatedCoffee });
        if (!coffee) {
            throw new NotFoundException(`Coffee with ID ${id} not found`);
        }
        return this.coffeesRepository.save(coffee);
    }

    async deleteCoffee(id: number): Promise<Coffee> {
        const coffee = await this.findCoffeeById(id);
        return await this.coffeesRepository.remove(coffee);
    }
}
import React from 'react';
import CarCard from './CarCard';
import { Car } from '../../types';

interface CarListProps {
    cars: Car[];
    onCarSelect?: (car: Car) => void;
}

const CarList: React.FC<CarListProps> = ({ cars, onCarSelect }) => {
    return (
        <div className="car-list">
            <div className="car-grid">
                {cars.map((car) => (
                    <CarCard
                        key={car.id}
                        car={car}
                        onClick={() => onCarSelect?.(car)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarList;

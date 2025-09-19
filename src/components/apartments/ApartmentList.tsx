import React from 'react';
import ApartmentCard from './ApartmentCard';
import { Apartment } from '../../types';

interface ApartmentListProps {
    apartments: Apartment[];
    onApartmentSelect?: (apartment: Apartment) => void;
}

const ApartmentList: React.FC<ApartmentListProps> = ({ apartments, onApartmentSelect }) => {
    return (
        <div className="apartment-list">
            <div className="apartment-grid">
                {apartments.map((apartment) => (
                    <ApartmentCard
                        key={apartment.id}
                        apartment={apartment}
                        onClick={() => onApartmentSelect?.(apartment)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ApartmentList;

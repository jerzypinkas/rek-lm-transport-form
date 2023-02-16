import * as React from 'react';

export default function Plane({currentCargoWeight, totalCargoWeightAllowed}) {
    console.log('carAllowed', totalCargoWeightAllowed);
    console.log('cargoTotal', currentCargoWeight);
    return (
        <div>{currentCargoWeight.currentCargoWeight || 0} / {totalCargoWeightAllowed.totalCargoWeightAllowed || 0}</div>
    );
}
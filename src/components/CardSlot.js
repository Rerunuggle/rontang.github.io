import React from 'react';
import Card from './Card';
import './CardSlot.css';

const CardSlot = ({ row, col, card, onDrop, isValidDrop, area = 'playArea' }) => {
  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const cardId = e.dataTransfer.getData('cardId');
    const cardSource = e.dataTransfer.getData('cardSource');
    const cardPosition = JSON.parse(e.dataTransfer.getData('cardPosition') || '{}');
    
    if (onDrop) {
      onDrop({
        cardId,
        source: cardSource,
        sourcePosition: cardPosition,
        targetPosition: { row, col, area }
      });
    }
  };

  // Render the card if one exists in this slot
  const renderCard = () => {
    if (!card) return null;
    
    return (
      <div className="card-slot-content">
        <Card 
          id={card.id}
          color={card.color}
          value={card.value}
          position={{ row, col, area }}
        />
      </div>
    );
  };

  const slotClassName = `card-slot ${isValidDrop ? 'valid-drop' : ''} ${card ? 'occupied' : 'empty'} ${area === 'handArea' ? 'hand-slot' : 'play-slot'}`;

  return (
    <div 
      className={slotClassName}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-row={row}
      data-col={col}
      data-area={area}
    >
      {card ? renderCard() : <div className="slot-indicator" />}
    </div>
  );
};

export default CardSlot; 
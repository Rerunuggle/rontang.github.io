import React, { useRef } from 'react';
import './Card.css';

const Card = ({ id, color, value, isDragging, position, onDragStart, onDragEnd, onClick }) => {
  const cardRef = useRef(null);

  // Determine symbol based on value
  const getSymbol = () => {
    if (color === 'wild') return '';
    if (value === 'A') return 'A';
    if (value === 'J') return 'J';
    if (value === 'Q') return 'Q';
    if (value === 'K') return 'K';
    return value;
  };

  // Determine color class
  const getColorClass = () => {
    switch (color) {
      case 'red': return 'card-red';
      case 'blue': return 'card-blue';
      case 'yellow': return 'card-yellow';
      case 'black': return 'card-black';
      case 'wild': return 'card-wild';
      default: return '';
    }
  };

  // Handle drag start
  const handleDragStart = (e) => {
    e.dataTransfer.setData('cardId', id);
    e.dataTransfer.setData('cardSource', position?.area || 'hand');
    e.dataTransfer.setData('cardPosition', JSON.stringify(position));
    
    // Add a small delay to make the drag image appear correctly
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add('dragging');
      }
    }, 0);
    
    if (onDragStart) onDragStart(id, position);
  };

  // Handle drag end
  const handleDragEnd = (e) => {
    if (cardRef.current) {
      cardRef.current.classList.remove('dragging');
    }
    if (onDragEnd) onDragEnd(id);
  };

  return (
    <div 
      ref={cardRef}
      className={`card ${getColorClass()} ${isDragging ? 'dragging' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={onClick}
      data-card-id={id}
    >
      <div className="card-corner top-left">
        <div className="card-value">{getSymbol()}</div>
      </div>
      <div className="card-center">
        <div className="card-symbol">{getSymbol()}</div>
      </div>
      <div className="card-corner bottom-right">
        <div className="card-value">{getSymbol()}</div>
      </div>
    </div>
  );
};

export default Card; 
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import CardSlot from '../components/CardSlot';
import './PermuCards.css';

const GRID_DIMENSIONS = {
  playArea: { rows: 6, cols: 20 },
  handArea: { rows: 2, cols: 20 }
};

const PermuCards = () => {
  // State for cards in hand, cards in play, and deck
  const [hand, setHand] = useState([]);
  const [playArea, setPlayArea] = useState(createEmptyGrid(GRID_DIMENSIONS.playArea.rows, GRID_DIMENSIONS.playArea.cols));
  const [handArea, setHandArea] = useState(createEmptyGrid(GRID_DIMENSIONS.handArea.rows, GRID_DIMENSIONS.handArea.cols));
  const [deck, setDeck] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [message, setMessage] = useState('');
  const [currentRound, setCurrentRound] = useState(1);
  const [cardsPlayedThisRound, setCardsPlayedThisRound] = useState(0);
  const [previousPlayArea, setPreviousPlayArea] = useState(null);
  const [validatedGroups, setValidatedGroups] = useState([]);
  const [cardsPlayedPositions, setCardsPlayedPositions] = useState([]);

  // Initialize the game
  useEffect(() => {
    initializeGame();
    // Set the document title
    document.title = "Ron Tang";
  }, []);


  function createEmptyGrid(rows, cols) {
    const grid = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push(null);
      }
      grid.push(row);
    }
    return grid;
  }

  // Create a full deck of cards
  const createDeck = () => {
    const colors = ['red', 'blue', 'yellow', 'black'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    let newDeck = [];
    
    // Add regular cards
    colors.forEach(color => {
      values.forEach(value => {
        newDeck.push({ id: `${color}-${value}`, color, value });
      });
    });
    
    // Add wild cards
    newDeck.push({ id: 'wild-1', color: 'wild', value: '' });
    newDeck.push({ id: 'wild-2', color: 'wild', value: '' });
    
    return shuffleDeck(newDeck);
  };

  // Shuffle the deck using Fisher-Yates algorithm
  const shuffleDeck = (deck) => {
    const newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
  };

  // Initialize the game
  const initializeGame = () => {
    const newDeck = createDeck();
    const initialHand = newDeck.slice(0, 7);
    const remainingDeck = newDeck.slice(7);
    
    setDeck(remainingDeck);
    setHand(initialHand);
    
    // Define grid dimensions
    const playAreaRows = 6;
    const playAreaCols = 20;
    const handAreaRows = 2;
    const handAreaCols = 20;
    
    // Create empty play and hand areas
    const emptyPlayArea = createEmptyGrid(playAreaRows, playAreaCols);
    const emptyHandArea = createEmptyGrid(handAreaRows, handAreaCols);
    
    // Place initial cards in hand area
    const newHandArea = [...emptyHandArea];
    
    // Place cards in first row from left to right
    for (let i = 0; i < initialHand.length; i++) {
      newHandArea[0][i] = { 
        ...initialHand[i], 
        position: { row: 0, col: i, area: 'handArea' } 
      };
    }
    
    setPlayArea(emptyPlayArea);
    setHandArea(newHandArea);
    setSelectedCards([]);
    setMessage('Drag cards to the play area');
    setCurrentRound(1);
    setCardsPlayedThisRound(0);
    setPreviousPlayArea(null);
    setValidatedGroups([]);
    setCardsPlayedPositions([]);
  };

  // Draw a card from the deck
  const drawCard = () => {
    if (deck.length === 0) {
      setMessage('No more cards in the deck!');
      return;
    }
    
    // If player has played cards this round but hasn't ended the round,
    // return those cards to hand first
    if (cardsPlayedThisRound > 0) {
      // Restore the play area to its state at the beginning of the round
      if (previousPlayArea) {
        setPlayArea(previousPlayArea);
      }
      
      // Return the played cards to hand
      const newHandArea = [...handArea];
      
      // For each card played this round, find an empty slot in hand area
      for (const playedCard of cardsPlayedPositions) {
        const card = playedCard.card;
        
        // Find first empty slot in hand
        let placed = false;
        for (let r = 0; r < GRID_DIMENSIONS.handArea.rows && !placed; r++) {
          for (let c = 0; c < GRID_DIMENSIONS.handArea.cols && !placed; c++) {
            if (newHandArea[r][c] === null) {
              newHandArea[r][c] = { 
                ...card, 
                position: { row: r, col: c, area: 'handArea' } 
              };
              placed = true;
            }
          }
        }
      }
      
      setHandArea(newHandArea);
      setCardsPlayedThisRound(0);
      setCardsPlayedPositions([]);
      setMessage('Cards returned to hand, drew a new card');
    }
    
    const newCard = deck[0];
    const newDeck = deck.slice(1);
    
    // Add card to hand area in first available slot
    const newHandArea = [...handArea];
    let placed = false;
    
    // Always find the first available empty slot
    for (let r = 0; r < GRID_DIMENSIONS.handArea.rows && !placed; r++) {
      for (let c = 0; c < GRID_DIMENSIONS.handArea.cols && !placed; c++) {
        if (newHandArea[r][c] === null) {
          newHandArea[r][c] = { 
            ...newCard, 
            position: { row: r, col: c, area: 'handArea' } 
          };
          placed = true;
        }
      }
    }
    
    if (placed) {
      setHandArea(newHandArea);
      setDeck(newDeck);
      
      // If we previously returned cards to hand, the message is already set
      if (cardsPlayedThisRound === 0) {
        setMessage('Drew a new card');
      }
    } else {
      setMessage('Your hand is full! Play some cards first.');
    }
  };

  // Count cards in hand area
  const countCardsInHand = () => {
    const handAreaRows = 2;
    const handAreaCols = 20;
    
    let count = 0;
    for (let r = 0; r < handAreaRows; r++) {
      for (let c = 0; c < handAreaCols; c++) {
        if (handArea[r][c] !== null) {
          count++;
        }
      }
    }
    return count;
  };

  // Handle card drop in the play area
  const handlePlayAreaDrop = (dropInfo) => {
    const { cardId, source, targetPosition } = dropInfo;
    const { row, col } = targetPosition;
    
    // Don't allow drops on occupied slots
    if (playArea[row][col] !== null) {
      setMessage('This slot is already occupied');
      return;
    }
    
    // Handle card from hand area
    if (source === 'handArea') {
      const sourcePos = dropInfo.sourcePosition;
      if (!sourcePos || sourcePos.row === undefined || sourcePos.col === undefined) return;
      
      const card = handArea[sourcePos.row][sourcePos.col];
      if (!card) return;
      
      // Save the current play area state if this is the first card played this round
      if (cardsPlayedThisRound === 0) {
        setPreviousPlayArea(JSON.parse(JSON.stringify(playArea)));
      }
      
      // Update hand area and play area
      const newHandArea = [...handArea];
      newHandArea[sourcePos.row][sourcePos.col] = null;
      
      const newPlayArea = [...playArea];
      newPlayArea[row][col] = { ...card, position: { row, col, area: 'playArea' } };
      
      setHandArea(newHandArea);
      setPlayArea(newPlayArea);
      setCardsPlayedThisRound(cardsPlayedThisRound + 1);
      
      // Track the card position that was played
      setCardsPlayedPositions([...cardsPlayedPositions, {
        card: { ...card },
        source: { row: sourcePos.row, col: sourcePos.col },
        target: { row, col }
      }]);
      
      setMessage('Card moved to play area');
    } 
    // Handle card from play area (repositioning)
    else if (source === 'playArea') {
      const sourcePos = dropInfo.sourcePosition;
      if (!sourcePos || sourcePos.row === undefined || sourcePos.col === undefined) return;
      
      const card = playArea[sourcePos.row][sourcePos.col];
      if (!card) return;
      
      // Check if the card is part of a validated group
      const isCardValidated = validatedGroups.some(group => 
        group.some(validatedCard => 
          validatedCard.position.row === sourcePos.row && 
          validatedCard.position.col === sourcePos.col
        )
      );
      
      // If the card is part of a validated group, don't allow moving it
      if (isCardValidated) {
        setMessage('This card is part of a valid group and cannot be moved');
        return;
      }
      
      // Update play area
      const newPlayArea = [...playArea];
      newPlayArea[sourcePos.row][sourcePos.col] = null;
      newPlayArea[row][col] = { ...card, position: { row, col, area: 'playArea' } };
      
      setPlayArea(newPlayArea);
      setMessage('Card repositioned');
    }
  };
  
  // Handle card drop in the hand area
  const handleHandAreaDrop = (dropInfo) => {
    const { cardId, source, targetPosition } = dropInfo;
    const { row, col } = targetPosition;
    
    // Don't allow drops on occupied slots
    if (handArea[row][col] !== null) {
      setMessage('This slot is already occupied');
      return;
    }
    
    // Handle card from play area
    if (source === 'playArea') {
      const sourcePos = dropInfo.sourcePosition;
      if (!sourcePos || sourcePos.row === undefined || sourcePos.col === undefined) return;
      
      const card = playArea[sourcePos.row][sourcePos.col];
      if (!card) return;
      
      // Check if the card is part of a validated group
      const isCardValidated = validatedGroups.some(group => 
        group.some(validatedCard => 
          validatedCard.position.row === sourcePos.row && 
          validatedCard.position.col === sourcePos.col
        )
      );
      
      // If the card is part of a validated group, don't allow moving it back to hand
      if (isCardValidated) {
        setMessage('This card is part of a valid group and cannot be moved back to hand');
        return;
      }
      
      // Update play area and hand area
      const newPlayArea = [...playArea];
      newPlayArea[sourcePos.row][sourcePos.col] = null;
      
      const newHandArea = [...handArea];
      newHandArea[row][col] = { ...card, position: { row, col, area: 'handArea' } };
      
      setPlayArea(newPlayArea);
      setHandArea(newHandArea);
      setMessage('Card moved to hand');
    } 
    // Handle card from hand area (repositioning)
    else if (source === 'handArea') {
      const sourcePos = dropInfo.sourcePosition;
      if (!sourcePos || sourcePos.row === undefined || sourcePos.col === undefined) return;
      
      const card = handArea[sourcePos.row][sourcePos.col];
      if (!card) return;
      
      // Update hand area
      const newHandArea = [...handArea];
      newHandArea[sourcePos.row][sourcePos.col] = null;
      newHandArea[row][col] = { ...card, position: { row, col, area: 'handArea' } };
      
      setHandArea(newHandArea);
      setMessage('Card repositioned in hand');
    }
  };

  // End the current round and validate the play area
  const endRound = () => {
    // Check if player has done anything this round
    if (cardsPlayedThisRound === 0) {
      setMessage('You must play at least one card or draw a card');
      return;
    }
    
    // Get all groups in the play area
    const groups = identifyGroups();
    
    // Validate the play area
    if (!validatePlayArea()) {
      setMessage('Invalid arrangement! Returning cards to hand.');
      
      // Restore the play area to its state at the beginning of the round
      if (previousPlayArea) {
        setPlayArea(previousPlayArea);
      }
      
      // Return the played cards to hand
      const newHandArea = [...handArea];
      
      // For each card played this round, find an empty slot in hand area
      for (const playedCard of cardsPlayedPositions) {
        const card = playedCard.card;
        
        // Find first empty slot in hand
        let placed = false;
        for (let r = 0; r < GRID_DIMENSIONS.handArea.rows && !placed; r++) {
          for (let c = 0; c < GRID_DIMENSIONS.handArea.cols && !placed; c++) {
            if (newHandArea[r][c] === null) {
              newHandArea[r][c] = { 
                ...card, 
                position: { row: r, col: c, area: 'handArea' } 
              };
              placed = true;
            }
          }
        }
      }
      
      setHandArea(newHandArea);
      setCardsPlayedThisRound(0);
      setCardsPlayedPositions([]);
      
      return;
    }
    
    // Store the validated groups for locking
    const validGroups = groups.map(group => {
      return group.map(card => ({
        ...card,
        validated: true
      }));
    });
    
    // Add these validated groups to the existing ones
    setValidatedGroups([...validatedGroups, ...validGroups]);
    
    // Proceed to next round
    setCurrentRound(currentRound + 1);
    setCardsPlayedThisRound(0);
    setCardsPlayedPositions([]);
    setPreviousPlayArea(JSON.parse(JSON.stringify(playArea)));
    setMessage('Drag cards to the play area');
    
    // Check win condition
    if (countCardsInHand() === 0) {
      setMessage('Congratulations! You have played all your cards!');
    }
  };

  // Validate the entire play area
  const validatePlayArea = () => {
    // Run the debug validation which gives us detailed insights
    // into what might be going wrong
    return debugValidation();
  };

  // Identify all card groups in the play area
  const identifyGroups = () => {
    const groups = [];
    const visited = new Set();
    
    // Define play area dimensions
    const playAreaRows = 6;
    const playAreaCols = 20;
    
    // Helper to get card at position
    const getCard = (r, c) => {
      if (r < 0 || r >= playAreaRows || c < 0 || c >= playAreaCols) return null;
      return playArea[r][c];
    };
    
    // Helper to mark position as visited
    const markVisited = (r, c) => {
      visited.add(`${r}-${c}`);
    };
    
    // Helper to check if position is visited
    const isVisited = (r, c) => {
      return visited.has(`${r}-${c}`);
    };

    // Helper to check if a set of cards forms a valid same-value group
    const isSameValueGroup = (cards) => {
      // Need at least 3 cards to form a valid group
      if (cards.length < 3) return false;
      
      // Filter out wild cards
      const nonWildCards = cards.filter(card => card.color !== 'wild');
      const wildCards = cards.filter(card => card.color === 'wild');
      
      // If all cards are wild, it's valid only if there are at least 3
      if (nonWildCards.length === 0) return wildCards.length >= 3;
      
      // Get unique values and colors
      const values = [...new Set(nonWildCards.map(card => card.value))];
      const colors = [...new Set(nonWildCards.map(card => card.color))];
      
      // For same-value groups:
      // 1. All non-wild cards must have the same value
      // 2. There should be at least 2 different colors (otherwise it's potentially a sequence)
      // 3. Total number of cards (including wilds) must be at least 3
      
      // Check if all non-wild cards have the same value
      if (values.length === 1) {
        // If all non-wild cards have the same color, it might be a partial sequence
        // But if there are different colors, it's a valid same-value group
        if (colors.length > 1) {
          return true;
        } else {
          // All same color and value - need at least 3 total cards
          return nonWildCards.length + wildCards.length >= 3;
        }
      }
      
      // If we have different values, it's not a valid same-value group
      return false;
    };
    
    // Helper to check if a set of cards forms a valid sequence group
    const isSequenceGroup = (cards) => {
      // Need at least 3 cards to form a valid group
      if (cards.length < 3) return false;
      
      // Filter out wild cards
      const nonWildCards = cards.filter(card => card.color !== 'wild');
      const wildCards = cards.filter(card => card.color === 'wild');
      
      // If all cards are wild, it's valid only if there are at least 3
      if (nonWildCards.length === 0) return wildCards.length >= 3;
      
      // If there's only 1 non-wild card, it's invalid (need at least 2 + wilds)
      if (nonWildCards.length === 1) return false;
      
      // Get unique colors
      const colors = new Set(nonWildCards.map(card => card.color));
      if (colors.size !== 1) return false; // Must be same color
      
      // Convert card values to numbers for sequence checking
      const valueToNumber = (value) => {
        if (value === 'A') return 1;
        if (value === 'J') return 11;
        if (value === 'Q') return 12;
        if (value === 'K') return 13;
        return parseInt(value, 10);
      };
      
      // Sort non-wild cards by value
      const sortedCards = [...nonWildCards].sort((a, b) => valueToNumber(a.value) - valueToNumber(b.value));
      
      // Check if they form a sequence with potential gaps for wild cards
      let wildCount = wildCards.length;
      
      for (let i = 1; i < sortedCards.length; i++) {
        const gap = valueToNumber(sortedCards[i].value) - valueToNumber(sortedCards[i-1].value) - 1;
        if (gap > 0) {
          if (gap > wildCount) return false;
          wildCount -= gap;
        }
      }
      
      return true;
    };
    
    // Find and validate horizontal groups
    for (let r = 0; r < playAreaRows; r++) {
      let cardIndices = [];
      
      // Find all cards in this row
      for (let c = 0; c < playAreaCols; c++) {
        if (getCard(r, c) && !isVisited(r, c)) {
          cardIndices.push(c);
        }
      }
      
      // Try all possible subgroups with minimum length 3
      if (cardIndices.length >= 3) {
        // Try consecutive subgroups first (better for detecting sequences)
        for (let start = 0; start < cardIndices.length; start++) {
          for (let end = start + 2; end < cardIndices.length; end++) {
            // Check if all indices from start to end are consecutive
            let isConsecutive = true;
            for (let i = start; i < end; i++) {
              if (cardIndices[i + 1] - cardIndices[i] !== 1) {
                isConsecutive = false;
                break;
              }
            }
            
            if (isConsecutive) {
              const potentialGroup = [];
              for (let i = start; i <= end; i++) {
                potentialGroup.push(getCard(r, cardIndices[i]));
              }
              
              // Check if this forms a valid group
              if (isSameValueGroup(potentialGroup) || isSequenceGroup(potentialGroup)) {
                // Mark all cards in the group as visited
                for (let i = start; i <= end; i++) {
                  markVisited(r, cardIndices[i]);
                }
                
                groups.push(potentialGroup);
              }
            }
          }
        }
        
        // Try non-consecutive groups for same-value groups
        // Collect all unvisited cards in this row
        const remainingCards = [];
        for (let c = 0; c < playAreaCols; c++) {
          if (getCard(r, c) && !isVisited(r, c)) {
            remainingCards.push({
              card: getCard(r, c),
              col: c
            });
          }
        }
        
        // Try grouping by value
        const cardsByValue = {};
        const wildCards = [];
        
        // Group cards by value
        remainingCards.forEach(cardObj => {
          if (cardObj.card.color === 'wild') {
            wildCards.push(cardObj);
          } else {
            if (!cardsByValue[cardObj.card.value]) {
              cardsByValue[cardObj.card.value] = [];
            }
            cardsByValue[cardObj.card.value].push(cardObj);
          }
        });
        
        // Check each value group + wild cards
        for (const value in cardsByValue) {
          if (cardsByValue[value].length + wildCards.length >= 3) {
            const potentialGroup = [
              ...cardsByValue[value].map(cardObj => cardObj.card),
              ...wildCards.map(cardObj => cardObj.card)
            ];
            
            if (isSameValueGroup(potentialGroup)) {
              // Mark all cards in this group as visited
              [...cardsByValue[value], ...wildCards].forEach(cardObj => {
                markVisited(r, cardObj.col);
              });
              
              groups.push(potentialGroup);
            }
          }
        }
      }
    }
    
    // Reset visited for vertical groups
    visited.clear();
    
    // Find and validate vertical groups (similar approach as horizontal)
    for (let c = 0; c < playAreaCols; c++) {
      let cardIndices = [];
      
      // Find all cards in this column
      for (let r = 0; r < playAreaRows; r++) {
        if (getCard(r, c) && !isVisited(r, c)) {
          cardIndices.push(r);
        }
      }
      
      // Try all possible subgroups with minimum length 3
      if (cardIndices.length >= 3) {
        // Try consecutive subgroups first (better for detecting sequences)
        for (let start = 0; start < cardIndices.length; start++) {
          for (let end = start + 2; end < cardIndices.length; end++) {
            // Check if all indices from start to end are consecutive
            let isConsecutive = true;
            for (let i = start; i < end; i++) {
              if (cardIndices[i + 1] - cardIndices[i] !== 1) {
                isConsecutive = false;
                break;
              }
            }
            
            if (isConsecutive) {
              const potentialGroup = [];
              for (let i = start; i <= end; i++) {
                potentialGroup.push(getCard(cardIndices[i], c));
              }
              
              // Check if this forms a valid group
              if (isSameValueGroup(potentialGroup) || isSequenceGroup(potentialGroup)) {
                // Mark all cards in the group as visited
                for (let i = start; i <= end; i++) {
                  markVisited(cardIndices[i], c);
                }
                
                groups.push(potentialGroup);
              }
            }
          }
        }
        
        // Try non-consecutive groups for same-value groups
        // Collect all unvisited cards in this column
        const remainingCards = [];
        for (let r = 0; r < playAreaRows; r++) {
          if (getCard(r, c) && !isVisited(r, c)) {
            remainingCards.push({
              card: getCard(r, c),
              row: r
            });
          }
        }
        
        // Try grouping by value
        const cardsByValue = {};
        const wildCards = [];
        
        // Group cards by value
        remainingCards.forEach(cardObj => {
          if (cardObj.card.color === 'wild') {
            wildCards.push(cardObj);
          } else {
            if (!cardsByValue[cardObj.card.value]) {
              cardsByValue[cardObj.card.value] = [];
            }
            cardsByValue[cardObj.card.value].push(cardObj);
          }
        });
        
        // Check each value group + wild cards
        for (const value in cardsByValue) {
          if (cardsByValue[value].length + wildCards.length >= 3) {
            const potentialGroup = [
              ...cardsByValue[value].map(cardObj => cardObj.card),
              ...wildCards.map(cardObj => cardObj.card)
            ];
            
            if (isSameValueGroup(potentialGroup)) {
              // Mark all cards in this group as visited
              [...cardsByValue[value], ...wildCards].forEach(cardObj => {
                markVisited(cardObj.row, c);
              });
              
              groups.push(potentialGroup);
            }
          }
        }
      }
    }
    
    return groups;
  };

  // Check if selected cards form a valid group
  const isValidGroup = (cards) => {
    // Need at least 3 cards to form a valid group
    if (cards.length < 3) {
      return false;
    }

    // Count wild cards
    const wildCards = cards.filter(card => card.color === 'wild');
    const nonWildCards = cards.filter(card => card.color !== 'wild');
    
    // If all cards are wild, it's valid
    if (wildCards.length === cards.length) {
      return true;
    }
    
    // Check if all non-wild cards have the same color (must be a sequence)
    const colors = [...new Set(nonWildCards.map(card => card.color))];
    const sameColor = colors.length === 1;
    
    if (sameColor) {
      // Convert card values to numbers for sequence checking
      const valueToNumber = (value) => {
        if (value === 'A') return 1;
        if (value === 'J') return 11;
        if (value === 'Q') return 12;
        if (value === 'K') return 13;
        return parseInt(value, 10);
      };
      
      // Sort non-wild cards by value
      const sortedNonWildCards = [...nonWildCards].sort((a, b) => valueToNumber(a.value) - valueToNumber(b.value));
      
      // If there are only 1 or 2 non-wild cards, we need at least 1 wild card to make a valid sequence
      if (sortedNonWildCards.length + wildCards.length < 3) {
        return false;
      }
      
      // Check if they form a sequence, allowing wild cards to fill gaps
      let availableWildCards = wildCards.length;
      
      for (let i = 1; i < sortedNonWildCards.length; i++) {
        const gap = valueToNumber(sortedNonWildCards[i].value) - valueToNumber(sortedNonWildCards[i-1].value) - 1;
        
        if (gap > 0) {
          // Need wild cards to fill the gap
          if (gap > availableWildCards) {
            return false; // Not enough wild cards to fill the gap
          }
          availableWildCards -= gap;
        }
      }
      
      return true;
    } else {
      // Different colors, must have the same value
      // Get all unique values from non-wild cards
      const values = [...new Set(nonWildCards.map(card => card.value))];
      
      // For a valid group: either all same value or enough wild cards to make it work
      return values.length === 1 || (values.length === 0 && wildCards.length >= 3) || 
             (values.length === 1 && (nonWildCards.length + wildCards.length) >= 3);
    }
  };

  // Render the play area grid
  const renderPlayArea = () => {
    return (
      <div className="play-area-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', gap: '2px'}}>
        {playArea.map((row, rowIndex) => (
          row.map((card, colIndex) => (
            <CardSlot
              key={`play-slot-${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              card={card}
              onDrop={handlePlayAreaDrop}
              area="playArea"
            />
          ))
        ))}
      </div>
    );
  };
  
  // Render the hand area grid
  const renderHandArea = () => {
    return (
      <div className="hand-area-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '2px'}}>
        {handArea.map((row, rowIndex) => (
          row.map((card, colIndex) => (
            <CardSlot
              key={`hand-slot-${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              card={card}
              onDrop={handleHandAreaDrop}
              area="handArea"
            />
          ))
        ))}
      </div>
    );
  };

  // For debugging validation issues
  const debugValidation = () => {
    // Get all cards in the play area
    const cardsInPlay = [];
    playArea.forEach((row, r) => {
      row.forEach((card, c) => {
        if (card) {
          cardsInPlay.push({
            ...card,
            position: { row: r, col: c }
          });
        }
      });
    });
    
    if (cardsInPlay.length === 0) {
      console.log("No cards in play area");
      return true;
    }
    
    // Identify groups
    const groups = identifyGroups();
    console.log("Found groups:", groups);
    
    // Validate each group
    let allGroupsValid = true;
    groups.forEach((group, index) => {
      const isValid = isValidGroup(group);
      console.log(`Group ${index + 1}: ${isValid ? 'Valid' : 'Invalid'}`, group);
      if (!isValid) allGroupsValid = false;
    });
    
    // Check if all cards are in valid groups
    const cardsInGroups = new Set();
    groups.forEach(group => {
      group.forEach(card => {
        if (card && card.id) {
          cardsInGroups.add(card.id);
        }
      });
    });
    
    let allCardsInGroups = true;
    cardsInPlay.forEach(card => {
      if (!cardsInGroups.has(card.id)) {
        console.log("Card not in any group:", card);
        allCardsInGroups = false;
      }
    });
    
    console.log("All groups valid:", allGroupsValid);
    console.log("All cards in groups:", allCardsInGroups);
    
    return allGroupsValid && allCardsInGroups;
  };

  return (
    <div className="permucards-page">
      <div className="permucards-header">
        <h1>PermuCards</h1>
      </div>
      
      <div className="game-container">
        <h2>Table</h2>
        {renderPlayArea()}
        
        <div className="game-controls">
          <button className="game-button" onClick={initializeGame}>New Game</button>
          <button className="game-button primary" onClick={endRound}>End Round</button>
        </div>
        
        <div className="hand-header">
          <h2>Hand</h2>
          <p className="game-message">{message}</p>
          <button className="game-button" onClick={drawCard}>Draw</button>
        </div>
        {renderHandArea()}
      </div>
      
      <div className="game-rules">
        <h3>Game Rules</h3>
        <ul>
          <li>Same color cards must form a sequence of 3 or more (e.g., Blue 1-2-3)</li>
          <li>Different color cards must have the same value and consist of 3 or more cards (e.g., Red 5, Blue 5, Yellow 5)</li>
          <li>Wild cards can substitute for any card in a sequence or group (e.g., Red 9, Wild, Red J, Red Q)</li>
          <li>Wild cards can be moved and reused in different combinations</li>
          <li>Drag cards from your hand to the play area</li>
          <li>Rearrange cards in the play area to form valid groups</li>
          <li>Click "End Round" to validate your play and move to the next round</li>
          <li>Each round you must either play at least one card or draw a card</li>
          <li>Try to play all your cards!</li>
        </ul>
      </div>
    </div>
  );
};

const Grid = ({ gridData, onDrop, area, columns, rows }) => (
  <div 
    className={`${area}-grid`}
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: '2px'
    }}
  >
    {gridData.map((row, rowIndex) => (
      row.map((card, colIndex) => (
        <CardSlot
          key={`${area}-slot-${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          card={card}
          onDrop={onDrop}
          area={area}
        />
      ))
    ))}
  </div>
);

export default PermuCards;



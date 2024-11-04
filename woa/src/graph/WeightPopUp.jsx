import React, { useState } from 'react';

const WeightPopup = ({ x, y, initialWeight, onSave, onClose }) => {
  const [weight, setWeight] = useState(initialWeight);

  const handleSave = () => {
    onSave(weight);
    onClose();
  };

  const setWeightValue = (value) => {
    if (!isNaN(value)){
      setWeight(value);
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: y+5,
        left: x+5,
        backgroundColor: 'white',
        border: '1px solid black',
        padding: '8px',
        borderRadius: '5px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <label>Weight:</label>
      <input
        type="text"
        value={weight}
        onChange={(e) => setWeightValue(e.target.value)}
        style={{ width: '30px', marginLeft: '5px', border:'1px solid' }}
      />
      <button className='bg-blue-600 p-1 rounded-md' onClick={handleSave} style={{ marginLeft: '10px' }}>Save</button>
      <button className='bg-red-500 p-1 rounded-md' onClick={onClose} style={{ marginLeft: '5px' }}>Cancel</button>
    </div>
  );
};

export default WeightPopup;

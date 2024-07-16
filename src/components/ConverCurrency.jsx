import React, { useState, useEffect } from 'react';

const ConvertCurrency = () => {
  const [amount, setAmount] = useState('');
  const [pricePerLiter, setPricePerLiter] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const calculateLiters = () => {
      if (amount && pricePerLiter) {
        const amountValue = parseFloat(amount);
        const pricePerLiterValue = parseFloat(pricePerLiter);
        const liters = amountValue / pricePerLiterValue;
        setResult(liters.toFixed(4)); // ปัดเศษทศนิยม 4 ตำแหน่ง
      } else {
        setResult(null);
      }
    };

    calculateLiters();
  }, [amount, pricePerLiter]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePricePerLiterChange = (e) => {
    setPricePerLiter(e.target.value);
  };

  return (
    <div className='row'>
  <div className='col-md-4'>
    <label htmlFor='amountInput'>จำนวนเงิน (บาท):</label>
    <input
      type='number'
      id='amountInput' // Add an id attribute here
      className='form-control'
      value={amount}
      onChange={handleAmountChange}
    />
  </div>
  <div className='col-md-4'>
    <label htmlFor='priceInput'>ราคา (บาท/หน่วย):</label>
    <input
      type='number'
      id='priceInput' // Add an id attribute here
      className='form-control'
      value={pricePerLiter}
      onChange={handlePricePerLiterChange}
    />
  </div>
  <div className='col-md-4'>
    <label htmlFor='resultInput'>ผลลัพธ์ (หน่วย):</label>
    <input
      type='number'
      id='resultInput' // Add an id attribute here
      className='form-control'
      value={result !== null ? parseFloat(result).toFixed(4) : ''}
      readOnly
    />
  </div>
</div>

  );
};

export default ConvertCurrency;

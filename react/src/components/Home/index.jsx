import React, { useState } from 'react';

export const Home = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [resetOnNextInput, setResetOnNextInput] = useState(false);

  const handleNumberClick = (num) => {
    if (resetOnNextInput) {
      setCurrentValue(String(num));
      setResetOnNextInput(false);
    } else {
      setCurrentValue(currentValue === '0' ? String(num) : currentValue + num);
    }
  };

  const handleDecimalClick = () => {
    if (resetOnNextInput) {
      setCurrentValue('0.');
      setResetOnNextInput(false);
    } else if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  const handleOperationClick = (op) => {
    if (operation && !resetOnNextInput) {
      handleEquals();
    }
    setPreviousValue(currentValue);
    setOperation(op);
    setResetOnNextInput(true);
  };

  const handleEquals = () => {
    if (!operation || previousValue === null) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = current !== 0 ? prev / current : 0;
        break;
      default:
        return;
    }

    setCurrentValue(String(result));
    setPreviousValue(null);
    setOperation(null);
    setResetOnNextInput(true);
  };

  const handleClear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setResetOnNextInput(false);
  };

  const handleToggleSign = () => {
    setCurrentValue(String(parseFloat(currentValue) * -1));
  };

  const handlePercent = () => {
    setCurrentValue(String(parseFloat(currentValue) / 100));
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#000000',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    calculator: {
      width: '100%',
      maxWidth: '390px',
      backgroundColor: '#000000',
      borderRadius: '40px',
      padding: '20px'
    },
    display: {
      color: '#FFFFFF',
      fontSize: '80px',
      textAlign: 'right',
      padding: '20px',
      marginBottom: '10px',
      minHeight: '100px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      fontWeight: '300',
      wordBreak: 'break-all'
    },
    buttonsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px'
    },
    button: {
      border: 'none',
      borderRadius: '50%',
      fontSize: '32px',
      fontWeight: '400',
      cursor: 'pointer',
      aspectRatio: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.2s',
      outline: 'none'
    },
    numberButton: {
      backgroundColor: '#333333',
      color: '#FFFFFF'
    },
    functionButton: {
      backgroundColor: '#A5A5A5',
      color: '#000000'
    },
    operationButton: {
      backgroundColor: '#FF9500',
      color: '#FFFFFF'
    },
    zeroButton: {
      gridColumn: 'span 2',
      borderRadius: '50px',
      justifyContent: 'flex-start',
      paddingLeft: '32px'
    },
    activeOperation: {
      backgroundColor: '#FFFFFF',
      color: '#FF9500'
    }
  };

  const formatDisplay = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0';
    if (value.endsWith('.')) return value;
    if (Math.abs(num) > 999999999) return num.toExponential(2);
    return value.length > 9 ? num.toPrecision(6) : value;
  };

  const Button = ({ value, onClick, type = 'number', isActive = false }) => {
    let buttonStyle = { ...styles.button };
    
    if (type === 'function') {
      buttonStyle = { ...buttonStyle, ...styles.functionButton };
    } else if (type === 'operation') {
      buttonStyle = { ...buttonStyle, ...styles.operationButton };
      if (isActive) {
        buttonStyle = { ...buttonStyle, ...styles.activeOperation };
      }
    } else {
      buttonStyle = { ...buttonStyle, ...styles.numberButton };
    }

    if (value === '0') {
      buttonStyle = { ...buttonStyle, ...styles.zeroButton };
    }

    return (
      <button
        style={buttonStyle}
        onClick={onClick}
        onMouseDown={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseUp={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        {value}
      </button>
    );
  };

  return (
    <div data-easytag="id1-react/src/components/Home/index.jsx" style={styles.container}>
      <div style={styles.calculator}>
        <div style={styles.display}>
          {formatDisplay(currentValue)}
        </div>
        <div style={styles.buttonsGrid}>
          <Button value="AC" onClick={handleClear} type="function" />
          <Button value="+/-" onClick={handleToggleSign} type="function" />
          <Button value="%" onClick={handlePercent} type="function" />
          <Button value="÷" onClick={() => handleOperationClick('÷')} type="operation" isActive={operation === '÷'} />
          
          <Button value="7" onClick={() => handleNumberClick('7')} />
          <Button value="8" onClick={() => handleNumberClick('8')} />
          <Button value="9" onClick={() => handleNumberClick('9')} />
          <Button value="×" onClick={() => handleOperationClick('×')} type="operation" isActive={operation === '×'} />
          
          <Button value="4" onClick={() => handleNumberClick('4')} />
          <Button value="5" onClick={() => handleNumberClick('5')} />
          <Button value="6" onClick={() => handleNumberClick('6')} />
          <Button value="-" onClick={() => handleOperationClick('-')} type="operation" isActive={operation === '-'} />
          
          <Button value="1" onClick={() => handleNumberClick('1')} />
          <Button value="2" onClick={() => handleNumberClick('2')} />
          <Button value="3" onClick={() => handleNumberClick('3')} />
          <Button value="+" onClick={() => handleOperationClick('+')} type="operation" isActive={operation === '+'} />
          
          <Button value="0" onClick={() => handleNumberClick('0')} />
          <Button value="." onClick={handleDecimalClick} />
          <Button value="=" onClick={handleEquals} type="operation" />
        </div>
      </div>
    </div>
  );
};


import React from 'react';

const Balance = ({ balances }) => {
  return (
    <div>
      <h2>Balance Sheet</h2>
      <ul>
        {balances.map((balance) => (
          <li key={balance.userId}>
            {balance.name} owes {balance.amount < 0 ? 'you' : balance.amount}{' '}
            {Math.abs(balance.amount).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Balance;
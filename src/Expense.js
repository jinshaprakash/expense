
import React, { useState } from 'react';

const Expense = ({ addExpense, users }) => {
  const [expense, setExpense] = useState({
    payer: '',
    amount: 0,
    totalPeople: 0,
    participants: [],
    type: 'EQUAL',
    shares: [],
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleShareChange = (e, index) => {
    const newShares = [...expense.shares];
    newShares[index] = parseFloat(e.target.value) || 0;
    setExpense({ ...expense, shares: newShares });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(expense);
    setExpense({
      payer: '',
      amount: 0,
      totalPeople: 0,
      participants: [],
      type: 'EQUAL',
      shares: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Payer:</label>
      <select name="payer" value={expense.payer} onChange={handleChange} required>
        {users.map((user) => (
          <option key={user.userId} value={user.userId}>
            {user.name}
          </option>
        ))}
        {/* <option>aa</option> */}
      </select>

      <label>Amount:</label>
      <input type="number" name="amount" value={expense.amount} onChange={handleChange} required />

      <label>Total People:</label>
      <input type="number" name="totalPeople" value={expense.totalPeople} onChange={handleChange} required />

      <label>Participants:</label>
      {users.map((user) => (
        <label key={user.userId}>
          <input
            type="checkbox"
            name="participants"
            value={user.userId}
            checked={expense.participants.includes(user.userId)}
            onChange={handleChange}
          />
          {user.name}
        </label>
      ))}

      <label>Expense Type:</label>
      <select name="type" value={expense.type} onChange={handleChange} required>
        <option value="EQUAL">Equal</option>
        <option value="EXACT">Exact</option>
        <option value="PERCENT">Percent</option>
      </select>

      {expense.type === 'PERCENT' && (
        <div>
          <label>Percentage Shares:</label>
          {users.map((user, index) => (
            <input
              key={user.userId}
              type="number"
              name={`percent-${user.userId}`}
              placeholder={`${user.name} (${user.userId})`}
              value={expense.shares[index] || ''}
              onChange={(e) => handleShareChange(e, index)}
            />
          ))}
        </div>
      )}

      <button type="submit" onClick={handleChange}>Add Expense</button>
    </form>
  );
};

export default Expense;
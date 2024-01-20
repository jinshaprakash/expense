import logo from './logo.svg';
import './App.css';
import Expense from './Expense';
import Balance from './Balance';
import Form from './Form';
import { useState } from 'react';
function App() {
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  // const [balance, updateBalances] = useState([])

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
    updateBalances(expense);
  };

  
  const updateBalances = (expense) => {
    const updatedUsers = [...users];
    const { payer, amount, totalPeople, participants, type, shares } = expense;

    updatedUsers.forEach((user) => {
      if (!user.balances) {
        user.balances = {};
      }
    });

    
    if (type === 'EQUAL') {
      const shareAmount = amount / totalPeople;
      participants.forEach((participant) => {
        updatedUsers.find((user) => user.userId === participant).balances[payer] = shareAmount;
      });
    } else if (type === 'EXACT') {
      participants.forEach((participant, index) => {
        updatedUsers.find((user) => user.userId === participant).balances[payer] = shares[index];
      });
    } else if (type === 'PERCENT') {
      const totalPercent = shares.reduce((acc, percent) => acc + percent, 0);
      const shareMultiplier = totalPercent !== 100 ? totalPercent / 100 : 1;

      participants.forEach((participant, index) => {
        const shareAmount = (amount * shares[index]) / 100 / shareMultiplier;
        updatedUsers.find((user) => user.userId === participant).balances[payer] = shareAmount;
      });
    }

    setUsers(updatedUsers);
  };

 
  const getBalances = () => {
    const balances = [];
    users.forEach((user) => {
      let totalBalance = 0;
      Object.values(user.balances).forEach((balance) => {
        totalBalance += balance;
      });

      if (totalBalance !== 0) {
        balances.push({ userId: user.userId, name: user.name, amount: totalBalance });
      }
    });

    return balances;
  };
  return (
    <div className="App">
      <h1>Expense App</h1>
      <Form addUser={addUser} />
      <Expense addExpense={addExpense} users={users} />
      <Balance balances={getBalances()} />
      
    </div>
  );
}

export default App;

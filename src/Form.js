import React,{useState} from 'react'

const Form = ({addUser}) => {
    const [user, setUser] = useState({ userId: 1, name: 'user1', email: 'user1@gmail.com', mobile: 11 });
    console.log(user)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(user);
        setUser({ userId: '', name: '', email: '', mobile: '' });
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} required />

            <label>Mobile Number:</label>
            <input type="text" name="mobile" value={user.mobile} onChange={handleChange} required />

            <button type="submit">Add User</button>
        </form>
    </div>
  )
}

export default Form
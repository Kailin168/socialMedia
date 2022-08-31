import React from 'react';
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { AuthContext } from '../contexts/contexts';

function CreateAccount() {
  return <div />;
  // const { setUser } = useContext(AuthContext);
  // const navigate = useNavigate();

  // const [errorMessage, setErrorMessage] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [accountPassword, setAccountPassword] = useState('');
  // const [accountUsername, setAccountUsername] = useState('');

  // const handleAccountFirstName = (e) => setFirstName(e.target.value);
  // const handleAccountLastName = (e) => setLastName(e.target.value);
  // const handleAccountUsername = (e) => setAccountUsername(e.target.value);
  // const handleAccountPassword = (e) => setAccountPassword(e.target.value);
  // const handleAccountEmail = (e) => setEmail(e.target.value);

  // useEffect(() => {
  //   setErrorMessage('');
  //   setFirstName('');
  //   setLastName('');
  //   setAccountUsername('');
  //   setAccountPassword('');
  //   setEmail('');
  // }, []);

  // const handleAccountSubmit = (e) => {
  //   e.preventDefault();
  //   const createAccount = {
  //     first_name: firstName,
  //     last_name: lastName,
  //     email,
  //     username: accountUsername,
  //     password: accountPassword,
  //   };
  //   console.log(createAccount);
  //   fetch('/create_user', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accepts: 'application/json',
  //     },
  //     body: JSON.stringify(createAccount),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         res.json()
  //           .then((data) => {
  //             console.log(data);
  //             setErrorMessage('');
  //             setUser(data);
  //             navigate('/');
  //           });
  //       } else {
  //         res.json()
  //           .then(({ error }) => setErrorMessage(error));
  //       }
  //     });
  // };

  // return (
  //   <div>
  //     Create an Account:
  //     <form onSubmit={handleAccountSubmit}>
  //       <div style={{ margin: '10px 0' }}>
  //         <label>First Name:</label>
  //         <input
  //           type="text"
  //           name="firstname"
  //           placeholder="First Name"
  //           value={firstName || ''}
  //           onChange={handleAccountFirstName}
  //         />
  //       </div>
  //       <div style={{ margin: '10px 0' }}>
  //         <label>Last Name:</label>
  //         <input
  //           type="text"
  //           name="username"
  //           placeholder="Last Name"
  //           value={lastName || ''}
  //           onChange={handleAccountLastName}
  //         />
  //       </div>
  //       <div style={{ margin: '10px 0' }}>
  //         <label>Username:</label>
  //         <input
  //           type="text"
  //           name="username"
  //           placeholder="username"
  //           value={accountUsername || ''}
  //           onChange={handleAccountUsername}
  //         />
  //       </div>
  //       <div style={{ margin: '10px 0' }}>
  //         <label>Email:</label>
  //         <input
  //           type="text"
  //           name="email"
  //           placeholder="e-mail"
  //           value={email || ''}
  //           onChange={handleAccountEmail}
  //         />
  //       </div>
  //       <div style={{ margin: '10px 0' }}>
  //         <label>Password:</label>
  //         <input
  //           type="password"
  //           name="password"
  //           placeholder="password"
  //           value={accountPassword || ''}
  //           onChange={handleAccountPassword}
  //         />
  //       </div>
  //       <p style={{ color: 'red' }}>{errorMessage || null}</p>
  //       <input type="submit" />
  //     </form>
  //   </div>
  // );
}

export default CreateAccount;

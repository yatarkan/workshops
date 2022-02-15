import { useState, useRef } from 'react';
import { config } from '../../../constants';

const sendRegisterUserRequest = async (user) => {
  await fetch(config.usersDBUrl, {
    method: 'POST',
    body: JSON.stringify(user),
  }).catch((error) => {
    console.error(error);
    alert(`Failed to register user ${user.name}`);
  });
}

const fetchLastRegisteredUserNumber = async () => {
  const url = `${config.usersDBUrl}?orderBy="userNumber"&limitToLast=1`;
  const usersMap = await fetch(url).then(async (result) => {
    return await result.json();
  });
  const [{ userNumber }] = Object.values(usersMap);
  return userNumber
}

const fetchUserNameExists = async (userName) => {
  const url = `${config.usersDBUrl}?orderBy="name"&equalTo="${userName}"&&limitToLast=1`;
  const response = await fetch(url).then(async (result) => {
    return await result.json();
  });
  return !!response
}

const userNameErrors = {
  empty: 'Name is empty',
  exists: 'Name is already registered',
  maxUsersLimit: 'Registered users limit has been reached',
};

function WorkshopUser({ workshopUser, registerUser, useCustomUserNumber }) {
  const { hosts } = config;

  const [userNameError, setUserNameError] = useState(userNameErrors.empty);

  const userNameInputRef = useRef(null);

  const handleUserNameInput = (event) => {
    const { value } = event.target;
    if (!value) {
      setUserNameError(userNameErrors.empty);
      return;
    }
    setUserNameError(null);
  }

  const handleRegister = async () => {
    if (userNameError) {
      return;
    }
    const userName = userNameInputRef.current.value;
    // Check existing name
    if (await fetchUserNameExists(userName)) {
      setUserNameError(userNameErrors.exists);
      return;
    }
    const user = {
      name: userName,
      userNumber: null,
    };
    const lastUserNumber = await fetchLastRegisteredUserNumber();
    if (lastUserNumber >= hosts.length) {
      setUserNameError(userNameErrors.maxUsersLimit);
      return;
    }
    user.userNumber = lastUserNumber + 1;
    await sendRegisterUserRequest(user);

    registerUser(user);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleRegister();
  }

  return (
    <div>
      {workshopUser
        ? <div>
          <p className="f3 mb-2">Registered user: <span className="h3">{workshopUser.name}</span></p>
        </div>
        : <form className="pb-5" onSubmit={handleFormSubmit} >
          <div className={`form-group ${userNameError && "errored"}`}>
            <div className="form-group-header">
              <h4 className="h4 mb-1">Type your name and press Register to get your own user number for workshop access</h4>
              <button className="d-block btn-link mb-2" type="button" onClick={useCustomUserNumber}>I already have personal user number</button>
              <label htmlFor="userNameInput">Your name:</label>
            </div>
            <div className="form-group-body">
              <input
                ref={userNameInputRef}
                className="form-control mr-2"
                type="text"
                id="userNameInput"
                aria-describedby="userNameInputValidation"
                onChange={handleUserNameInput}
                onSubmit={console.log}
              />
              <button type="button" className="btn btn-primary" disabled={!!userNameError} onClick={handleRegister}>Register</button>
            </div>
            <p className="note error" id="userNameInputValidation">{userNameError}</p>
          </div>
        </form>
      }
    </div>
  );
}

export default WorkshopUser;

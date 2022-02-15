import { useRef, useState } from 'react';
import { config } from '../../../constants';

const getSchemaUrl = (workshopType) => `${config.dbUrl}/${config.dbSchemaNames[workshopType]}`;

const sendRegisterUserRequest = async (user, workshopType) => {
  const schemaUrl = getSchemaUrl(workshopType);
  await fetch(schemaUrl, {
    method: 'POST',
    body: JSON.stringify(user),
  }).catch((error) => {
    console.error(error);
    alert(`Failed to register user ${user.name}`);
  });
}

const fetchLastRegisteredUserNumber = async (workshopType) => {
  const schemaUrl = getSchemaUrl(workshopType);
  const url = `${schemaUrl}?orderBy="userNumber"&limitToLast=1`;
  const usersMap = await fetch(url).then(async (result) => {
    return await result.json();
  });
  const [{ userNumber }] = Object.values(usersMap);
  return userNumber
}

const fetchUserNameExists = async (userName, workshopType) => {
  const schemaUrl = getSchemaUrl(workshopType);
  const url = `${schemaUrl}?orderBy="name"&equalTo="${userName}"&&limitToLast=1`;
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

function WorkshopUser({ workshopType, workshopUser, registerUser, useCustomUserNumber, logoutUser }) {
  const workshopHosts = config.hosts?.[workshopType];

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
    if (!userName) {
      return;
    }
    // Check existing name
    if (await fetchUserNameExists(userName, workshopType)) {
      setUserNameError(userNameErrors.exists);
      return;
    }
    const user = {
      name: userName,
      userNumber: null,
    };
    const lastUserNumber = await fetchLastRegisteredUserNumber(workshopType);
    if (lastUserNumber >= workshopHosts?.length) {
      setUserNameError(userNameErrors.maxUsersLimit);
      return;
    }
    user.userNumber = lastUserNumber + 1;
    await sendRegisterUserRequest(user, workshopType);

    registerUser(user);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleRegister();
  }

  const handleLogout = () => {
    logoutUser();
    setUserNameError(userNameErrors.empty);
  }

  return (
    <div>
      {workshopUser
        ? <div>
          <p className="f3 mb-2">
            Registered user: <span className="h3">{workshopUser.name}</span>
            {logoutUser && <span className="tooltipped tooltipped-e" aria-label="Sign Out">
              <button className="btn-octicon ml-2 v-align-bottom" type="button" aria-label="Log Out" onClick={handleLogout}>
                <svg className="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                  <path fillRule="evenodd"
                        d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 012 13.25V2.75zm10.44 4.5H6.75a.75.75 0 000 1.5h5.69l-1.97 1.97a.75.75 0 101.06 1.06l3.25-3.25a.75.75 0 000-1.06l-3.25-3.25a.75.75 0 10-1.06 1.06l1.97 1.97z"/>
                </svg>
              </button>
            </span>
            }
          </p>
        </div>
        : <form className="pb-5" onSubmit={handleFormSubmit}>
          <div className={`form-group ${userNameError && 'errored'}`}>
            <div className="form-group-header">
              <h4 className="h4 mb-1">Type your name and press Register to get your own user number for workshop
                access</h4>
              <button className="d-block btn-link mb-2" type="button" onClick={useCustomUserNumber}>I already have
                personal user number
              </button>
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
              />
              <button type="button" className="btn btn-primary" disabled={!!userNameError}
                      onClick={handleRegister}>Register
              </button>
            </div>
            <p className="note error" id="userNameInputValidation">{userNameError}</p>
          </div>
        </form>
      }
    </div>
  );
}

export default WorkshopUser;

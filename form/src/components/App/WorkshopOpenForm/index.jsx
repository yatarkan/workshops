import { useState } from 'react';
import { workshopTypes, config } from '../../../constants'

const getHostURL = (host, workshopType = workshopTypes.cv) => {
  const { workshopDirectories } = config;
  const url = new URL(`http://${host}`);
  url.port = '5665';
  url.pathname = `/jupyter/lab/tree/workshop/workshops/${workshopDirectories[workshopType]}/workshop.ipynb`;
  return url.toString()
}

const userNumberErrors = {
  empty: 'User number is empty',
  invalid: 'Invalid user number',
  outOfRange: 'User number is out of range',
};

const validateUserNumber = (value, hostsLength) => {
  if (!value) {
    return userNumberErrors.empty
  }
  const userNumber = Number(value);
  if (isNaN(userNumber)) {
    return userNumberErrors.invalid;
  }
  if (userNumber <= 0 || userNumber > hostsLength) {
    return userNumberErrors.outOfRange;
  }
  return null;
}

function WorkshopOpenForm({ workshopType, userNumber = '' }) {
  const { hosts } = config;

  const [userNumberError, setUserNumberError] = useState(validateUserNumber(userNumber, hosts?.length));
  const [currentUserNumber, setCurrentUserNumber] = useState(userNumber);

  const handleUserNumberInput = (event) => {
    const { value } = event.target;
    setCurrentUserNumber(value);
    const error = validateUserNumber(value, hosts?.length);
    setUserNumberError(error);
  }

  const handleOpenWorkshop = () => {
    if (userNumberError) {
      return;
    }
    const host = hosts[currentUserNumber - 1];
    const hostURL = getHostURL(host, workshopType);
    window.open(hostURL, '_blank');
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleOpenWorkshop();
  }

  return (
    <form className="pb-5" onSubmit={handleFormSubmit}>
      <div className={`form-group ${userNumberError && 'errored'}`}>
        <div className="form-group-header">
          <h4 className="h4 mb-2">Type your user number and press Open to go to the workshop</h4>
          <label htmlFor="userNumberInput">Personal user number:</label>
        </div>
        <div className="form-group-body">
          <input
            className="form-control mr-2"
            type="number"
            id="userNumberInput"
            aria-describedby="userNumberInputValidation"
            value={currentUserNumber}
            onChange={handleUserNumberInput}
          />
          <button id="openButton" type="button" className="btn btn-primary" disabled={!!userNumberError} onClick={handleOpenWorkshop}>Open</button>
        </div>
        <p className="note error" id="userNumberInputValidation">{userNumberError}</p>
      </div>
    </form>
  );
}

export default WorkshopOpenForm;

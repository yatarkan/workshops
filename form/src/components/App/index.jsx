import { useState } from 'react';
import './index.css';
import { config } from '../../constants';
import WorkshopSelect from './WorkshopSelect';
import WorkshopOpenForm from './WorkshopOpenForm';
import WorkshopUser from './WorkshopUser';

function App() {
  const { workshopTitles, localStorageKeys } = config;

  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isCustomUserNumber, setIsCustomUserNumber] = useState(false);

  const [workshopUser, setWorkshopUser] = useState(null);

  const handleSelectWorkshop = (workshopType) => {
    setSelectedWorkshop(workshopType);
    const localStorageKey = localStorageKeys[workshopType];
    const localStorageWorkshopUser = JSON.parse(localStorage.getItem(localStorageKey));
    setWorkshopUser(localStorageWorkshopUser);
  }

  const handleRegisterUser = async (user) => {

    const localStorageKey = localStorageKeys[selectedWorkshop];
    localStorage.setItem(localStorageKey, JSON.stringify(user));
    setWorkshopUser(user);
  }

  return (
    <div className="p-3">
      <div>
        <img className="opentalks-ai-logo mr-3" src="./images/opentalks-ai-logo.png" alt="OpenTalks.AI Logo"
             width="100"/>
        <img src="./images/DL_WB_logo.png" alt="DL Workbench Logo" width="200"/>
      </div>
      <h1 className="h1 mb-2 mt-2">OpenTalks.AI Workshop</h1>
      {selectedWorkshop
        ? <h2 className="h2 mb-4">{workshopTitles[selectedWorkshop]}</h2>
        : <WorkshopSelect selectWorkshop={handleSelectWorkshop}/>}
      {selectedWorkshop && !isCustomUserNumber &&
        <WorkshopUser workshopUser={workshopUser} registerUser={handleRegisterUser}
                      useCustomUserNumber={() => setIsCustomUserNumber(true)}/>}
      {selectedWorkshop && (workshopUser || isCustomUserNumber) &&
        <WorkshopOpenForm workshopType={selectedWorkshop} userNumber={workshopUser?.userNumber}/>}
    </div>
  );
}

export default App;

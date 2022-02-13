const app = {
  elements: {
    userNumberInput: null,
    openButton: null,
    userNumberInputValidation: null,
    userNumberFormGroup: null,
  },
  hosts: null,
  workshopNames: {
    cv: '2022_opentalksai_cv',
    nlp: '2022_opentalksai_nlp',
  },
};


async function setUpHosts() {
  fetch('./hosts.json')
    .then((response) => response.json())
    .then((jsonData) => {
      app.hosts = jsonData.hosts;
  })
    .catch((error) => {
      alert('Failed to load machines hosts');
    });
}


async function configureApp() {
  await setUpHosts();

  for (const elementId in app.elements) {
    app.elements[elementId] = document.getElementById(elementId);
  }

  const { userNumberInput, openButton } = app.elements;

  if (!userNumberInput || !openButton) {
    alert('App elements are not configured yet');
    return;
  }

  userNumberInput.addEventListener('input', handleUserNumberInput);

  openButton.addEventListener('click', handleOpenButtonClick);

  userNumberInput.dispatchEvent(new Event('input'));
}

function setUserNumberInputValidationState(disabled, message = '') {
  const errorClassName = 'errored';
  const { userNumberInputValidation, userNumberFormGroup, openButton } = app.elements;
  if (disabled) {
    openButton.ariaDisabled = 'true';
    userNumberFormGroup.classList.add(errorClassName);
    userNumberInputValidation.textContent = message;
  } else {
    openButton.ariaDisabled = 'false';
    userNumberFormGroup.classList.remove(errorClassName);
  }
}

function handleUserNumberInput(event) {
  const { hosts } = app;
  const { value } = event.target;
  if (!value) {
    setUserNumberInputValidationState(true, 'User number is empty.');
    return;
  }
  const userNumber = Number(value);
  if (isNaN(userNumber)) {
    setUserNumberInputValidationState(true, 'Invalid user number.');
    return;
  }
  if (userNumber <= 0 || userNumber > hosts?.length) {
    setUserNumberInputValidationState(true, 'User number is out of range.');
    return;
  }
  setUserNumberInputValidationState(false);
}

function handleOpenButtonClick() {
  const { userNumberInput, openButton } = app.elements;

  if (openButton.ariaDisabled === 'true') {
    return;
  }
  const userNumberInputValue = userNumberInput.value;
  const { hosts } = app;

  if (!hosts?.length) {
    alert('Unable to open workshop: no running machines found');
    return;
  }

  if (!userNumberInputValue) {
    alert('Empty user number');
    return;
  }
  const userNumber = Number(userNumberInputValue);
  if (isNaN(userNumber)) {
    alert('Invalid user number');
    return;
  }
  if (userNumber <= 0 || userNumber > hosts.length) {
    alert('User number is out of range');
    return;
  }
  const host = hosts[userNumber - 1];
  const hostURL = getHostURL(host);
  window.open(hostURL, '_blank');
}

function getHostURL(host, workshopName = app.workshopNames.cv) {
  const url = new URL(`http://${host}`);
  url.port = '5665';
  url.pathname = `/jupyter/lab/tree/workshop/workshops/${workshopName}/workshop.ipynb`;
  return url.toString()
}

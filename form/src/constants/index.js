export const workshopTypes = {
  cv: 'cv',
  nlp: 'nlp',
}

export const config = {
  workshopDirectories: {
    [workshopTypes.cv]: '2022_opentalksai_cv',
    [workshopTypes.nlp]: '2022_opentalksai_nlp',
  },
  workshopTitles: {
    [workshopTypes.cv]: 'Создаём приложение для детектирования медицинских масок с помощью OpenVINO™',
    [workshopTypes.nlp]: 'Создаём приложение для автоматического обнаружения токсичных комментариев с помощью трансформеров и OpenVINO™',
  },
  localStorageKeys: {
    [workshopTypes.cv]: 'cvWorkshopUser',
    [workshopTypes.nlp]: 'nlpWorkshopUser',
  },
  dbUrl: 'https://dl-wb-workshops-default-rtdb.europe-west1.firebasedatabase.app',
  dbSchemaNames: {
    [workshopTypes.cv]: 'cvUsers.json',
    [workshopTypes.nlp]: 'nlpUsers.json',
  },
  hosts: null,
};

export const fetchHosts = async () => {
  config.hosts = await fetch('./hosts.json')
    .then((response) => response.json())
    .then(({ hosts }) => hosts)
    .catch(() => {
      alert('Failed to load machines hosts');
    });
}

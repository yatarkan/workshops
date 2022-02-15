import { useState } from 'react';
import { workshopTypes, config } from '../../../constants'
import './index.css';

function WorkshopSelect({ selectWorkshop }) {
  const [workshopType, setWorkshopType] = useState(null);
  const { workshopTitles } = config;

  return (
    <form className="workshop-select-form mt-3" onChange={(event) => setWorkshopType(event.target.value)}>
      <div className="radio-group workshop-radio-group">
        <input className="radio-input" id={workshopTypes.cv} type="radio" name="workshop" value={workshopTypes.cv}/>
        <label className="radio-label" htmlFor={workshopTypes.cv}>
          <span>{workshopTitles[workshopTypes.cv]}</span>
          <span className="d-block note mb-1">Computer Vision (CV)</span>
          <span className="d-block note mb-1">10:00 - 12:00</span>
        </label>
        <input className="radio-input" id={workshopTypes.nlp} type="radio" name="workshop" value={workshopTypes.nlp}/>
        <label className="radio-label" htmlFor={workshopTypes.nlp}>
          <span>{workshopTitles[workshopTypes.nlp]}</span>
          <span className="d-block note mb-1">Natural Language Processing (NLP)</span>
          <span className="d-block note mb-1">15:30 - 17:30</span>
        </label>
      </div>
      <button type="button" className="btn btn-primary mt-3" disabled={!workshopType} onClick={() => selectWorkshop(workshopType)}>Continue</button>
    </form>
  );
}

export default WorkshopSelect;

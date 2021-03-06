/* Styles */
import './styles.scss';

import {ClassMapBox} from './modules/ClassMapBox';
import {ClassProblemInfo} from './modules/ClassProblemInfo';

window.axios = require('axios');

let wol = () => {};

if (window.onload != null) {
  wol = window.onload;
}

window.onload = () => {
  wol.call();

  const Map = new ClassMapBox('mapbox');
  const ProblemInfo = new ClassProblemInfo();

  ProblemInfo.hideMessageInfo();

  document.getElementById('js-add-point').addEventListener('click', () => {
    ProblemInfo.reset();
    ProblemInfo.enabledEditMode();
    Map.addPoint();
  });

  document.getElementById('js-add-problem').addEventListener('click', () => {
    const LngLat = Map.newPointLngLat;

    ProblemInfo.checkError(ProblemInfo.nameInput);
    ProblemInfo.checkError(ProblemInfo.messageInput);

    if (
      LngLat.length &&
      ProblemInfo.nameInput.value !== '' &&
      ProblemInfo.messageInput.value !== ''
    ) {
      ProblemInfo.disabledEditMode();

      const point = {
        coordinates: LngLat,
        name: ProblemInfo.nameInput.value,
        message: ProblemInfo.messageInput.value,
      };

      axios.post('http://api.davay2019.com/ajax-add-point/', {
        point,
      }).then(({data}) => {
        console.log(data);
      });

      Map.addNewPointToLayer({
        name: ProblemInfo.nameInput.value,
        message: ProblemInfo.messageInput.value,
      });

      ProblemInfo.reset();
    }
  });

  Map.initClickEvent(ProblemInfo);
  ProblemInfo.initClickCloseInfo(Map);
};

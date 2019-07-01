/* Styles */
import './styles.scss';

import {ClassMapBox} from './modules/ClassMapBox';
import {ClassProblemInfo} from './modules/ClassProblemInfo';
import {LS_POINTS_NAME} from './constants';
import axios from 'axios';

let wol = () => {};

if (window.onload != null) {
  wol = window.onload;
}

window.onload = () => {
  wol.call();

  const Map = new ClassMapBox('mapbox');
  const ProblemInfo = new ClassProblemInfo();

  ProblemInfo.disabled();

  document.getElementById('js-add-point').addEventListener('click', () => {
    ProblemInfo.reset();
    ProblemInfo.enabled();
    Map.addPoint();
  });
  document.getElementById('js-add-problem').addEventListener('click', () => {
    ProblemInfo.disabled();
    const LngLat = Map.newPointLngLat;

    if (LngLat.length) {
      const point = {
        coordinates: LngLat,
        name: ProblemInfo.nameElement.value,
        message: ProblemInfo.messageElement.value,
      };

      axios.post('//mc.yarche.work/map/ajax-add-point/', {
        point,
      }).then(({data}) => {
        console.log(data);
      });

      Map.addNewPointToLayer({
        name: ProblemInfo.nameElement.value,
        message: ProblemInfo.messageElement.value,
      });
    }
  });

  Map.initClickEvent(ProblemInfo.nameElement, ProblemInfo.messageElement);
};

// @flow
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';
const buildApiUrl = relativePath => `${BASE_URL}/${relativePath}`;

export const fetchKingdomCards = () => {
  return axios.get(buildApiUrl('cards'));
};

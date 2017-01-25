// @flow
import axios from 'axios';
import type { AxiosPromise } from 'axios';
import type { CardDetails } from 'flowTypes';

const BASE_URL = 'http://localhost:8080';
const buildApiUrl = relativePath => `${BASE_URL}/${relativePath}`;

export const fetchKingdomCards = (): AxiosPromise<Array<CardDetails>> => {
  return axios.get(buildApiUrl('cards'));
};

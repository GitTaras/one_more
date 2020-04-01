import axios from 'axios';
import { restURL } from '../../utils/baseURL';

export const getAutocompleteUsers = async name => {
  const { data } = await axios.get(`${restURL}/users/autocomplete/?name=${name}&limit=15`);
  return data || [];
};

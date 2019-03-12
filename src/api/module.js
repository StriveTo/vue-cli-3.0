import qs from 'qs'
import axios from '../assets/js/axios'
import { module } from './module'

/* eslint arrow-body-style: ["error", "always"] */
export const interface = (params) => {
  return axios.get(module.interfaceUrl, qs.stringify(params))
}


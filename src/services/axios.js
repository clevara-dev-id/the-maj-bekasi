import axios from 'axios'

export const Instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
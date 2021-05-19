import axios from "axios";

export const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-MAKE-API-KEY': process.env.REACT_APP_MAKE_KEY
  }
});

const url = process.env.REACT_APP_MAKE_URL

export function make(data) {
  return client.post(url, data)
}

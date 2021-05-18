import axios from "axios";

const makeAPIKey = "47bad936bfb6bb3bd9b94ae344132f8afdfff44c";
  const makeTemplateURL = "https://api.make.cm/make/t/0f98d3b9-32dc-4366-8767-fbbdec97ad54/sync";

export const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-MAKE-API-KEY': `${makeAPIKey}`
  }
});

export default function make(data) {
  return client.post(makeTemplateURL, data)
}

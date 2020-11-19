import { useEffect, useState } from "react";

const BASE_URL = "https://api.open5e.com/search";

const getQueryParam = (value) => {
  const encoded = encodeURIComponent(value);
  return `/?text=${encoded}`;
};

const useFetchApi = (value) => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (value.length < 4) return "";
    const abortController = new AbortController();

    if (window) {
      window
        .fetch(BASE_URL + getQueryParam(value), {
          method: "GET",
          mode: "cors",
          signal: abortController.signal,
        })
        .then((res) => res.json())
        .then((response) => setResponse(response))
        .catch((e) => setResponse(e));
    }

    return function cancel() {
      abortController.abort();
    };
  }, [value]);

  return response;
};

export default useFetchApi;

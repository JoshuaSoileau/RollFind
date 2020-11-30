import { useEffect, useState } from "react";

const BASE_URL = "https://api.open5e.com/";

const getPathName = (item) => {
  const { route, slug } = item;
  return route + slug;
};

const useResource = (item) => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (!(item?.route && item?.slug)) {
      setResponse({});
      return;
    }

    const abortController = new AbortController();

    if (window) {
      window
        .fetch(BASE_URL + getPathName(item), {
          method: "GET",
          mode: "cors",
          signal: abortController.signal,
        })
        .then((res) => res.json())
        .then((results) => {
          if (results) setResponse(results);
        })
        .catch(() => {});
    }

    return function cancel() {
      abortController.abort();
    };
  }, [item?.slug]);

  return response;
};

export default useResource;

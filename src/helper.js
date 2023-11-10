const CURRENT_URL = () => {
  /*let origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  origin = origin === "" ? "http://localhost:3000" : "";*/
  let origin = "http://localhost:3000";
  console.log("origin :", origin);
  return origin;
};

const queryToString = (query) => {
  Object.keys(query).forEach(
    (k) =>
      (query[k] === null || query[k] === undefined || query[k] === "") &&
      delete query[k]
  );
  return Object.keys(query)
    .map((key) => key + "=" + encodeURIComponent(query[key]))
    .join("&");
};

export default {
  CURRENT_URL,
  queryToString,
};

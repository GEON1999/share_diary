const CURRENT_URL = () => {
  let origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  origin = origin === "" ? process.env.CURRENT_URL : window.location.origin;
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

function formatDateToMMDD(timestamp) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
  const day = date.getDate();
  return `${month.toString().padStart(2, "0")}.${day
    .toString()
    .padStart(2, "0")}`;
}

export default {
  CURRENT_URL,
  queryToString,
  formatDateToMMDD,
};

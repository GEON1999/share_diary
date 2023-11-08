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

export default {
  CURRENT_URL,
};

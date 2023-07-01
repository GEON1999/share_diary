const CURRENT_URL = () => {
  let origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  origin = origin === "" ? process.env.DOMAIN : "";

  return origin;
};

export default {
  CURRENT_URL,
};

import moment from "moment";

export const formatMessage = (text, name = "") => {
  text = text.trim();
  return {
    text,
    name,
    time: moment().format("H:mm")
  };
};

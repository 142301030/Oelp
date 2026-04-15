import { API } from "./api";

export const saveAnnotation = (data) => {
  return API.post("/save", data);
};
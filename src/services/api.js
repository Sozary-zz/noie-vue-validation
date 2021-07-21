import AxiosAPI from "./default";

export const apiValidateInfo = (info) => {
  return AxiosAPI().post(`/validate-info`, info);
};

import AxiosRestV4 from "./default";

export const getAllIntegrations = () => {
  return AxiosRestV4().get(`/automations/get_all`);
};

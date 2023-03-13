const baseURL = "https://galaxy.azurewebsites.net/routes/v1/tablet";

export const URls = {
  getCheckedUncheckedCountsURL: `${baseURL}/sections-with-equipments`,
  getSectionEquipmentsURL: `${baseURL}/sections-wise-equipments`,
  getCBMdataURL: `${baseURL}/sections-wise-equipments-wise-cbm`,
  postCBMdataURL: `${baseURL}/sections-wise-equipments-wise-cbm`,
};

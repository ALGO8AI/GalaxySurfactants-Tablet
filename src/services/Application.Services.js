import axios from "axios";
import { URls } from "./http.services";

const ApplicationServices = {
  getSectionList: async () => {
    try {
      const { data } = await axios.get(URls.getCheckedUncheckedCountsURL);
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  getSectionEquipments: async (sectionId) => {
    try {
      const { data } = await axios.get(
        `${URls.getSectionEquipmentsURL}/${sectionId}`
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  getSectionEquipmentWiseCBMdata: async (sectionId, equipmentId) => {
    try {
      const { data } = await axios.get(
        `${URls.getCBMdataURL}/${sectionId}/${equipmentId}`
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  postSectionEquipmentWiseCBMdata: async (sectionId, equipmentId, body) => {
    try {
      const { data } = await axios.post(
        `${URls.getCBMdataURL}/${sectionId}/${equipmentId}`,
        body
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  },
};

export default ApplicationServices;

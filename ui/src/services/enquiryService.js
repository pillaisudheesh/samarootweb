import { apiClient } from "./api";

export const submitEnquiry = async (enquiry) => {
  const response = await apiClient.post("/enquiries", enquiry);
  return response.data;
};

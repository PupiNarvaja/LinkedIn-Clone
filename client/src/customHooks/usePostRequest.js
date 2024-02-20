import axios from "axios";

const usePostRequest = async (url, dataToSend, config) => {
  try {
    const response = await axios.post(url, dataToSend, config);
    const data = response.data;
    const status = response.status;
    return { data, status, error: null };
  } catch (error) {
    return { data: null, error: error.response.data, status: error.response.status };
  }
};

export default usePostRequest;
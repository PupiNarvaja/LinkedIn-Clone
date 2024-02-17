import axios from "axios";

const usePostRequest = async (url, dataToSend, config) => {
  let response;

  try {
    response = await axios.post(url, dataToSend, config);
  } catch (error) {
    console.log(error);
  }

  const data = response.data;
  const status = response.status;

  return { data, status };
};

export default usePostRequest;
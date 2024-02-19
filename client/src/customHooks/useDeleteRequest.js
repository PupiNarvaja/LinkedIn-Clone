import axios from "axios";

const useDeleteRequest = async (url, dataToSend, config) => {
  let response;

  try {
    response = await axios.delete(url, { data: dataToSend }, config);
  } catch (error) {
    console.log(error);
  }

  const data = response.data;
  const status = response.status;

  return { data, status };
};

export default useDeleteRequest;
import axios from "axios";

const useDeleteRequest = async (url, dataToSend, config) => {
  let response;

  try {
    console.log("Deleting: ", url);
    response = await axios.delete(url, { data: dataToSend }, config);
    console.log("Deleted: ", response);
  } catch (error) {
    console.log(error);
  }

  const data = response.data;
  const status = response.status;

  return { data, status };
};

export default useDeleteRequest;

// In every custom hook, I should first ask if token has expired, and also send the token into the header of each request.
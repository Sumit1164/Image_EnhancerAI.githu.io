import axios from "axios";

const API_KEY = "wx9i4ayme1j91hbwy";
const BASE_URL = "https://techhk.aoscdn.com/";
const MAXIMUM_RETRIES = 20;

export const enhancedImageAPI = async (file) => {
    try {
        const taskId = await uploadImage(file);
        console.log("Image uploaded successfully, Task ID:", taskId);


        const enhancedImageData = await PollForEnhancedImage(taskId);
        console.log("Enhanced image fetched successfully:", enhancedImageData);


        return enhancedImageData;
        
    } catch (error) {
        console.log("Error enhancing image:", error.message);
    }
};

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image_file", file);
    const { data } = await axios.post(`${BASE_URL}api/tasks/visual/scale`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": API_KEY,
        },
    });

    if (!data?.data?.task_id) {
        throw new Error("Task ID not found in response");
    }

    return data.data.task_id;
};

const fetchEnhancedImage = async (taskId) => {
    const { data } = await axios.get(
      `${BASE_URL}api/tasks/visual/scale/${taskId}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": API_KEY,
        },
      }
    );
    if(!data?.data) {
        throw new Error("Enhanced image not found in response");
    }
    return data.data;
};

const PollForEnhancedImage = async (taskId, retries = 0) => {
    const result = await fetchEnhancedImage(taskId);

    if (result.state === 4) {
        console.log(`Processing...(${retries}/${MAXIMUM_RETRIES})`);
        
      if (retries >= MAXIMUM_RETRIES) {
        throw new Error("Max retries reached. Image enhancement failed.");
      }

      // Wait for 2 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return PollForEnhancedImage(taskId, retries + 1);
    }

    console.log("Image enhancement completed successfully.", result);
    return result;
};
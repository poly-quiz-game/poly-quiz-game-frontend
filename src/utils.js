import { baseURL } from "./api/axiosClient";
import {questionTypeLabels} from "./consts";

export const handleUploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const path = `${baseURL}/image/upload`;
        const res = await fetch(path, {
          method: "POST",
          body: JSON.stringify({ data: reader.result }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
        resolve(res.secure_url);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
};
export const formatNumber = (number) => new Intl.NumberFormat('en-US',{ style: 'percent',
}).format(number)
export const getTypeQuestion = (questionId) => {
  switch (questionId) {
    case 1:
      return questionTypeLabels['SINGLE_CORRECT_ANSWER']
    case 2:
      return questionTypeLabels['MULTIPLE_CORRECT_ANSWER']
    case 3:
      return questionTypeLabels['TRUE_FALSE_ANSWER']
    default:
      return questionTypeLabels['TYPE_ANSWER']
  }
}
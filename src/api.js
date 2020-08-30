import Axios from "axios";
import { apiUrl } from "./config/constants";

export default async function api(
  endpoint,
  { method = "GET", data, jwt } = {}
) {
  try {
    const res = await Axios({
      method: method,
      url: apiUrl + "/" + endpoint,
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      data: {
        ...data,
      },
    });

    return res;
  } catch (e) {
    console.log("Api", e);
  }
}

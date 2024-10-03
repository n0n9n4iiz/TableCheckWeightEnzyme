import axios from "axios";

export const getBinWeightEnzyme = async (binName) => {
  const url = "http://10.5.10.201:8801/api/bin";
  const res = await axios.get(url, { params: { binname: binName == "" ? null : binName } });
  return res.data;
};

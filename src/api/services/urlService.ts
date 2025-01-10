import { Link } from "../../pages/Dashboard";
import axiosInstance from "../axiosInstance";

type TLinkResponse = {
  _id: string;
  name: string;
  longUrl: string;
  shortUrlId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

export type TUserUrlsResponse = {
  data: {
    links: Link[];
  };
};

export const fetchUserUrls = async (): Promise<TUserUrlsResponse> => {
  const response = await axiosInstance.get("/urls");
  const data: TUserUrlsResponse = {
    data: {
      links: Array.from(response.data.data.links as TLinkResponse[]).map(
        (link) => ({
          _id: link._id,
          name: link.name,
          longURL: link.longUrl,
          shortUrlID: link.shortUrlId,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
        })
      ),
    },
  };
  return data;
};

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

export type TCreateUserUrlResponse = {
  data: {
    link: Link;
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
          longUrl: link.longUrl,
          shortUrlID: link.shortUrlId,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
        })
      ),
    },
  };
  return data;
};

export const createUserUrl = async ({
  name,
  longUrl,
}: {
  name: string;
  longUrl: string;
}): Promise<void> => {
  try {
    const response = await axiosInstance.post("/urls", {
      name,
      longUrl,
    });
    if (response.status !== 201) {
      throw new Error(response.data?.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserUrl = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<void> => {
  // const response = await axiosInstance.put(`/urls/${id}`, {
  //   name,
  // });
  // const data: TCreateUserUrlResponse = response.data;
  // const result: TCreateUserUrlResponse = {
  //   data: {
  //     link: {
  //       _id: data.data.link._id,
  //       name: data.data.link.name,
  //       longURL: data.data.link.longURL,
  //       shortUrlID: data.data.link.shortUrlID,
  //       createdAt: data.data.link.createdAt,
  //       updatedAt: data.data.link.updatedAt,
  //     },
  //   },
  // };
  try {
    const response = await axiosInstance.put(`/urls/${id}`, {
      name,
    });
    if (response.status !== 204) {
      throw new Error(response.data?.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUserUrl = async ({ id }: { id: string }): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/urls/${id}`);
    if (response.status !== 204) {
      throw new Error(response.data?.message);
    }
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import { axiosClient } from "../../../shared/types/api/http-client"
import { UserInfoRequest, UserInfoResponse } from "../model/userInformation";

export const readUser = async(): Promise<UserInfoResponse> => {
    const response = await axiosClient.get<UserInfoResponse>('/users');
    return response.data;
}

export const updateUser = async(data: UserInfoRequest): Promise<UserInfoResponse> => {
    const response = await axiosClient.put<UserInfoResponse>('/users', data);
    return response.data;
}
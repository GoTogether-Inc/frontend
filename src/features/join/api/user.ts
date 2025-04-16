import { axiosClient } from "../../../shared/types/api/http-client"
import { UserInfoRequest, UserInfoResponse } from "../model/userInformation";

export const readUser = async (): Promise<UserInfoResponse> => {
    const response = await axiosClient.get<{ result: UserInfoResponse }>('/users');
    return response.data.result;  
}

export const updateUser = async(data: UserInfoRequest): Promise<UserInfoResponse> => {
    const response = await axiosClient.put<UserInfoResponse>('/users', data);
    return response.data;
}
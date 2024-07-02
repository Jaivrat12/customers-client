import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
    type CityListResponse,
    type Customer,
    type CustomerResponse,
    type CustomerListResponse,
} from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + '/api';

export type GetCustomersParams = {
    search: string;
    page: number;
    limit: number;
};

export type UpdateCustomerVariables = {
    customerId: string;
    customer: Customer;
};

export type UpdatePictureVariables = {
    customerId: string;
    image: FormData;
};

export const axiosClient = axios.create({
    baseURL: BASE_URL,
});

export const createCustomerFn = (customer: Customer) => (
    axiosClient.post<CustomerResponse>('/customers', customer)
);

export const updateCustomerFn = ({
    customerId,
    customer,
}: UpdateCustomerVariables) => (
    axiosClient.put<CustomerResponse>(`/customers/${customerId}`, customer)
);

export const uploadPictureFn = ({
    customerId,
    image,
}: UpdatePictureVariables) => (
    axiosClient.put<CustomerResponse>(`/customers/${customerId}/image`, image)
);

export const useGetCustomersQuery = (params: GetCustomersParams, keepPrevData = false) => {
    return useQuery({
        queryKey: ['customers', params],
        queryFn: () => axiosClient.get<CustomerListResponse>('/customers', { params }),
        select: (res) => res.data,
        placeholderData: keepPrevData ? keepPreviousData : undefined,
    });
};

export const useGetCustomerQuery = (customerId: string) => {
    return useQuery({
        queryKey: ['customer', customerId],
        queryFn: () =>
            axiosClient.get<CustomerResponse>(`/customers/${customerId}`),
        select: (res) => res.data,
    });
};

export const useGetCitiesQuery = () => {
    return useQuery({
        queryKey: ['cities'],
        queryFn: () =>
            axiosClient.get<CityListResponse>('/customers/cities'),
        select: (res) => (res.data.success ? res.data.cities : null),
    });
};

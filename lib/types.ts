export interface Customer {
    _id?: string;
    firstName: string;
    lastName: string;
    city: string;
    company: string;
    imageFileName?: string;
}

export interface ServerResponse {
    success: boolean;
    error?: string;
}

export interface CustomerResponse extends ServerResponse {
    customer?: Customer;
}

export interface CustomerListResponse extends ServerResponse {
    customers?: Customer[];
    total?: number;
}

export interface CityListResponse extends ServerResponse {
    cities?: {
        _id: string;
        count: number;
    }[];
}

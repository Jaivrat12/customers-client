'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
    const { data: customers } = useQuery({
        queryKey: ['customers'],
        queryFn: () => axios.get(BASE_URL + '/customers'),
        select: (res) => (res.data.success ? res.data.customers : null),
    });
    console.log(customers);

    return (
        <>
            <h1 className="text-4xl text-center pt-8">
				Customers
			</h1>
        </>
    );
}

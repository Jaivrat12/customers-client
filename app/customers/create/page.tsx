'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import CustomerForm from '@/components/CustomerForm';
import { createCustomerFn } from '@/hooks/queries';
import { onError } from '@/lib/utils';
import { type Customer } from '@/lib/types';

export default function CreateCustomer() {
    const router = useRouter();

    const [customer, setCustomer] = useState<Customer>({
        firstName: '',
        lastName: '',
        city: '',
        company: '',
    });

    const {
        mutate: createCustomer,
        isPending: isCreatingCustomer,
    } = useMutation({
        mutationFn: createCustomerFn,
        onSuccess(res) {
            if (res.data.success && res.data.customer) {
                router.push(`/customers/${res.data.customer._id}`);
                alert('Customer created successfully!');
            }
        },
        onError(error) {
            onError(error);
        }
    });

    return (
        <CustomerForm
            heading="New Customer"
            customer={customer}
            setCustomer={setCustomer}
            isLoading={isCreatingCustomer}
            onSubmit={() => createCustomer(customer)}
            submitButtonText="Create"
            submitButtonLoadingText="Creating..."
        />
    );
}

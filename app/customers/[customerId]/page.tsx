'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import CustomerForm from '@/components/CustomerForm';
import { updateCustomerFn, useGetCustomerQuery } from '@/hooks/queries';
import { getErrorMsg, onError } from '@/lib/utils';

export default function EditCustomer() {
    const { customerId } = useParams<{ customerId: string }>();

    const {
        data: customerData,
        isLoading: isCustomerDataLoading,
        error: customerDataError,
        isError: isCustomerDataError,
    } = useGetCustomerQuery(customerId);

    const [customer, setCustomer] = useState({});

    // Better way of updating `customerData` without syncing the `customer` state using useEffect
    const customerPayload = Object.assign({}, customerData?.customer, customer);

    const {
        mutate: updateCustomer,
        isPending: isUpdatingCustomer,
    } = useMutation({
        mutationFn: updateCustomerFn,
        onSuccess(res) {
            if (res.data.success && res.data.customer) {
                alert('Customer updated successfully!');
            }
        },
        onError(error) {
            onError(error);
        }
    });

    return (
        <CustomerForm
            heading="Edit Customer"
            customer={customerPayload}
            setCustomer={setCustomer}
            isLoading={isUpdatingCustomer}
            onSubmit={() =>
                updateCustomer({
                    customerId,
                    customer: customerPayload,
                })
            }
            submitButtonText="Save"
            submitButtonLoadingText="Saving..."
            showProfilePicture
            showSpinner={isCustomerDataLoading}
            error={isCustomerDataError ? getErrorMsg(customerDataError) : undefined}
        />
    );
}

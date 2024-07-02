import Link from 'next/link';
import { Button, Input, Spinner } from '@nextui-org/react';
import { IoMdArrowRoundBack, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import ProfilePicture from './ProfilePicture';

import { type Dispatch, type SetStateAction } from 'react';
import { type Customer } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type InputType = {
    key: keyof Customer;
    label: string;
}[];

const inputs: InputType = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'city', label: 'City' },
    { key: 'company', label: 'Company' },
];

type CustomerFormProps = {
    heading: string;
    customer: Customer;
    setCustomer: Dispatch<SetStateAction<Customer>>;
    isLoading: boolean;
    onSubmit: () => void;
    submitButtonText: string;
    submitButtonLoadingText: string;
    showProfilePicture?: boolean;
    showSpinner?: boolean;
    error?: string;
};

const CustomerForm = ({
    heading,
    customer,
    setCustomer,
    onSubmit,
    isLoading,
    submitButtonText,
    submitButtonLoadingText,
    showProfilePicture = false,
    showSpinner = false,
    error,
}: CustomerFormProps) => {
    const handleChange = (key: string, value: string) => {
        setCustomer((customer) => ({
            ...customer,
            [key]: value,
        }));
    };

    return (
        <form
            className="container"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Button
                        as={Link}
                        href="/"
                        color="primary"
                        variant="flat"
                        size="sm"
                        isIconOnly
                        className="rounded-full"
                        disabled={isLoading}
                    >
                        <IoMdArrowRoundBack className="text-2xl" />
                    </Button>

                    <h1 className="text-2xl py-8">{heading}</h1>
                </div>

                <Button
                    color="primary"
                    type="submit"
                    startContent={
                        !isLoading && (
                            <IoMdCheckmarkCircleOutline fontSize="1.25rem" />
                        )
                    }
                    isLoading={isLoading}
                >
                    {isLoading ? submitButtonLoadingText : submitButtonText}
                </Button>
            </div>

            {showSpinner ? (
                <div className="mt-8 text-center">
                    <Spinner
                        label="Loading Customer Data..."
                        color="primary"
                    />
                </div>
            ) : error ? (
                <p className="text-danger-400">
                    {error}
                </p>
            ) : (
                <div className="max-w-[800px] mx-auto flex sm:flex-row flex-col sm:items-start items-center gap-8">
                    {showProfilePicture && (
                        <ProfilePicture
                            customerId={customer._id!}
                            src={customer.imageFileName
                                ? `${BASE_URL}/images/${customer.imageFileName}`
                                : ''
                            }
                            alt={`${customer.firstName} ${customer.lastName}`}
                        />
                    )}

                    <div className="flex-grow grid sm:grid-cols-2 grid-cols-1 gap-4 w-full">
                        {inputs.map(({ key, label }) => (
                            <Input
                                key={key}
                                type="text"
                                variant="faded"
                                label={label}
                                name={key}
                                value={customer[key] ?? ''}
                                onValueChange={(value) =>
                                    handleChange(key, value)
                                }
                                disabled={isLoading}
                                isRequired
                                required
                            />
                        ))}
                    </div>
                </div>
            )}
        </form>
    );
};

export default CustomerForm;

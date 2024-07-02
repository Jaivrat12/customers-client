'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Input, Pagination } from '@nextui-org/react';
import { BiSearch } from 'react-icons/bi';
import { IoMdAddCircle } from 'react-icons/io';
import Table from '@/components/Table';
import { useDebounce } from 'use-debounce';
import { type GetCustomersParams, useGetCustomersQuery } from '@/hooks/queries';
import { getErrorMsg } from '@/lib/utils';

const columns = [
	{
		key: 'firstName',
		label: 'First Name',
	},
	{
		key: 'lastName',
		label: 'Last Name',
	},
	{
		key: 'city',
		label: 'City',
	},
	{
		key: 'company',
		label: 'Company',
	},
];

export default function Dashboard() {
	const router = useRouter();

	const [query, setQuery] = useState<GetCustomersParams>({
		search: '',
		page: 1,
		limit: 5,
	});
	const [debouncedQuery] = useDebounce(query, 1000);
	const isQueryDebouncing = query !== debouncedQuery;

	const {
		data: customersData,
		isFetching: isCustomersFetching,
		error: customersDataError,
	} = useGetCustomersQuery(debouncedQuery, true);
	const customers = customersData?.customers ?? [];
	const totalCustomers = customersData?.total ?? 0;

    return (
        <main className="container">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl py-8">
					Customers
				</h1>

				<Button
					as={Link}
					href="/customers/create"
					color="primary"
					startContent={(
						<IoMdAddCircle fontSize="1.5rem" />
					)}
				>
					Create Customer
				</Button>
			</div>

			<Table
				aria-label="Customer Table"
				idKey="_id"
				columns={columns}
				rows={customers}
				isLoading={isCustomersFetching || isQueryDebouncing}
				emptyContent={customersDataError ? getErrorMsg(customersDataError) : 'There are no customers yet.'}
				selectionMode="single"
				onRowAction={(_id) => router.push(`/customers/${_id}`)}
				topContent={(
					<Input
						placeholder="Search by First Name, Last Name, or City..."
						onValueChange={(search) => setQuery((query) => ({
							...query,
							search,
							page: 1,
						}))}
						startContent={<BiSearch />}
						className="w-full sm:max-w-[44%]"
						isClearable
					/>
				)}
				bottomContent={
					<div className="flex w-full justify-center">
						<Pagination
							color="primary"
							page={query.page}
							total={Math.ceil(totalCustomers / query.limit) || 1}
							onChange={(page) => setQuery((query) => ({
								...query,
								page,
							}))}
							isCompact
							showControls
							showShadow
						/>
					</div>
				}
			/>
        </main>
    );
}

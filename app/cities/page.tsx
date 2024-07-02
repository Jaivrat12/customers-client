'use client';

import Table from '@/components/Table';
import { useGetCitiesQuery } from '@/hooks/queries';
import { getErrorMsg } from '@/lib/utils';

export default function Cities() {
	const {
		data: cities,
		isFetching: isCitiesFetching,
		error: citiesError,
	} = useGetCitiesQuery();

	const columns = [
		{
			key: '_id',
			label: 'City',
		},
		{
			key: 'count',
			label: 'Customers',
		},
	];

	const rows = cities ?? [];

    return (
        <main className="container">
            <h1 className="text-2xl py-8">
				Cities with Customer Count
			</h1>

			<Table
				aria-label="City Table"
				idKey="_id"
				columns={columns}
				rows={rows}
				isLoading={isCitiesFetching}
				emptyContent={citiesError ? getErrorMsg(citiesError) : 'There are no customers/cities yet.'}
			/>
        </main>
    );
}

import React, { useState, useEffect, Fragment } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const Table = ({ columns, rows }) => {
	
	let buttonClass = 'text-white text-xs px-2 py-1 mx-1 focus:outline-none shadow-lg rounded bg-blue-400'
	
	const [entries, setStateEntries] = useState('10');
	const [search, setStateSearch] = useState('');
	const [searchResults, setStatesearchResults] = useState([]);
	const [loading, setStateLoading] = useState(true);
	const [dividedRows, setStateDividedRows] = useState([]);
	const [pagination, setStatePagination] = useState(false);
	const [page, setStatePage] = useState(0);

	// divide rows by entries
	// parameter _rows should be undivided
	const divideEntries = (_rows) => {
		// set page state to default
		setStatePagination(false);
		setStatePage(0);
		
		let int_entries = parseInt(entries);
		let newRows = [];
		
		if (_rows.length > int_entries) {
			let count = _rows.length / int_entries;
			let remaining = Number.isInteger(count);

			for (let i = 0; i < Math.floor(count); i++) {
				let startIndex = (i === 0) ? int_entries * i : int_entries * i;
				let endIndex = (i === 0) ? int_entries * (i + 1) : int_entries * (i + 1);
				newRows.push(_rows.slice(startIndex, endIndex));
			}

			if (!remaining) newRows.push(_rows.slice(
				int_entries * Math.floor(count)
			));

			setStateDividedRows(newRows);
			setStatePagination(true);
		} else {
			setStateDividedRows(_rows);
		}
		setStateLoading(false);
	}

	const previousPage = () => {
		if (page !== 0) {
			setStatePage(page - 1) 
		}
	};

	const nextPage = () => {
		if (page !== dividedRows.length - 1) {
			setStatePage(page + 1) 
		}
	}

	const pageInbetween = () => {
		return (
			<Fragment>
				<span className="mx-1">...</span>
				<button className={`${buttonClass}`} onClick={() => setStatePage(page - 1)}>{page}</button> 
				<button className={`${buttonClass} bg-light-blue-400 border-2 border-light-blue-400`} onClick={() => setStatePage(page)}>{page + 1}</button>
				<button className={`${buttonClass}`} onClick={() => setStatePage(page + 1)}>{page + 2}</button>
				<span className="mx-1">...</span>
			</Fragment>
		)
	}

	const pageNearCheck = () => {
		const pageNearStart = () => {
			let pageIncrease = (page === 0) ? 2 : 1;

			return (
				<Fragment>
					<button className={`${buttonClass} ${(pageIncrease === 1) ? 'bg-light-blue-400 border-2 border-light-blue-400':''} `} onClick={() => setStatePage(page)}>{page + pageIncrease}</button>
					<button className={`${buttonClass}`} onClick={() => setStatePage(page + pageIncrease)}>{page + pageIncrease + 1}</button>
					<button className={`${buttonClass}`} onClick={() => setStatePage(page + pageIncrease + 1)}>{page + pageIncrease + 2}</button>
					<span className="mx-1">...</span>
				</Fragment>
			)
		}

		const pageNearEnd = () => {
			let pageCheck = page === dividedRows.length - 1

			return (
				<Fragment>
					<span className="mx-1">...</span>
					{ (pageCheck) 
						? <button className={`${buttonClass}`} onClick={() => setStatePage(page - 3)}>{page - 2}</button>
						: <button className={`${buttonClass}`} onClick={() => setStatePage(page - 2)}>{page - 1}</button>
					}

					{ (pageCheck) 
						? <button className={`${buttonClass}`} onClick={() => setStatePage(page - 2)}>{page - 1}</button> 
						: <button className={`${buttonClass}`} onClick={() => setStatePage(page - 1)}>{page}</button> 

					}

					{ (pageCheck)
						? <button className={`${buttonClass}`} onClick={() => setStatePage(page - 1)}>{page}</button> 
						: <button className={`${buttonClass} bg-light-blue-400 border-2 border-light-blue-400`} onClick={() => setStatePage(page)}>{page + 1}</button>
					}
				</Fragment>
			)
		}

		let pageRender = (page < 2) ? pageNearStart : pageNearEnd;

		return (
			<Fragment>
				{ pageRender() }
			</Fragment>
		)
	}

	useEffect(() => {
		divideEntries(rows);
	}, [rows]);

	useEffect(() => {
		if (search) {
			divideEntries(searchResults);
		} else {
			divideEntries(rows);
		}
	}, [entries]);

	useEffect(async () => {

		if (!search) {
			divideEntries(rows);
			return;
		}
		
		const executePromise = (resolve, reject, column, _rows) => {
			let columnSearch = _rows.filter(i => {
				let item = String(i[column]).toLocaleLowerCase();
				return item.includes(search.toLocaleLowerCase());
			});
			return resolve(columnSearch);
		};

		let listPromises = [];

		columns.forEach(i => {
			listPromises.push(new Promise((resolve, reject) => executePromise(resolve, reject, i.id, rows)));
		});

		Promise.all(listPromises).then(values => {
			let searchResults = []
			values.forEach(i => searchResults = [...searchResults, ...i]);

			const uniqByKeepFirst = (array) => {
				let seen = new Set();
				return array.filter(i => {
					return seen.has(i.id) ? false : seen.add(i.id);
				});
			}

			let result = uniqByKeepFirst(searchResults);

			setStatesearchResults(result)
			divideEntries(result);
		});
		
	}, [search]);

	return (
		<div className="flex flex-col border-t border-gray-200 bg-white">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 rounded-b-lg px-6 pb-6">

						<div className="py-4 flex items-center justify-between">
							<div className="text-left">
								<span className="leading-6 text-sm text-gray-900 pr-2">Show Entries</span>
								<select className="bg-gray-100 rounded px-2 py-1" onChange={(e) => setStateEntries(e.target.value)}>
									<option value="10">10</option>
									<option value="25">25</option>
									<option value="50">50</option>
								</select>
							</div>
							<div className="text-left">
								<span className="leading-6 text-sm text-gray-900 pr-2">Search: </span>
								<input className="bg-gray-100 rounded border-2 border-gray-200 focus:outline-none" type="text" onChange={(e) => setTimeout(() => setStateSearch(e.target.value), 500)}/>
							</div>
						</div>

						<table className="min-w-full divide-y divide-gray-200 border border-gray-200 table-auto">
							<thead className="bg-gray-50">
								<tr>
									{columns.map(({ title }, idx) => (
										<th key={`table1-${idx}`} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">{title}</th> 
									))}
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{
									(dividedRows.length) ? 

										(pagination) ? 
											dividedRows[page].map((r, idx) => (
												<tr key={idx}>
													{columns.map(({ id }) => (
														<td key={`${idx}-${id}`} className="px-6 py-2 whitespace-nowrap">{r[id]}</td>
													))}
												</tr>
											))
										: dividedRows.map((r, idx) => (
											<tr key={idx}>
												{columns.map(({ id }) => (
													<td key={`${idx}-${id}`} className="px-6 py-2 whitespace-nowrap">{r[id]}</td>
												))}
											</tr>
										))

									: (<tr><td colSpan={columns.length} className="text-center py-3">{(loading) ? '': 'No Data'}</td></tr>)
								}
							</tbody>
						</table>

						<div className="pt-6 flex items-center justify-end">
							{
								(pagination) ?
									<Fragment>
										<ChevronLeftIcon className="h-6 w-6 mr-2 focus:outline-none" onClick={previousPage}/>
										{/* first page */}
										{ (dividedRows.length !== 1) 
											? <button 
												className={`${buttonClass} mr-2 ${(page === 0) ? 'bg-light-blue-400 border-2 border-light-blue-400':''}`}
												onClick={() => setStatePage(0)}
											>1</button>
											: null
										}

										{/* pages in between */}
										{ (page > 1 && (page + 1) < dividedRows.length - 1) ?
											pageInbetween()
											: pageNearCheck()
										}

										{/* last page */}
										{ (dividedRows.length > 1) 
											? <button 
												className={`${buttonClass} ml-2 ${((page + 1) === dividedRows.length) ? 'bg-light-blue-400 border-2 border-light-blue-400':''}`}
												onClick={() => setStatePage(dividedRows.length - 1)}
											>
												{dividedRows.length}
											</button>
											: null
										}
										<ChevronRightIcon className="h-6 w-6 ml-2 focus:outline-none" onClick={nextPage}/>
									</Fragment>
								: ''
							}
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}

export default Table;
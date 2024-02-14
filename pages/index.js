import {
	useContactsQuery,
	useContactQuery,
	useAddContactMutation,
	useUpdateContactMutation,
	useDeleteContactMutation,
} from "@/store/contactsApi";

export default function Home() {
	const { data, error, isLoading, isFetching, isSuccess } =
		useContactsQuery();

	console.log({
		data,
		error,
		isLoading,
		isFetching,
		isSuccess,
	});
	return (
		<main className="max-w-3xl pt-8 mx-auto">
			<div className="text-center">
				<h1>Contacts app</h1>
			</div>
			{isLoading && <h2>...Loading</h2>}
			{isFetching && <h2>...isFetching</h2>}
			{error && <h2>Something went wrong</h2>}
			{isSuccess && (
				<div>
					{data?.map((contact) => {
						return (
							<div className="data" key={contact.id}>
								<span>{contact.fullName}</span>
								<span>
									<ContactDetail id={contact._id} />
								</span>
							</div>
						);
					})}
				</div>
			)}
			<div>
				<AddContact />
			</div>
		</main>
	);
}

export const ContactDetail = ({ id }) => {
	const { data } = useContactQuery(id);
	return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export const AddContact = ({ id }) => {
	const contact = {
		fullName: "Maximum",
		email: "max@yahoo.com",
	};
	const contactUpdate = {
		fullName: "Maximum New",
		email: "max@yahoo.com",
	};
	const [addContact] = useAddContactMutation();
	const [updateContact] = useUpdateContactMutation();
	const [deleteContact] = useDeleteContactMutation();

	const addHandler = async () => {
		await addContact(contact);
	};
	const updateHandler = async () => {
		await updateContact(contactUpdate);
	};
	const deleteHandler = async () => {
		await deleteContact(contact.id);
	};

	return (
		<>
			<button onClick={addHandler}>Add Contact</button>
			<button onClick={updateHandler}>Update Contact</button>
			<button onClick={deleteHandler}>Delete Contact</button>
		</>
	);
};

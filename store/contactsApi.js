import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
	reducerPath: "contactsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
	tagTypes: ["Contact"],
	endpoints: (builder) => ({
		contacts: builder.query({
			query: () => "/contact",
			providesTags: ["Contact"],
		}),
		contact: builder.query({
			query: (id) => `/contact/${id}`,
			providesTags: ["Contact"],
		}),
		addContact: builder.mutation({
			query: (contact) => ({
				url: "/contact",
				method: "POST",
				body: contact,
			}),
			invalidatesTags: ["Contact"],
		}),
		updateContact: builder.mutation({
			query: ({ id, ...rest }) => ({
				url: `/contact/${id}`,
				method: "PUT",
				body: rest,
			}),
			invalidatesTags: ["Contact"],
		}),
		deleteContact: builder.mutation({
			query: (id) => ({
				url: `/contact/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Contact"],
		}),
	}),
});

export const {
	useContactsQuery,
	useContactQuery,
	useAddContactMutation,
	useUpdateContactMutation,
	useDeleteContactMutation,
} = contactsApi;

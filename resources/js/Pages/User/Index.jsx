import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transition } from '@headlessui/react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
function Index({ users, queryParams = null }) {

    queryParams = queryParams || {};
    const {
        recentlySuccessful,
        processing,
    } = useForm({});
    const [queryParam, setQueryParam] = useState(queryParams);
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        
        setQueryParam(queryParams);
    }
    const searchUsers = (e) => {
        e.preventDefault();
        if (!queryParam) return;
        router.get(route('users.index'), queryParam);
    }
    //&order_by=id&order=asc
    const sortUsers = (orderField) =>   {
        
        if((queryParams['order'] == 'desc' && orderField=='id')){
            queryParams['order'] = 'asc';
        }else if(queryParams['order'] == 'asc' && orderField==queryParams['order_by']){
            queryParams['order'] = 'desc';
        }else{
            queryParams['order'] = 'asc'; 
        }
        queryParams['order_by'] = orderField;
        setQueryParam(queryParams);
        if (!queryParam) return;
        router.get(route('users.index'), queryParam);
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users Listing
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <h3>Search Users</h3>
                    <form onSubmit={searchUsers} className="mt-6 space-y-6 w-1/2">
                        <div>
                            <InputLabel
                                htmlFor="search_email"
                                value="User Email"
                            />

                            <TextInput
                                id="search_email"
                                defaultValue={queryParams.email}

                                onInput={(e) =>
                                    searchFieldChanged('email', e.target.value)
                                }
                                type="text"
                                className="mt-1 block w-full"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="search_name"
                                value="User Name"
                            />

                            <TextInput
                                id="search_name"
                                defaultValue={queryParams.name}

                                onInput={(e) =>
                                    searchFieldChanged('name', e.target.value)
                                }
                                type="text"
                                className="mt-1 block w-full"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Search</PrimaryButton>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">
                                    done.
                                </p>
                            </Transition>
                        </div>
                    </form>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <table className="w-full text-center">
                            <thead>
                                <tr>
                                    <th className="border" onClick={()=>sortUsers('id')} >Id</th>
                                    <th className="border" onClick={()=>sortUsers('name')} >Name</th>
                                    <th className="border" onClick={()=>sortUsers('email')} >Email</th>
                                </tr>
                            </thead>
                            <tbody>

                                {users && users.data.map(user => (
                                    <tr key={user.id}>
                                        <td className="p-2 border" >{user.id}</td>
                                        <td className="p-2 border" >{user.name}</td>
                                        <td className="p-2 border" >{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-2">
                            <div className="mt-4 mx-auto block text-center">

                                {users && users.links.map((page, index) =>
                                (
                                    <Link
                                        preserveScroll
                                        key={index}
                                        dangerouslySetInnerHTML={{ __html: page.label }}
                                        className={`p-2  text-white hover:bg-sky-700  ${page.active === true ? 'bg-red-600' : 'bg-black'} ${page.url === null ? 'pointer-events-none' : "auto"}`}
                                        href={page.url}
                                    ></Link>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index
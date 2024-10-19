import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
function Index({ students }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Student Listing
                </h2>
            }
        >
            <Head title="students" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <table className="w-full text-center">
                            <thead>
                                <tr>
                                    <th className="border">Id</th>
                                    <th className="border">Name</th>
                                    <th className="border">Email</th>
                                </tr>
                            </thead>
                            <tbody>

                                {students && students.data.map(student => (
                                    <tr key={student.id}>
                                        <td className="p-2 border" >{student.id}</td>
                                        <td className="p-2 border" >{student.name}</td>
                                        <td className="p-2 border" >{student.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-2">
                            <div className="mt-4 mx-auto block text-center">
                                {students && students.links.map((page, index) =>
                                (
                                    <Link
                                        preserveScroll
                                        key={index}
                                        dangerouslySetInnerHTML={{ __html: page.label }}
                                        className={`p-2  text-white hover:bg-sky-700  ${page.active === true ? 'bg-red-600' : 'bg-black'} ${page.url === null ?'pointer-events-none':"auto"}`}
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
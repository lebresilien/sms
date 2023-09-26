import Breadcrumb from "../../components/Breadcrumb";

const GroupAdd = () => {

    return (
        <>
            <Breadcrumb pageName="Groupes" />

            <div className="grid grid-cols-1 gap-8 bg-red-100">
                <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Ajouter un groupes
                            </h3>
                        </div>
                        <div className="p-7">
                            <form action="#">
                                <div className="mb-5.5">
                                    <label
                                        className="mb-3 block text-sm text-black font-medium dark:text-white"
                                        htmlFor="name"
                                    >
                                        Nom du groupe <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        id="name"
                                    />
                                </div>
                                <div className="flex justify-end gap-4.5">
                                    <button
                                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                        type="submit"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                                        type="submit"
                                        onClick={() => {}}
                                    >
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GroupAdd;
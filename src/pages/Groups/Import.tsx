import Breadcrumb from "../../components/Breadcrumb";

const GroupImport = () => {

    return (
        <>
            <Breadcrumb pageName="Importer les contacts" />

            <div className="grid grid-cols-1 gap-8">
                <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                1- Choisir le Goupe Dans lequel importer les Contacts
                            </h3>
                        </div>
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex flex-col sm:flex-row border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <label className="mb-3 block text-black dark:text-white">
                                    Affecter les contacts à ce groupe
                                </label>
                                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                    <option value="">USA</option>
                                    <option value="">UK</option>
                                    <option value="">Canada</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 my-5">
                <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                2-Importer A Partir D'un Fichier CSV
                            </h3>
                        </div>
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <input
                                        type="file"
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4.5">
                <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                >
                    Annuler
                </button>
                <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    type="button"
                    onClick={() => {}}
                >
                    Importer les contacts
                </button>
            </div>
        </>
    );
}

export default GroupImport;
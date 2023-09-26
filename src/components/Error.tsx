
export type ErrorsProps = {
    data: {
        message: string,
        data: any[]
    } 
}

const Error = ({ data }: ErrorsProps) => (
    <>
        <div>
            
            <div className="font-medium text-red-600">
                { data.message }
            </div>

            <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                {Object.values(data.data).map((err: any, index: number) => (
                    <li key={index}>{err[0]}</li>
                ))}
            </ul>

        </div>
    </>
)

export default Error;

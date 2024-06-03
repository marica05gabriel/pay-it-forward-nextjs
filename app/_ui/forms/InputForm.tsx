interface Props {
  label: string;
  value: string;
}

export const InputForm = ({ label, value }: Props) => (
  <div className='w-full px-2 sm:col-span-3'>
    <label className='block text-sm font-medium leading-6 text-gray-900'>
      {label}
    </label>
    <div className='mt-2'>
      <input
        id={label}
        type='text'
        name='label'
        value={value}
        disabled
        readOnly={true}
        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
      />
    </div>
  </div>
);

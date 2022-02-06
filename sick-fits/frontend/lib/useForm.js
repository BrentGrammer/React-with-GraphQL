import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // state obj for inputs
  const [inputs, setInputs] = useState(initial);
  // watch values on the initial to prevent an infinite loop (if you just watch initial itself which gets overwritten and replaced with a new object triggering the useEffect over and over again)
  // This was done to prevent the edit product/update form not getting state set initially and causing a bug.
  const initialValues = Object.values(initial).join(''); // goes from a string of nothing(loading) to a string of values when data is present
  // update the initial state of the form (in the case of it being an update form)
  // when undefined state of loading changes to having actual data, you need to update initial state with that data
  useEffect(() => {
    // we watch a string conversion of initial to prevent setInputs causing an infinite loop when initial is replaced (triggering another change)
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      // file input values are always an array by default
      [value] = e.target.files;
    }
    setInputs({ ...inputs, [name]: value });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  return { inputs, handleChange, resetForm, clearForm };
}

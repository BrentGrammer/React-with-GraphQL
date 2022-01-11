import { useState } from 'react';

export default function useForm(initial = {}) {
  // state obj for inputs
  const [inputs, setInputs] = useState(initial);

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

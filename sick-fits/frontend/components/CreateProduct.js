import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'initial name',
    price: 111,
    description: 'initial description',
  });

  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="name">
        Price
        <input
          id="price"
          name="price"
          type="number"
          placeholder="Price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>

      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
}

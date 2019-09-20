import React, {useState} from 'react';
import Proptypes from 'prop-types';
// eslint-disable-next-line react/prop-types
export default function BookForm({onAddNewbook}) {
  const [errors, setErrors] = useState(undefined);

  /**
   * filterEmptyFormFields - check for empty form fields and return errors
   *
   * @param {any} aFields - list of fields (field name) to check
   * @param {any} form - form instance
   * @param {any} errorMessage - error message if error
   * @returns
   */
  function filterEmptyFormFields(
    aFields,
    form,
    errorMessage = `is required`,
  ) {
    const fields = aFields.map(key => form.elements[key]);
    const keyErrors = fields.reduce((errorList, field) => {
      if (!field.value) {
        errorList.push(`${field.name} ${errorMessage}`);
      }
      return errorList;
    }, []);

    return keyErrors;
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    const [name, genre, author] = e.target.elements;
    const errorMessage = 'is required';
    const fieldErrors = filterEmptyFormFields(
      ['name', 'genre', 'author'],
      e.target,
      errorMessage,
    );

    // empty errors to make sure we don't carry previous ones
    setErrors([]);
    if (fieldErrors.length) {
      setErrors(fieldErrors);
      return;
    }

    const details = {
      name: name.value,
      genre: genre.value,
      author: author.value,
    };

    onAddNewbook({details});
  }

  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line no-shadow
  const FormErrors = ({errors = []}) => {
    return (
      <div className="form-errors">
        {errors.map(error => (
          <div className="error-item" key={error}>
            {' '}
            {error}
          </div>
        ))}
      </div>
    );
  };

  FormErrors.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    errors: Proptypes.array.isRequired,
  };
  return (
    <>
      <h3>Add New book</h3>
      {errors && <FormErrors errors={errors} />}
      <form className="add-book-form" onSubmit={handleSubmitForm}>
        <div className="book-name">
          <label htmlFor="bookName">
            Book Name
            <input type="text" name="name" />
          </label>
        </div>
        <div className="book-genre">
          <label htmlFor="bookGenre">
            Book Genre
            <input type="text" name="genre" />
          </label>
        </div>
        <div className="book-author">
          <label htmlFor="bookAuthor">
            Book Author
            <input type="text" name="author" />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
}

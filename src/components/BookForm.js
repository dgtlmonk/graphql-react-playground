import React, {useState} from 'react';
import {Input} from 'semantic-ui-react';
import AuthorList from './AuthorList';
import FormErrors from './FormErrors';

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
      if (field && !field.value) {
        errorList.push(`${field.name} ${errorMessage}`);
      }
      return errorList;
    }, []);

    return keyErrors;
  }

  function onSelectAuthor({author}) {
    console.log('onSelectAuthor', author);
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

  return (
    <>
      <h3>Add New book</h3>
      {errors && <FormErrors errors={errors} />}
      <form className="add-book-form" onSubmit={handleSubmitForm}>
        <div className="book-name">
          <Input label="Name" name="name" placeholder="Book name" />
        </div>
        <div className="book-genre">
          <Input label="Genre" name="genre" placeholder="Genre" />
        </div>
        <div className="book-author">
          <AuthorList onSelect={onSelectAuthor} />
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
}

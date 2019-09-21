import React, {useState, useReducer} from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import {filterEmptyFormFields} from '../helpers/form';
import AuthorList from './AuthorList';
import FormErrors from './FormErrors';

const initialState = {
  name: '',
  genre: '',
  authorId: '',
};
function bookReducer(state, action) {
  switch (action.type) {
    case 'update':
      return {...state, [action.payload.field]: action.payload.value};
    case 'reset':
      return initialState;

    default:
      return state;
  }
}

// eslint-disable-next-line react/prop-types
export default function BookForm({onAddNewbook, onCancel}) {
  const [errors, setErrors] = useState(undefined);
  const [reset, toggleReset] = useState(true);
  const [bookDetails, dispatch] = useReducer(
    bookReducer,
    initialState,
  );

  function handleUpdateFieldChange({field, value}) {
    dispatch({type: 'update', payload: {field, value}});
  }

  function handleSelectAuthor({author}) {
    handleUpdateFieldChange({field: 'authorId', value: author});
  }

  function resetForm() {
    dispatch({type: 'reset'});
    toggleReset(reset => !reset);
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    setErrors(null);
    const [name, genre, authorId] = e.target.elements;
    const errorMessage = 'is required';
    const fieldErrors = filterEmptyFormFields(
      ['name', 'genre'],
      e.target,
      errorMessage,
    );

    if (fieldErrors.length) {
      setErrors(fieldErrors);
      return;
    }

    const details = {
      name: name.value,
      genre: genre.value,
      authorId: authorId.value,
    };

    setErrors(null);
    resetForm();
    onAddNewbook({details});
  }

  return (
    <>
      <h3>Add New book</h3>
      {errors && <FormErrors errors={errors} />}
      <form className="add-book-form" onSubmit={handleSubmitForm}>
        <div className="book-name">
          <Input
            label="Name"
            required
            type="text"
            name="name"
            value={bookDetails.name}
            placeholder="Book name"
            onChange={e =>
              handleUpdateFieldChange({
                field: e.target.attributes.name.value,
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="book-genre">
          <Input
            label="Genre"
            required
            name="genre"
            placeholder="Genre"
            value={bookDetails.genre}
            onChange={e =>
              handleUpdateFieldChange({
                field: e.target.attributes.name.value,
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="book-author">
          <AuthorList onSelect={handleSelectAuthor} reset={reset} />
        </div>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          style={{margin: `1em`}}
        >
          Save
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          style={{margin: `1em`}}
        >
          Cancel
        </Button>
      </form>
    </>
  );
}

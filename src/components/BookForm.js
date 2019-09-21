import React, {useState, useReducer} from 'react';
import {Input, Button} from 'semantic-ui-react';
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
export default function BookForm({onAddNewbook}) {
  const [errors, setErrors] = useState(undefined);
  const [bookDetails, dispatch] = useReducer(
    bookReducer,
    initialState,
  );
  const authorRef = React.useRef(null);

  function handleUpdateFieldChange({field, value}) {
    dispatch({type: 'update', payload: {field, value}});
  }

  function handleSelectAuthor({author}) {
    authorRef.current.value = author;
    handleUpdateFieldChange({field: 'authorId', value: author});
  }

  function resetForm() {
    dispatch({type: 'reset'});
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    setErrors(null);
    const [name, genre, authorId] = e.target.elements;
    const errorMessage = 'is required';
    const fieldErrors = filterEmptyFormFields(
      ['name', 'genre', 'author'],
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
      author: authorId.value,
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
          <input type="hidden" name="author" ref={authorRef} />
          <AuthorList onSelect={handleSelectAuthor} />
        </div>
        <Button primary type="submit" style={{margin: `1em`}}>
          Save
        </Button>
      </form>
    </>
  );
}

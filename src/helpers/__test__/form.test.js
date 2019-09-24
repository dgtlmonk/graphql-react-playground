import React, {useState} from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {validateFormFields} from '../form';

describe('validate form field helper', () => {
  test('should show error for empty fields', () => {
    const formFields = [
      {
        name: 'name',
        value: '',
      },
      {
        name: 'age',
        value: 12,
      },
      {
        name: 'gender',
        value: 'male',
      },
    ];

    const MyForm = React.memo(() => {
      const [errors, setErrors] = useState(null);
      const errorPostfix = 'error.';

      function handleSubmit(e) {
        e.preventDefault();
        const errors = validateFormFields(
          ['name', 'gender', 'age'],
          e.target,
          errorPostfix,
        );

        setErrors(errors);
      }
      return (
        <>
          <form onSubmit={handleSubmit}>
            {formFields.map(form => (
              <input
                type="text"
                data-testid={form.name}
                key={form.name}
                name={form.name}
              />
            ))}
            <button type="submit">Submit</button>
          </form>
          <div data-testid="error">{errors}</div>
        </>
      );
    });

    const comp = render(<MyForm />);
    const inputAge = comp.getByTestId('age');
    const inputGender = comp.getByTestId('gender');

    fireEvent.change(inputGender, {target: {value: '1'}});
    fireEvent.click(comp.getByText(/submit/gi));

    let got = comp.getByTestId('error', {selector: 'div'});
    let want = 'name error.age error.';

    expect(got).toHaveTextContent(want);

    fireEvent.change(inputGender, {target: {value: 'male'}});
    fireEvent.change(inputAge, {target: {value: '20'}});

    got = comp.getByTestId('error', {selector: 'div'});
    want = 'name error.';
    expect(got).toHaveTextContent(want);
  });
});

/**
 * validateFormFields - check for empty form fields and return errors
 *
 * @param {any} aFields - list of fields (field name) to check
 * @param {any} iForm - form instance
 * @param {any} errorMessage - error message if error
 * @returns {array}
 */
function validateFormFields(
  aFields,
  iForm,
  errorMessage = `is required`,
) {
  const fields = aFields.map(key => iForm.elements[key]);
  const keyErrors = fields.reduce((errorList, field) => {
    if (field && !field.value) {
      errorList.push(`${field.name} ${errorMessage}`);
    }
    return errorList;
  }, []);

  return keyErrors;
}

export {validateFormFields};

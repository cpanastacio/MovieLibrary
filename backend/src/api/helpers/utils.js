async function validator(schema, input) {
  try {
    await schema.validateAsync(input);
  } catch (error) {
    throw { status: 400, message: error.message };
  }
}

module.exports = validator;

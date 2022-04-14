async function validator(schema, input) {
  try {
    await schema.validateAsync(input);
  } catch (error) {
    throw new Error({
      status: 400,
      message: error.message,
    });
  }
}

module.exports = validator;

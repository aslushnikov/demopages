// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    const { username } = JSON.parse(event.body);
    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': `username=${username};`,
      },
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

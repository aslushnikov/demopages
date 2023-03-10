
const handler = async (event) => {
  if (!event.body)
    return { statusCode: 400, body: 'missing body' };
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: 'failed to parse body as JSON' };
  }
  if (!body.username)
    return { statusCode: 400, body: 'JSON body must have a single "username" entry with a name' };
  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': `username=${body.username}; path=/login_cookie.html`,
    },
  };
}

module.exports = { handler }

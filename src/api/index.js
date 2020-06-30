export function requestIntive(data) {
  return fetch(
    'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
}

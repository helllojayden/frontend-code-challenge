jest.mock('../../src/api', () => {
  function requestIntive(data) {
    if (data.email === '1@qq.com') {
      return Promise.resolve({
        status: 404,
        error: 'unAuthed',
      });
    }
    return Promise.resolve({
      status: 200,
    });
  }
  return {
    requestIntive,
  };
});

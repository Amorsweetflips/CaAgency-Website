import { initBotId } from 'botid/client/core';

initBotId({
  protect: [
    {
      path: '/api/posts',
      method: 'POST',
    },
    {
      path: '/api/posts/*',
      method: 'PUT',
    },
    {
      path: '/api/posts/*',
      method: 'DELETE',
    },
  ],
});

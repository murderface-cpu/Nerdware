import ky from 'ky';

const api = ky.create({
  prefix: 'https://nerdwaretechnologies.com',
  headers: {
    'Content-Type': 'application/json',
  },
  retry: { limit: 2 },
});

export default api;

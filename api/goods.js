import http from './http';

export const getGoods = (data = {}) => {
  return http({
    url: '/list',
    method: 'get',
    data,
  });
};

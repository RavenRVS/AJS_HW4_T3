import getLevel from '../app';
import fetchData from '../http';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test.each([
  ['response = ok', 'https://server/user/1', 1, { status: 'ok', level: '1' }, 'Ваш текущий уровень: 1'],
  ['response = error', 'https://server/user/1', 1, { status: 'error' }, 'Информация об уровне временно недоступна'],
])(
  ('should get %s and send request %s '),
  (level, request, id, response, expected) => {
    fetchData.mockReturnValue(response);

    expect(getLevel(id)).toBe(expected);

    expect(fetchData).toBeCalledWith(request);
  },
);

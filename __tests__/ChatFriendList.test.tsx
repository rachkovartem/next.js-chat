import {render, screen} from "@testing-library/react";
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import {withTestRouter} from "../helpers/withTestRouter";
import {ChatFriendList} from "../components/chatFriendsList/ChatFriendsList";
import {testState} from "../helpers/constants";
import configureStore from 'redux-mock-store'
import mockAxios from './../__mocks__/axios';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('ChatFriendList element', () => {
  const mockStore = configureStore();
  beforeEach(() => {
    const store = mockStore(testState)
    render(
      withTestRouter(
        <Provider store={store}>
          <ChatFriendList/>
        </Provider>
      )
    );
  })

  afterEach(() => {
    mockAxios.reset()
  })

  test('Friends list',  async () => {
    const postResponse = {
      data: {
        fullRooms: testState.fullRooms,
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }

    mockAxios.mockResponseFor({url: '/rooms/getAllUserRooms'}, {data: postResponse.data});
    const rooms = await screen.findAllByTestId('roomItem')
    expect(rooms).toHaveLength(10);
  });

})
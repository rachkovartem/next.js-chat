import {render, screen} from "@testing-library/react";
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import {withTestRouter} from "../helpers/withTestRouter";
import {testState} from "../helpers/constants";
import configureStore from 'redux-mock-store'
import {FriendsTab} from "../components/friendsTab/FriendsTab";


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

describe('Friends tab', () => {
  const mockStore = configureStore();
  beforeEach(() => {
    const store = mockStore(testState)
    render(withTestRouter(
      <Provider store={store}>
        <FriendsTab
          isBrowser={true}
          // @ts-ignore
          objFriends={testState.user.objFriends}
          id={testState.user.id}
          groupChatMembers={[]}
          setGroupChatMembers={() => {}}
          enqueueSnackbar={() => {}}
        />
      </Provider>))
  })
  test('List', async  () => {
      const items = await screen.findAllByTestId('friendListItem')
      expect(items).toHaveLength(10);
  });
});
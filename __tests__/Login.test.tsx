import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import Login from "../components/login/Login";
import {withTestRouter} from "../helpers/withTestRouter";

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

describe('Login page', () => {

  beforeEach(() => {
    render(withTestRouter(<Login locale={'en'} />));
  })

  test('Change Local Button',  async () => {
    const button = await screen.findByTestId('changeLocale');
    expect(button).toBeInTheDocument();
  });

  test('Register inputs', async () => {
      const registerButton = await screen.findByTestId('buttonRegister');
      expect(await screen.findByTestId('inputUsername')).toHaveStyle({display: 'none'})
      userEvent.click(registerButton);
      expect(await screen.findByTestId('inputUsername')).toHaveStyle({display: 'inline-flex'});
  })
})
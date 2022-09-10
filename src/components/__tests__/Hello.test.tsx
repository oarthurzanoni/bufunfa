import { Hello } from "components";
import {
  ComposeProviders,
  ThemeProvider,
  UserContext,
  UserProvider,
} from "contexts";
import React from "react";
import renderer from "react-test-renderer";

import { MockedNavigator } from "../../__mocks__/NavigationContainer";

const ptBR = {
  hello: "Olá, %{name}!",
  hello_stranger: "Olá, qual seu nome?",
};

const i18n = {
  t(dict: keyof typeof ptBR, { name }: { name: string }) {
    return ptBR[dict].replace("%{name}", name);
  },
};

jest.useFakeTimers();
jest.mock("../../translations/i18n", () => ({
  i18n,
}));

describe("<Hello />", () => {
  it("should render greetings message for a stranger user", () => {
    const tree = renderer.create(
      <ComposeProviders with={[ThemeProvider, UserProvider]}>
        <MockedNavigator name="Home" component={Hello} />
      </ComposeProviders>
    );

    const message = tree.root.findByProps({ testID: "helloMessage" }).props;
    expect(message.children).toEqual(ptBR.hello_stranger);
  });

  it("should render greetings message for a known user", () => {
    const name = "Arthur";
    const tree = renderer.create(
      <ThemeProvider>
        <UserContext.Provider
          value={{
            handleChangeUsername: jest.fn(),
            isLoadingUser: false,
            name,
            willSaveNameChanges: false,
          }}
        >
          <MockedNavigator name="Home" component={Hello} />
        </UserContext.Provider>
      </ThemeProvider>
    );

    const message = tree.root.findByProps({ testID: "helloMessage" }).props;
    const knownUserGreetingMessage = i18n.t("hello", { name });
    expect(message.children).toEqual(knownUserGreetingMessage);
  });
});

jest.mock("../../apiSdk");

import React from "react";
import { mount } from "enzyme";
import { readUsers } from "../../apiSdk";
import { App, AppProps } from "../App";
import { UsersTable } from "../UsersTable";

describe("App", () => {
  const users = [
    {
      id: 10001,
      name: "Geraldine Daniel",
      email: "Estelle_Crona@example.org",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "ADMIN",
    },
    {
      id: 10002,
      name: "Hugh Graham",
      email: "Roxanne30@example.com",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "AGENT",
    },
    {
      id: 10003,
      name: "Johnathan Feeney",
      email: "Junius35@example.org",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      role: "ACCOUNT_MANAGER",
    },
    {
      id: 10005,
      name: "Paul Christiansen",
      email: "Rowena.Greenholt@example.net",
      avatar: "https://uifaces.co/our-content/donated/gPZwCbdS.jpg",
      role: "EXTERNAL_REVIEWER",
    },
  ];
  const defaultProps: AppProps = { users };
  const create = (props?: Partial<AppProps>) =>
    mount(<App {...defaultProps} {...props} />);

  (readUsers as jest.Mock).mockResolvedValue(users);

  it("should sort users", () => {
    const wrapper = create();
    const sortByNameHeader = wrapper.findWhere(
      (node) => node.type() === "small" && node.text().includes("User")
    );
    const expectSorted = (order: "asc" | "desc") => {
      const expectedCompareValue = order === "asc" ? -1 : 1;
      const userNames = wrapper
        .find(UsersTable)
        .prop("users")
        .map((user) => user.name);

      expect(userNames[0].localeCompare(userNames[1])).toBe(
        expectedCompareValue || 0
      );
      expect(userNames[1].localeCompare(userNames[2])).toBe(
        expectedCompareValue || 0
      );
      expect(userNames[2].localeCompare(userNames[3])).toBe(
        expectedCompareValue || 0
      );
    };

    sortByNameHeader.simulate("click");
    expectSorted("asc");

    sortByNameHeader.simulate("click");
    expectSorted("desc");
  });
});

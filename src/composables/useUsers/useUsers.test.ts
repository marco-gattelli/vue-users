import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const mockedCall = vi.fn();
vi.mock("@/api/client", () => {
  return {
    apolloClient: {
      query: mockedCall,
    },
  };
});

import { useUsers } from "@/composables/useUsers/useUsers";
import { User } from "@/types/user";

beforeEach(() => {
  mockedCall.mockReset();
});
afterAll(() => {
  vi.unmock("@/api/client");
});

describe("useUsers", () => {
  it("should call the getFilteredUsers function using the value passed as arg", async function () {
    // Arrange.
    const searchWord = "foo";
    const { getFilteredUsers } = useUsers();

    // Act.
    await getFilteredUsers(searchWord);

    // Assert.
    expect(mockedCall).toHaveBeenCalledTimes(1);
    expect(mockedCall.mock.calls[0][0].variables.q).toBe(searchWord);
  });

  it("should set the loading correctly when the getFilteredUsers is called", () =>
    new Promise((done) => {
      // Arrange.
      const { getFilteredUsers, isLoading } = useUsers();
      const isLoadingBefore = isLoading.value;

      mockedCall.mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      });

      // Act.
      getFilteredUsers("").then(() => {
        expect(isLoadingBefore).toBe(false);
        done();
      });

      // Assert.
      expect(isLoadingBefore).toBe(false);
      expect(isLoading.value).toBe(true);
    }));

  it("should set the error to true if something happen when the getFilteredUsers is called", async function () {
    // Arrange.
    const { getFilteredUsers, hasError } = useUsers();

    mockedCall.mockImplementation(() => {
      return new Promise((_, reject) => {
        setTimeout(reject, 1000);
      });
    });

    // Act.
    expect(hasError.value).toBe(false);
    await getFilteredUsers("");

    // Assert.
    expect(hasError.value).toBe(true);
  });

  it("should set the error to true the api return an error", async function () {
    // Arrange.
    const { getFilteredUsers, hasError } = useUsers();

    mockedCall.mockResolvedValue({
      data: { users: { data: [] } },
      error: true,
    });

    // Act.
    expect(hasError.value).toBe(false);
    await getFilteredUsers("");

    // Assert.
    expect(hasError.value).toBe(true);
  });

  it("should set the users coming from the api", async function () {
    // Arrange.
    const mockedUser = {
      email: `foo`,
      username: `bar`,
      id: `baz`,
      name: `foobar`,
      phone: `foobaz`,
      website: `foofoo`,
      company: {
        bs: `bar`,
        name: `baz`,
        catchPhrase: `foo`,
      },
    };
    mockedCall.mockResolvedValue({
      data: {
        users: {
          data: [mockedUser],
        },
      },
    });
    const { getFilteredUsers, users } = useUsers();

    // Act.
    await getFilteredUsers("");

    // Assert.
    expect(users.value).toHaveLength(1);
    expect(users.value[0]).toEqual(mockedUser);
  });
});

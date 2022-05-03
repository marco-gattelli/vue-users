import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import UserCard from "@/components/UserCard/UserCard.vue";
import { User } from "@/types/user";

describe("UserCard", () => {
  it("should render without crash", function () {
    // Arrange.
    const user: User = {
      email: "foo",
      username: "bar",
      id: "baz",
      name: "foobar",
      phone: "foobaz",
      website: "foofoo",
      company: {
        bs: "bar",
        name: "baz",
        catchPhrase: "foo",
      },
    };
    // Act.
    const { element } = mount(UserCard, { props: { user } });

    // Assert.
    expect(element).toMatchSnapshot();
  });
});

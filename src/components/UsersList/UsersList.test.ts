import { beforeAll, describe, expect, it } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import UsersList from "@/components/UsersList/UsersList.vue";
import { User } from "@/types/user";

const users: User[] = [];

beforeAll(() => {
  for (let i = 0; i < 30; i++) {
    users.push({
      email: `foo${i}`,
      username: `bar${i}`,
      id: `baz${i}`,
      name: `foobar${i}`,
      phone: `foobaz${i}`,
      website: `foofoo${i}`,
      company: {
        bs: `bar${i}`,
        name: `baz${i}`,
        catchPhrase: `foo${i}`,
      },
    });
  }
});

describe("UsersList", () => {
  it("should render without crash", function () {
    // Arrange.
    // Act.
    const { element } = mount(UsersList, { props: { users } });

    // Assert.
    expect(element).toMatchSnapshot();
  });

  it("should emit the loadMore event when intersecting", function () {
    // Arrange.
    const wrapper = mount(UsersList, { props: { users } });

    // Act.
    wrapper.vm.onIntersecting();

    // Assert.
    expect(wrapper.emitted()).toHaveProperty("loadMore");
  });
});

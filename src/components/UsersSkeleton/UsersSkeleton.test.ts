import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import UsersSkeleton from "@/components/UsersSkeleton/UsersSkeleton.vue";

describe("UsersSkeleton", () => {
  it("should render without crash", function () {
    // Arrange.
    // Act.
    const { element } = mount(UsersSkeleton);

    // Assert.
    expect(element).toMatchSnapshot();
  });
});

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import InfoMessage from "@/components/InfoMessage/InfoMessage.vue";

describe("InfoMessage", () => {
  it("should render without crash", function () {
    // Arrange.
    // Act.
    const { element } = mount(InfoMessage, {
      props: {
        message: "bar",
        variant: "warning",
      },
    });

    // Assert.
    expect(element).toMatchSnapshot();
  });

  it("should render error message", function () {
    // Arrange.
    // Act.
    const { element } = mount(InfoMessage, {
      props: {
        message: "baz",
        variant: "error",
      },
    });

    // Assert.
    expect(element).toMatchSnapshot();
  });
});

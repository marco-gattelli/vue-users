import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CommonInput from "@/components/CommonInput/CommonInput.vue";

describe("CommonInput", () => {
  it("should render without crash", function () {
    // Arrange.
    // Act.
    const { element } = mount(CommonInput, {
      props: {
        dataTestId: "baz",
        modelValue: "foo",
        placeholder: "bar",
        disabled: false,
      },
    });

    // Assert.
    expect(element).toMatchSnapshot();
  });

  it("should render the input disabled", async function () {
    // Arrange.
    // Act.
    const wrapper = mount(CommonInput, {
      props: {
        dataTestId: "foo",
        modelValue: "foo",
        placeholder: "bar",
        disabled: true,
      },
    });

    // Assert.
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should emit the update event when the input value change", async function () {
    // Arrange.
    const inputDataTestId = "baz";
    const newValue = "foofoo";
    const wrapper = mount(CommonInput, {
      props: {
        dataTestId: inputDataTestId,
        modelValue: "foo",
        placeholder: "bar",
        disabled: false,
      },
    });
    const input = wrapper.find(`[data-testid="${inputDataTestId}"]`);

    // Act.
    await input.setValue(newValue);

    // Assert.
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    // @ts-ignore
    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(newValue);
  });
});

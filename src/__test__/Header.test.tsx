import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Header from "../components/Layout/Header";

describe("Header", () => {
  it("render tasks", async () => {
    const { container } = render(<Header />);
    expect(container).toHaveTextContent("Yolo");
  });
});

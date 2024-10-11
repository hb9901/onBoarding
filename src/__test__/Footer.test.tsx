import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Footer from "../components/Layout/Footer";

describe("Footer", () => {
  it("render tasks", async () => {
    const { container } = render(<Footer />);
    expect(container).toHaveTextContent("Yolo");
  });
});

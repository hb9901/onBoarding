import { render } from "@testing-library/react";
import App from "../App";

describe("메인 페이지 렌더 테스트", () => {
  test("메인 페이지 렌더 실패 시 에러메시지", async () => {
    render(<App />);
  });
});

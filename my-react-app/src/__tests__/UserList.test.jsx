import { render, screen, waitFor } from "@testing-library/react";
import UserList from "../components/UserList";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, name: "Olivier Rukundo" },
        { id: 2, name: "Tjaq Dev" },
      ]),
  })
);

test("renders a list of users after fetching", async () => {
  render(<UserList />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Olivier Rukundo")).toBeInTheDocument();
    expect(screen.getByText("Tjaq Dev")).toBeInTheDocument();
  });

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users");
});

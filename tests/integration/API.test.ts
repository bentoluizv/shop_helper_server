import axios from "axios";

const request = (url: string, method: string, data?: object) =>
  axios({
    url,
    method,
    data,
    validateStatus: function (status) {
      return (
        (status >= 200 && status < 300) ||
        status == 404 ||
        status == 409 ||
        status == 500
      );
    },
  });

describe("API Test", () => {
  it("Should GET / index route", async () => {
    const response = await request("http://localhost:3000/", "get");
    expect(response.status).toBe(200);
  });

  it("Should POST /list and save a list", async () => {
    const data = {
      id: "fe57fdc2-6740-4c61-9987-1sad7c703k8y",
      status: "Open",
      items: [
        { id: 1, name: "Café", quantity: 2 },
        { id: 2, name: "Leite", quantity: 1 },
        { id: 3, name: "Nescau", quantity: 1 },
      ],
    };
    const response = await request("http://localhost:3000/list", "post", data);
    expect(response.status).toBe(201);
    expect(response.data).toMatchObject<typeof data>;
  });

  it("Should GET /list/:id route and get a list by id", async () => {
    const response = await request(
      "http://localhost:3000/list/fe57fdc2-6740-4c61-9987-1sad7c703k8y",
      "get"
    );
    expect(response.status).toBe(201);
    expect(response.data.id).toBe("fe57fdc2-6740-4c61-9987-1sad7c703k8y");
    expect(response.data.items).toStrictEqual([
      { name: "Café", quantity: 2 },
      { name: "Leite", quantity: 1 },
      { name: "Nescau", quantity: 1 },
    ]);
  });

  it("Should return 404 for non existing resource", async () => {
    const response = await request(
      "http://localhost:3000/list/fe57fdc2-6740-4c61-9987-1sad7c709i8y",
      "get"
    );
    expect(response.data).toBe("List not found!");
    expect(response.status).toBe(404);
  });

  it("Should return 409 for duplicated resource", async () => {
    const data = {
      id: "ffdce572-674c61-90-4987-sad17c703k8y",
      status: "Open",
      items: [
        { id: 1, name: "Café", quantity: 2 },
        { id: 2, name: "Leite", quantity: 1 },
        { id: 3, name: "Nescau", quantity: 1 },
      ],
    };
    const response = await request("http://localhost:3000/list", "post", data);
    expect(response.status).toBe(201);
    const response2 = await request("http://localhost:3000/list", "post", data);
    expect(response2.status).toBe(409);
    expect(response2.data).toBe("List already exists!");
  });
});

it("Should DELETE /list/:id route and delete a list by id", async () => {
  const response = await request(
    "http://localhost:3000/list/fe57fdc2-6740-4c61-9987-1sad7c703k8y",
    "delete"
  );
  expect(response.status).toBe(204);
  const response2 = await request(
    "http://localhost:3000/list/ffdce572-674c61-90-4987-sad17c703k8y",
    "delete"
  );
  expect(response2.status).toBe(204);
});
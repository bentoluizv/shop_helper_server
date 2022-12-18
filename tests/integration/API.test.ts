import axios from "axios";
describe("API Test", () => {
  it("Should GET / index route", async () => {
    const response = await axios.get("http://localhost:3000/");
    expect(response.status).toBe(200);
  });

  it("Should POST /list", async () => {
    const data = {
      id: "fe57fdc2-6740-4c61-9987-1sad7c703k8y",
      status: "Open",
      items: [
        { id: 1, name: "Café", quantity: 2 },
        { id: 2, name: "Leite", quantity: 1 },
        { id: 3, name: "Nescau", quantity: 1 },
      ],
    };
    const response = await axios.post("http://localhost:3000/list", data);
    expect(response.status).toBe(201);
    expect(response.data).toMatchObject<typeof data>;
  });
});

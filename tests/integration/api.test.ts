describe("Api unit test", () => {
  const URL = "localhost";
  const PORT = process.env.PORT || 3000;
  it("Should fetch / route", async () => {
    const response = await fetch(`http://${URL}:${PORT}`);
    expect(response.status).toBe(200);
  });
});

export {};

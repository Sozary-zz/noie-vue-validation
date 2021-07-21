import { apiValidateInfo } from "../services/api";

test("No infos provided", () => {
  return apiValidateInfo({}).then((response) => {
    expect(response.data.statusCode).toBe(403);
  });
});

test("Just email provided", () => {
  return apiValidateInfo({ email: "testtesttest" }).then((response) => {
    expect(response.data.statusCode).toBe(403);
  });
});

test("Everything provided, mail incorrect", () => {
  return apiValidateInfo({ email: "testtesttest", zip: "", city: "" }).then(
    (response) => {
      expect(response.data.statusCode).toBe(403);
      expect(
        !!response.data.messages.find((m) => m.includes("Wrong email format"))
      ).toBe(true);
    }
  );
});

test("Email correct", () => {
  return apiValidateInfo({ email: "test@test.test", zip: "", city: "" }).then(
    (response) => {
      expect(response.data.statusCode).toBe(403);
      expect(
        !!response.data.messages.find((m) => m.includes("Wrong email format"))
      ).toBe(false);
    }
  );
});

test("Everythin correct", () => {
  return apiValidateInfo({
    email: "test@test.test",
    zip: "1234",
    city: "Copenhagen",
  }).then((response) => {
    expect(response.data.statusCode).toBe(200);
  });
});

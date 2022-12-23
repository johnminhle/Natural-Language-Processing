/**
 * @jest-environment jsdom
 */

import { handleSubmit } from "../src/client/js/formHandler";

describe("handleSubmit", () => {
   test("Success", async () => {
      const event = { preventDefault: jest.fn() };
      // const event = { preventDefault: () => {} };
      const data = {
         agreement: "testagreement",
         confidence: "testconfidence",
         irony: "testirony",
         subjectivity: "testsubjectivity",
         text: "testtext",
      };
      const doc = {
         innerHTML: `agreement: ${data.agreement}, confidence: ${data.confidence}, irony: ${data.irony}, subjectivity: ${data.subjectivity}, text: ${data.text}`,
      };
      const formField = {
         value: "testformtext",
      };
      const res = {
         json: jest.fn(async () => data),
      };

      global.fetch = jest.fn(() => Promise.resolve(res));
      global.document.getElementById = jest.fn((id) => {
         if (id === "name") {
            return formField;
         } else if (id === "results") {
            return doc;
         }
      });

      handleSubmit(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(fetch.mock.calls.length).toBe(1);
      // expect(res.json.mock.calls.length).toBe(1);
      expect(document.getElementById.mock.calls.length).toBe(1);
      expect(doc.innerHTML).toBe(
         `agreement: ${data.agreement}, confidence: ${data.confidence}, irony: ${data.irony}, subjectivity: ${data.subjectivity}, text: ${data.text}`
      );
   });
});

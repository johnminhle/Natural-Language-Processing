import { checkForName } from "../src/client/js/nameChecker";

describe("checkForName", () => {
    test("Success", () => {
        global.alert = jest.fn();
        checkForName("https://www.google.com")
        expect(alert.mock.calls[0][0]).toBe("Success!")
    })
    test("Error", () => {
        global.alert = jest.fn();
        checkForName("https://www.google.comsdhfnsjdkhs")
        expect(alert.mock.calls[0][0]).toBe("Error!")
    })
})
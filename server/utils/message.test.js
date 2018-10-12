const expect = require("expect");

const {generateMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate correct message object", () => {
        const from = "Mike";
        const text = "Hello";

        const res = generateMessage(from, text);
        //expect(res.from).toBe(from);
        //expect(res.text).toBe(text);
        expect(res.createdAt).toBeA("number");
        expect(res).toInclude({
            from,
            text
        });
    });
});
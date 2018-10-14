const expect = require("expect");
const {isRealString} = require("./validation.js");

describe("isRealString", () => {
    it("should reject non-string values", () => {
        const string = 1234;
        const res = isRealString(string);
        expect(res).toBe(false);
    });
    
    it("should reject strings with only spaces", () => {
        const string= "   ";
        const res = isRealString(string);
        expect(res).toBe(false);
    });

    it("should allow strings with non-space characters", () => {
        const string = " Yeeboi  ";
        const res = isRealString(string);
        expect(res).toBe(true);
    });


});

//import isreal string

//is realstring
    //should reject non string values
    //should reject strings with only spaces
    //should allow strings with non space characters

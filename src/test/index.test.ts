import { validateArg } from "../main"


describe("validate Arg function",()=>{

    const errorMessage = "counter needs to be an integer > 0";
    test("check argument is integer", ()=>{
        expect(validateArg("3")).toBe(3);
    })
    test("check error message if no arg", ()=>{
        try {
            expect(validateArg("")).toThrow(errorMessage);
        } catch (e) {
            expect(e).toBe(errorMessage);
        }
    })
    test("check error message if arg 0", ()=>{
        try {
            expect(validateArg("")).toThrow(errorMessage);
        } catch (e) {
            expect(e).toBe(errorMessage);
        }
    })
    test("check error message if arg hello", ()=>{
        try {
            expect(validateArg("hello")).toThrow(errorMessage);
        } catch (e) {
            expect(e).toBe(errorMessage);
        }
    })

    test("check error message if arg decimal", ()=>{
        try {
            expect(validateArg("3.4")).toThrow(errorMessage);
        } catch (e) {
            expect(e).toBe(errorMessage);
        }
    })
    test("check error message if arg is random", ()=>{
        try {
            expect(validateArg("3.hadf")).toThrow(errorMessage);
        } catch (e) {
            expect(e).toBe(errorMessage);
        }
    })
                


})
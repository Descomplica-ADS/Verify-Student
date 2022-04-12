import { validadeCodeAndRA, validateNamedCode, validateAllCodes } from "./hooks/regexImports.js"

export default function validations(content){
    const [ code, RA_alnum ] = content.split(/ +/)

    if (!validateAllCodes(code))     return "noCode"
    if (!validateNamedCode(code))    return "invalidCode"
    if (!RA_alnum)                   return "emptyRA"
    if (!validadeCodeAndRA(content)) return "invalidRA"

    return "valid"
}
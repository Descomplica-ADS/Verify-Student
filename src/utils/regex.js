const
    regexCodeAndRA = /!verif((i)(ca(r?|tion)|que)|y) +((2)\6)1\d{4}-((0)\8)6/,
    regexCode      = /!verif((i)(ca(r?|tion)|que)|y)/,
    regexAllCodes  = /^![a-zA-Z]+/,
    regexRA        = /((2)\2)1\d{4}-((0)\4)6/

export const
    validadeCodeAndRA = content => regexCodeAndRA.test(content),
    validateNamedCode = code    => regexCode.test(code),
    validateAllCodes  = code    => regexAllCodes.test(code),
    validateRA        = RA      => regexRA.test(RA)
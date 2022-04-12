import { emoji } from "./emojiImports.js"

export const replies = {
    "invalidCode": "Código inválido!",
    "emptyRA": `Digite o número do seu RA. Ex: !{code} 0000000-000" ${emoji.pencil}`,
    "invalidRA": `Número de RA inválido! ${emoji.noEntrySign}`,
    "youAlreadyChecked": `Você já verificou um RA. ${emoji.noEntry}`,
    "alreadyCheckedRA": `Este RA já está verificado.`,
    "dbInsertionError": `Error 500: Inserção no banco de dados falhou.`,
    "verifiedUser": `Você foi verificado(a)! ${emoji.whiteCheckMark}`,
}
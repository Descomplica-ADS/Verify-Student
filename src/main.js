import { connClient as client, roles }        from "./hooks/discordImports.js"
import { userVerified, existsUser, existsRA } from "./hooks/databaseImports.js"
import { replies } from "./hooks/replies.js"
import validations from "./validations.js"

client.on("messageCreate", async message => {
    const
        { author, content }       = message,
        { id: user_id, username } = author,
        [ code, RA_alnum ]        = content.split(/ +/)

    if (author.bot) return

    const callback = validations(content)
    if (callback == "noCode") return
    if (callback != "valid")  return message.reply(replies[callback])

    const RA = Number(RA_alnum.replace("-", ""))

    if ((await existsUser(user_id)).length != 0) return message.reply(replies.youAlreadyChecked)
    if ((await existsRA(RA)).length != 0)        return message.reply(replies.alreadyCheckedRA)

    userVerified(RA, username, user_id)
    .then(()      => message.member.roles.add(roles.verified))
    .then(()  => message.reply(replies.verifiedUser))
    .catch(() => message.reply(replies.dbInsertionError))
})
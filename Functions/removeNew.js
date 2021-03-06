module.exports = function (guild) {
    const chalk = require("chalk");
    const NEW = "430170511385952267";
    const NEW_INTERVAL = 6 * 3600 * 1000; //6 HOURS
    async function delay(ms) { return new Promise(resolve => { setTimeout(() => { resolve() }, ms) }) };
    removeNew();
    async function removeNew() {
        let newMems = guild?.roles?.get(NEW)?.members?.array();
        if (!newMems) {
            console.log(chalk.red("NEW role undefined, waiting 5 seconds..."));
            await delay(5000);
            return removeNew();
        }
        for (let mem of newMems) {
            let joined = mem.joinedAt.getTime();
            if (joined + NEW_INTERVAL <= Date.now()) {
                console.log(chalk.bgBlueBright("Removing new role from " + mem.displayName));
                try {
                    await mem.removeRoles([NEW]);
                } catch(e) {
                    console.log(e, /REMOVEERROR/)
                    guild.channels.get("470406597860917249").send(`<@${mem.user.id}>`)
                    console.log(chalk.yellow("Unable to remove new from " + mem.displayName))
                }
                await delay(1000);
            }
        }
        await delay(60000);
        removeNew();
    }
}

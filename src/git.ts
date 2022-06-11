import simplegit from "simple-git";
import * as fs from "fs/promises";
import * as constants from "constants";

export const copyRepo = async function (path: string, url: string) {
    const git = simplegit(path);
    await git.remote(["set-url", "origin", url]);
    const branches = (await git.branch()).all
        .filter(b => b.startsWith("remotes/origin/"))
        .map(b => b.replace("remotes/origin/", ""));

    for (const branch of branches) {
        await git.checkout(branch);
        await git.push();
        console.log("Pushed " + branch);
    }
};

export const cloneRepo = async function (url: string) {
    const name = getRepoName(url);
    const exists = await fileExists(name);
    if (exists) {
        await fs.rm(name, {recursive: true});
    }
    await simplegit().clone(url, process.cwd() + "/" + name);
}

export const getRepoName = (url: string): string => {
    const match = /(.*\/)(?<reponame>.*?)(?:\.git)?$/.exec(url)?.groups?.["reponame"];
	if (!match) {
		throw new Error("Repository name cannot be empty.");
	}
	return match;
}

export const fileExists = async (name: string): Promise<boolean> => {
	try {
		await fs.access(name, constants.F_OK | constants.R_OK | constants.W_OK);
		return true;
	} catch (error) {
		return false;
	}
}
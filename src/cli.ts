import {createGithubRepo, inviteCollaborator} from "./github";
import {cloneRepo, copyRepo, getRepoName} from "./git";
import {githubCollaborator, githubToken, githubUsername, repoURL} from "./config";

const runCLI = async () => {
    const name = getRepoName(repoURL);
    await cloneRepo(repoURL);
    const githubURL = await createGithubRepo(name);
    const authURL = githubURL.replace("https://", `https://${githubUsername}:${githubToken}@`);
    await copyRepo(process.cwd() + "/" + name, authURL);
    for (const collaborator of githubCollaborator) {
        await inviteCollaborator(collaborator, githubURL);
    }
}

runCLI();
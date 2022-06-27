# CloneAndInvite
Clone and invite is a program used to clone a git repo from URL, 
re upload it as a private repo, and invite collaborators.
# Usage
Copy src/config-example.ts to src/config.ts and edit as needed

githubUsername: Your username on github.

githubToken: Your github token. Create one at https://github.com/settings/tokens/new

repoURL: URl to the repo you wish to clone

githubCollaborator: array of github usernames you wish to invite.

After configuration simply ``node run start`` and it will clone the repo of your choice.

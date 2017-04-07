# Environment Variables

All environment variables are defined, maintained, and encrypted via [git-secret](http://git-secret.io). Because they are encrypted, sensitive information (e.g. aws keys, database uris, etc) can be defined and committed to the repository. It's all centralized in one place.

To get up and running, follow these steps:

1. Install git-secret: `brew install git-secret`
2. If you haven't already, [download GPG Suite](https://gpgtools.org/).
3. Create a GPG key and upload it to the key server. This can be done via the GPG Keychain app.
4. Assuming you've been granted access by your project's dev lead, you can now run `git secret reveal` to decrypt all added `.env.*` files specified for the project.
5. After making changes to an `.env.*` file, you can run `git secret hide` to re-encrypt and save your changes. These changes are now safe to push to the repository.

By convention, HAUS' continuous integration server will match git branch name to the appropriate remote environment. For example, when pushing to a git branch named `staging`, our CI server will respect all environment variables set inside the `.env.staging` file. So the convention is `.env.{BRANCH_NAME}`.

Refer to [git-secret.io](http://git-secret.io) for more detailed instructions and usage information.

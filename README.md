# RemNote Plugin Template

## Required Software

You'll need the following software to start developing:

1. [Node.js](https://nodejs.org/en/download/)

2. [A GitHub Account](https://github.com/)

3. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

4. An IDE or Text Editor

We recommend using [Visual Studio Code](https://code.visualstudio.com/), but any other IDE or text editor will work.

## Template Setup Guide

## Create a new repository from this template

- Above the file list, click the green button which says "Use this template".
- Select the account you want to own the repository.
- Type a name for your repository, and an optional description.
- Choose a repository visibility.
- Click "Create repository from template".

## Clone your new repository

- Browse to your new GitHub repository
- Click on the Clone or download button
- Press "HTTPS"
- Copy the link
- Open a terminal in the directory where you want to clone the repository
- Run `git clone <link>` to download the repository.

### Running the Template

Open your terminal of choice and navigate into the folder of the repository you just cloned. If you are interested in learning about the structure of the plugin template, check the [plugin structure documentation](https://plugins.remnote.com/advanced/project_structure) page.

Then run:

```bash
npm install
```

This will install a very minimal React App, along with the RemNote plugin SDK (software development kit).

### Start your plugin

Inside the plugin folder, run:

```bash
npm run dev-sandbox-only
```

## Resources

If you are interested in building your own plugins, taking a look through the source code for our example plugins and plugins built by the community would be a great starting point.
Of course, you should also check out the official documentation, guides and tutorials on our [plugin website](https://plugins.remnote.com).
If you are new to writing plugins, we recommend checking out the [dictionary plugin project tutorial](https://plugins.remnote.com/in-depth-tutorial/overview).

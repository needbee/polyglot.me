polyglot.me
===========

Consistent cheat sheets for multiple programming languages.


Adding Tools or Features
========================

Please contribute by making corrections or additions to existing tools,
adding new tools, or adding entirely new features or feature sets!

The list of features and tools (i.e. programming languages or
frameworks) is driven from a set of JSON files in the 'data' folder:

- featuresets.json lists all the features that will be described for
  different tools, such as string comparison and pushing to an array.
  Features are grouped into feature sets, such as Strings and
  Collections.
- tools/_list.json is a list of all the tools. A tool is a language or
  framework: anything that provides some "features."
- tools/*.json are the different tools. The file contains some basic
  information about the tool, then the definitions for each feature it
  provides.

To add or modify a feature or tool:

- Fork this repository
- Make the appropriate changes
- If you added a new tool, add it to the _list.json file
- Submit a pull request

**Please use hard tabs, not spaces, when adding entries to the JSON
file, just to keep things consistent.**

More instructions:
- [Forking a repository](https://help.github.com/articles/fork-a-repo)
- [Submitting a pull request](https://help.github.com/articles/using-pull-requests)
- If you don't yet have a GUI Git client, I recommend the free
  [SourceTree](http://www.sourcetreeapp.com/)


Private Installations
=====================

Feel free to make a private fork for internal use within your
organization. For example, you may want to include just the languages
and libraries and versions you use, add proprietary frameworks, or modify
features to match your coding standards. All I ask is that, if you make
any additions to publicly-available tools, please do a pull request to
add them to the master.


Installing
==========

To run, clone the repository, then run `npm install`. The application
must be run within a web server that supports .htaccess files and
rewriting, and it must be installed at the root level of its domain.

If you do not yet have npm installed, get it here: http://nodejs.org/


License
=======

Released under the MIT License. See the file LICENSE

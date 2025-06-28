---
layout: "post"
title: "Troubleshooting GitHub Copilot keyboard shortcuts in Jetbrains IDEs"
author: "Jesse Houwing"
description: "Learn how to troubleshoot keyboard issues in Jetbrains IDE's when your GitHub Copilot tools don't work the way you're expecting"
excerpt_separator: <!--excerpt_end-->
canonical_url: "https://jessehouwing.net/troubleshooting-github-copilot-keyboard-shortcuts-in-jetbrains-ides/"
---

While GitHub Copilot works easily in Visual Studio Code and Visual Studio 2022, Jetbrains IDEs (IntelliJ, Rider, PyCharm, etc.) can be trickier to set up. Jesse Houwing identifies two main problems that break GitHub Copilot functionality in these environments: keyboard shortcut conflicts and completion plugin interference.<!--excerpt_end-->

To fix keyboard shortcut conflicts, check if your shortcut is already assigned to another command by double-clicking the command in the keymap settings and either assign a free key combination or remove conflicting assignments. For tab completion issues, ensure both GitHub Copilot and Full line code completion are up-to-date, or try disabling the Full line completion plugin.

[Read the full article on Jesse's blog](https://jessehouwing.net/troubleshooting-github-copilot-keyboard-shortcuts-in-jetbrains-ides/)

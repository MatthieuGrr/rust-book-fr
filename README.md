> # 📖 Le langage de programmation Rust
>
> **🌐 This is the french translation of the book "The Rust Programming Language"**
>
> [👓 Click here to read this translated book online](https://jimskapt.github.io/rust-book-fr/)
>
> *[🔗 Click here to go to the English Book repository](https://github.com/rust-lang/book)*
>
> Translations are inside [`/FRENCH/`](https://github.com/Jimskapt/rust-book-fr/tree/french-release/FRENCH)
> folder. Everything else should be remaining as the English Book *(except some
> necessary files, like this README.md)*.
>
> Want to help to translate ?
> Please read the file
> [/FRENCH/CONTRIBUTING.md](https://github.com/Jimskapt/rust-book-fr/blob/french-release/FRENCH/CONTRIBUTING.md) !

# The Rust Programming Language

![Build Status](https://github.com/rust-lang/book/workflows/CI/badge.svg)

This repository contains the source of "The Rust Programming Language" book.

[The book is available in dead-tree form from No Starch Press][nostarch].

[nostarch]: https://nostarch.com/rust

You can also read the book for free online. Please see the book as shipped with
the latest [stable], [beta], or [nightly] Rust releases. Be aware that issues
in those versions may have been fixed in this repository already, as those
releases are updated less frequently.

[stable]: https://doc.rust-lang.org/stable/book/
[beta]: https://doc.rust-lang.org/beta/book/
[nightly]: https://doc.rust-lang.org/nightly/book/

See the [releases] to download just the code of all the code listings that appear in the book.

[releases]: https://github.com/rust-lang/book/releases

## PWA (Progressive Web App)

Ce livre est installable comme application Android (et iOS) grâce à un support PWA ajouté dans `FRENCH/`.

### Fichiers ajoutés

| Fichier | Rôle |
|---|---|
| `FRENCH/src/manifest.json` | Manifeste PWA (icônes, couleurs, mode plein écran) |
| `FRENCH/src/sw.js` | Service worker (cache stale-while-revalidate, offline) |
| `FRENCH/src/icon-192.png` | Icône 192×192 |
| `FRENCH/src/icon-512.png` | Icône 512×512 (aussi utilisée comme maskable) |
| `pwa.js` | Injection du manifest et enregistrement du SW (via `additional-js`) |

### Seule valeur à ajuster si vous renommez le dépôt

**Rien à changer.** Le base path (`/rust-book-fr/`) est auto-détecté depuis l'URL du script `pwa.js`. Les URLs dans `manifest.json` sont relatives, résolues par rapport à l'URL du manifest. Cela fonctionne quelle que soit l'URL de déploiement (sous-répertoire GitHub Pages ou domaine custom).

Si vous souhaitez remplacer les icônes par des icônes personnalisées, remplacez simplement `FRENCH/src/icon-192.png` et `FRENCH/src/icon-512.png` et incrémentez `CACHE_VERSION` dans `FRENCH/src/sw.js` pour invalider le cache des utilisateurs existants.

### Installer l'app (Android Chrome)

1. Ouvrir le site dans Chrome Android
2. Menu ⋮ → "Ajouter à l'écran d'accueil"
3. L'app s'ouvre ensuite en plein écran sans barre d'adresse
4. Les pages déjà visitées sont disponibles hors-ligne

### Vérification après déploiement

Après un push sur la branche de déploiement, GitHub Pages se redéploie automatiquement (quelques minutes). Pour tester :

1. Ouvrir le site dans Chrome DevTools → onglet "Application" → vérifier Manifest et Service Worker
2. Sur mobile : vider le cache Chrome, recharger, puis "Ajouter à l'écran d'accueil"
3. Ouvrir depuis l'écran d'accueil → doit s'ouvrir sans barre d'adresse (display: standalone)

## Requirements

Building the book requires [mdBook], ideally the same version that
rust-lang/rust uses in [this file][rust-mdbook]. To get it:

[mdBook]: https://github.com/rust-lang-nursery/mdBook
[rust-mdbook]: https://github.com/rust-lang/rust/blob/master/src/tools/rustbook/Cargo.toml

```bash
$ cargo install mdbook --vers [version-num]
```

## Building

To build the book, type:

```bash
$ mdbook build
```

The output will be in the `book` subdirectory. To check it out, open it in
your web browser.

_Firefox:_
```bash
$ firefox book/index.html                       # Linux
$ open -a "Firefox" book/index.html             # OS X
$ Start-Process "firefox.exe" .\book\index.html # Windows (PowerShell)
$ start firefox.exe .\book\index.html           # Windows (Cmd)
```

_Chrome:_
```bash
$ google-chrome book/index.html                 # Linux
$ open -a "Google Chrome" book/index.html       # OS X
$ Start-Process "chrome.exe" .\book\index.html  # Windows (PowerShell)
$ start chrome.exe .\book\index.html            # Windows (Cmd)
```

To run the tests:

```bash
$ mdbook test
```

## Contributing

We'd love your help! Please see [CONTRIBUTING.md][contrib] to learn about the
kinds of contributions we're looking for.

[contrib]: https://github.com/rust-lang/book/blob/main/CONTRIBUTING.md

Because the book is [printed](https://nostarch.com/rust), and because we want
to keep the online version of the book close to the print version when
possible, it may take longer than you're used to for us to address your issue
or pull request.

So far, we've been doing a larger revision to coincide with [Rust
Editions](https://doc.rust-lang.org/edition-guide/). Between those larger
revisions, we will only be correcting errors. If your issue or pull request
isn't strictly fixing an error, it might sit until the next time that we're
working on a large revision: expect on the order of months or years. Thank you
for your patience!

### Translations

We'd love help translating the book! See the [Translations] label to join in
efforts that are currently in progress. Open a new issue to start working on
a new language! We're waiting on [mdbook support] for multiple languages
before we merge any in, but feel free to start!

[Translations]: https://github.com/rust-lang/book/issues?q=is%3Aopen+is%3Aissue+label%3ATranslations
[mdbook support]: https://github.com/rust-lang-nursery/mdBook/issues/5

## Spellchecking

To scan source files for spelling errors, you can use the `spellcheck.sh`
script available in the `ci` directory. It needs a dictionary of valid words,
which is provided in `ci/dictionary.txt`. If the script produces a false
positive (say, you used word `BTreeMap` which the script considers invalid),
you need to add this word to `ci/dictionary.txt` (keep the sorted order for
consistency).

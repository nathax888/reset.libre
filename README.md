# Site RESET

Le site de RESET, la méthode d'accompagnement pour sortir de l'addiction.
Site « statique » : de simples fichiers HTML, sans base de données. Hébergement gratuit sur Netlify.

## Où est quoi

| Page | Fichier à modifier |
|---|---|
| Accueil | `index.html` |
| La méthode | `methode/index.html` |
| Mon histoire | `mon-histoire/index.html` |
| Le livre (témoignage en cours d'écriture) | `livre/index.html` |
| Accompagnement | `accompagnement/index.html` |
| Proches | `proches/index.html` |
| Contact | `contact/index.html` |
| Aide urgente | `aide-urgente/index.html` |
| Mentions légales | `mentions-legales/index.html` |
| Confidentialité | `confidentialite/index.html` |
| Page « Merci » (après l'inscription Préviens-moi) | `merci/index.html` |
| Page d'erreur | `404.html` |
| Couleurs, polices, mise en page | `assets/css/style.css` (tout en haut, section `:root`) |
| Menu mobile + fenêtre « Aide urgente » | `assets/js/main.js` |
| Images | `assets/img/` |

## Modifier un texte

1. Ouvre le fichier de la page (sur GitHub : clique sur le fichier, puis sur l'icône crayon ✏️).
2. Cherche la phrase (Ctrl+F / Cmd+F) et remplace-la. Ne touche qu'au texte entre les balises, par exemple
   `<p>Ton texte ici</p>` : change seulement « Ton texte ici ».
3. Enregistre (« Commit changes »). Netlify met le site à jour tout seul en une minute.

Règles de ton du site : tutoiement, « je », phrases courtes, pas de tiret cadratin, pas de promesse de guérison, jamais le mot « ebook ».

## Remplacer les photos

Les photos provisoires sont dans `assets/img/photos/` :

- `nathan-accueil.jpg` : page d'accueil (« Qui je suis »)
- `nathan-histoire.jpg` : haut de la page « Mon histoire »
- `nathan-accompagnement.jpg` : page « Accompagnement »

Pour mettre ta photo : garde **exactement le même nom de fichier** et remplace le fichier (sur GitHub : « Add file » puis « Upload files », dans le dossier `assets/img/photos/`).
Format conseillé : portrait (vertical), environ 900 × 1125 pixels, en JPG, moins de 400 Ko.

Les visuels d'océan (`lever-soleil-ocean.jpg`, `coucher-soleil.jpg`, `ocean-nuit.jpg`, `horizon-doux.jpg`) se remplacent de la même façon, avec de vraies photos au format paysage.

## Le formulaire d'appel (Tally)

Tous les boutons « Réserver mon appel gratuit » mènent à ton formulaire Tally : https://tally.so/r/44M0qY
Si tu changes de formulaire, remplace ce lien partout (rechercher / remplacer dans tous les fichiers).

À régler dans Tally :
- **Notifications email** : Formulaire › Settings › Notifications › « Self email notifications » : active-le pour recevoir chaque réponse par email.
- **Message de confirmation** : Settings › « Thank you page ». Exemple :
  « Merci de m'avoir écrit. Je sais que ce premier pas n'est pas toujours facile. Je lis ton message personnellement et je te recontacte très vite pour fixer notre appel. Nathan »
- **Case de consentement (RGPD, important)** : ajoute une case à cocher obligatoire :
  « J'accepte que Nathan (RESET) utilise ces informations, y compris ce que je partage sur ma situation, pour me recontacter. Voir la politique de confidentialité. » avec un lien vers la page `/confidentialite/` du site.

## Le formulaire « Préviens-moi » (livre, podcast)

C'est un formulaire Netlify Forms (accueil + page Le livre). Le champ « interet » te dit si la personne attend le livre ou le podcast. Les emails arrivent dans ton tableau de bord Netlify :
**Site › Forms › bientot**. Pour les recevoir par email : **Site configuration › Forms › Form notifications › Add notification › Email notification**.

## Voir le site sur ton ordinateur

Il faut un petit serveur local (ouvrir `index.html` en double-cliquant ne suffit pas, les liens ne marcheraient pas).
Dans le Terminal (Mac) ou l'invite de commandes (Windows), dans le dossier du site :

```
python3 -m http.server 8080
```

Puis ouvre http://localhost:8080 dans ton navigateur. Pour arrêter : Ctrl+C.
(Sur Windows, si `python3` n'existe pas, essaie `python -m http.server 8080` ou `py -m http.server 8080`.)

## Mettre en ligne (Netlify)

1. Crée un compte gratuit sur https://app.netlify.com (connexion avec GitHub).
2. « Add new site » › « Import an existing project » › GitHub › choisis le dépôt `reset.libre` et la branche principale.
3. Laisse les réglages par défaut (le fichier `netlify.toml` s'occupe de tout) et clique « Deploy ».
4. Le site est en ligne sur **https://resetlibre.be** (domaine acheté chez one.com, relié à Netlify).
5. Dans « Forms », active la détection des formulaires (« Enable form detection »), puis redéploie une fois.

## Nom de domaine

Le domaine **resetlibre.be** est acheté chez **one.com** et relié à Netlify par deux réglages DNS (one.com › Paramètres avancés › Paramètres DNS) :

| Type | Nom d'hôte | Valeur | TTL |
|---|---|---|---|
| A | (vide) | `75.2.60.5` | 3600 |
| CNAME | `www` | l'adresse `.netlify.app` du projet | 3600 |

Ne supprime pas ces deux lignes, ni les lignes MX (email). Le HTTPS est géré automatiquement par Netlify.
L'adresse du site est écrite dans toutes les pages (balises `canonical` et `og:`), dans `sitemap.xml` et dans `robots.txt`.

## À compléter plus tard

- **Numéro d'entreprise (BCE)** : dès que tu es inscrit comme indépendant, ajoute-le dans `mentions-legales/index.html` (section « Qui édite ce site »), avec ton statut et ta situation TVA.
- **Adresse** : la loi belge demande une adresse géographique complète. Pour l'instant, seule la ville (Namur) est indiquée. Ajoute une adresse complète, ou une adresse de domiciliation, au moment de l'inscription BCE.

Pour vendre la méthode ou facturer l'accompagnement en Belgique, il faut être inscrit comme indépendant (principal ou complémentaire).

## Version anglaise (plus tard)

Prévue dans un dossier `/en/` avec la même structure (ex. `en/method/index.html`). Chaque page a déjà une ligne à décommenter dans le `<head>` (`hreflang="en"`) pour dire à Google que les deux versions vont ensemble.

## Numéros d'aide (Belgique et France)

Vérifiés en septembre 2026. Ils sont à deux endroits : `aide-urgente/index.html` (liste complète) et `assets/js/main.js` (fenêtre rapide, avec un onglet Belgique et un onglet France). Si un numéro change, modifie les deux.

// data.js

// 1) Cartes du carrousel
const cards = [
  {
    id: 'ange',
    title: 'Ange',
    imgUrl: 'https://www.ange-paradis.com/1495/statue-ange-antique.jpg',
    hardMin: 0,
    hardMax: 2,
    hard: 1
  },
  {
    id: 'sfw',
    title: 'SFW',
    imgUrl: 'https://tse1.mm.bing.net/th/id/OIP.MUYaWR8zmKacN0crMzb04QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    hardMin: 1,
    hardMax: 4,
    hard: 2
  },
  {
    id: 'ados',
    title: 'Ados',
    imgUrl: 'https://www.brealsousvitre.fr/wp-content/uploads/2021/03/adolescents.jpg',
    hardMin: 2,
    hardMax: 6,
    hard: 4
  },
  {
    id: 'hard',
    title: 'Hard',
    imgUrl: 'https://th.bing.com/th/id/R.10e7455ef65c83110aecc5d0541d24dd?rik=H3rw313%2b9XUz%2bQ&pid=ImgRaw&r=0https://m.media-amazon.com/images/I/81dVS0CDsUL._AC_SX569_.jpg',
    hardMin: 3,
    hardMax: 8,
    hard: 6
  },
{
    id: 'extreme',
    title: 'Extrême',
    imgUrl: 'https://i.etsystatic.com/44130503/r/il/884238/5044223465/il_794xN.5044223465_7lx8.jpg',
    hardMin: 0,
    hardMax: 11,
    hard: 7
  },
  {
    id: 'nsfw',
    title: 'NSFW',
    imgUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-post-img/2423210/32ceced7a29289f29c9080d9066eaf42/960',
    hardMin: 4,
    hardMax: 11,
    hard: 8
  },
];

// 2) Actions
const actions = [
  {
    id: 'A1',
    text: '{other}, met une chiquette à {player}.',
    genre: 'importe',       // 'homme' | 'femme' | 'importe'
    hard: 1
  },
  {
    id: 'A2',
    text: '{player}, fais un bisou sur la joue de {other}.',
    genre: 'importe',
    hard: 1
  },
  {
    id: 'A3',
    text: '{player}, fais un calin à {other}.',
    genre: 'importe',
    hard: 1
  },
  {
    id: 'A4',
    text: '{{other}, met une fessé à {player}.',
    genre: 'importe',
    hard: 2
  },
  {
    id: 'A5',
    text: '{player}, embrasse le ventre de {other}.',
    genre: 'importe',
    hard: 1
  },
  {
    id: 'A6',
    text: "{player}, tu as les mains attachés dans le dos pendant {number+2} tours les autres peuvent faire ce qu'ils veulent de toi.",
    genre: 'importe',
    hard: 3
  },
  {
    id: 'A7',
    text: '{player}, ferme les yeux, ({other}) vas te faire un bisou tu dois trouver son nom.',
    genre: 'importe',
    hard: 2
  },
  {
    id: 'A8',
    text: '{player} doit retirer tout les vêtements {color} des joueurs de cette partie.',
    genre: 'importe',
    hard: 4
  },
  {
    id: 'A9',
    text: '{player} caresse {other}, elle doit te rendre les même caresses.',
    genre: 'homme',
    hard: 4
  },
  {
    id: 'A10',
    text: "{player}, agis comme l'exclave de {other} pendant {number} tours.",
    genre: 'femme',
    hard: 4
  },
  {
    id: 'A11',
    text: '{player} et {other}, prenez une gorgée.',
    genre: 'importe',
    hard: 5
  },
  {
    id: 'A12',
    text: '{player}, suce un doigt de {other}.',
    genre: 'importe',
    hard: 4
  },
  {
    id: 'A13',
    text: '{player}, agis comme un chien pendant {number} tours.',
    genre: 'importe',
    hard: 6
  },
  {
    id: 'A14',
    text: "{player}, retire un vêtement.",
    genre: 'importe',
    hard: 3
  },
  {
    id: 'A15',
    text: "{player} doit regarder amoureusement {other} ; le premier qui rigole se prend une fessée par l'autre.",
    genre: 'importe',
    hard: 4
  },
  {
    id: 'A16',
    text: '{player}, retire un vêtement.',
    genre: 'importe',
    hard: 2
  },
  {
    id: 'A17',
    text: '{player} doit regarder amoureusement {other} ; le premier qui rigole se prend une fessée par l\'autre.',
    genre: 'importe',
    hard: 3
  },
  {
    id: 'A18',
    text: '{player}, prend une gorgée.',
    genre: 'importe',
    hard: 5
  },
  {
    id: 'A19',
    text: 'Tout le groupe de faire le jeu du pasage de carte de {player} à {other}.',
    genre: 'importe',
    hard: 6
  },
  { 
    id: 'A20',
    text: 'Tout le monde remet ses vêtements.',
    genre: 'importe',
    hard: 4
  },
  {
    id: 'A21',
    text: '{player}, masse {other} pendant {number} tours.',
    genre: 'importe',
    hard: 4
  },
  {
    id: 'A22',
    text: '{player}, doit retirer tous les vêtements de même couleur que son {clothes}.',
    genre: 'importe',
    hard: 2
  },
  {
    id: 'A23',
    text: '{other}, met toi en tailleur, {player} assis toi en tailleur sur lui pendant {number-2} tours.',
    genre: 'importe',
    hard: 5
  },
  {
    id: 'A24',
    text: '{player}, retire le {clothes} de {other} avec uniquement ta bouche.',
    genre: 'femme',
    hard: 7
  },
  {
    id: 'A25',
    text: '{other}, allonge toi face à face sur {player} pendant {number-2} tours.',
    genre: 'importe',
    hard: 8
  },
  {
    id: 'A26',
    text: '{player}, fais un bisou sur la bouche de {other}.',
    genre: 'importe',
    hard: 7
  },
  {
    id: 'A27',
    text: '{player}, simule une fellation avec un objet.',
    genre: 'importe',
    hard: 6
  },
  {
    id: 'A28',
    text: '{player}, échange de pantalon avec {other}.',
    genre: 'importe',
    hard: 7
  },
  {
    id: 'A29',
    text: 'Toutes les personnes du même genre que {player} doivent retirer un vêtement.',
    genre: 'importe',
    hard: 7
  },
  {
    id: 'A30',
    text: 'Toutes les personnes du même genre que {player} doivent retirer leur {clothes}.',
    genre: 'importe',
    hard: 8
  },
  {
    id: 'A29',
    text: 'Toutes les personnes du même genre que {player} doivent boire une gorgée.',
    genre: 'importe',
    hard: 9
  },
  {
    id: 'A30',
    text: '{player}, cache un objet de {other} à lui de te faire une paplpation pour le récupérer',
    genre: 'femme',
    hard: 5
  },
  {
    id: 'A31',
    text: '{player}, met la main sur la cuisse de {other} pendant {number+8} secondes.',
    genre: 'homme',
    hard: 3
  },
  {
    id: 'A32',
    text: '{player}, tu ne peut dire que oui pendant {number+2} tours.',
    genre: 'femme',
    hard: 5
  },
  {
    id: 'A33',
    text: '{player}, met tes mains sous le t-shirt au dessus de la poitrine de {otherf} pendant {number+4} secondes',
    genre: 'importe',
    hard: 5
  },
  {
    id: 'A34',
    text: '{player}, tu dois jouer au jeu de la dame de coeur.',
    genre: 'importe',
    hard: 8
  },
  {
    id: 'A35',
    text: '{player}, retire un sous vêtement.',
    genre: 'importe',
    hard: 9
  },
  {
    id: 'A36',
    text: '{player}, choisis {number} personnes qui remmettent leurs vetements.',
    genre: 'importe',
    hard: 4
  },
  {
    id: 'A37',
    text: '{player}, laisse {other} mettre ses mains sous ton t-shirt.',
    genre: 'importe',
    hard: 7
  },
  {
    id: 'A38',
    text: '{player}, fait du tam-tam avec les fesse de {otherf} si {other} est satisfait, alors tu peux enbrasse {otherf}.',
    genre: 'importe',
    hard: 8
  },
  {
    id: 'A39',
    text: '{player}, retire {number-2} vêtements.',
    genre: 'importe',
    hard: 9
  },
  {
    id: 'A40',
    text: "{player}, avec {other} faites le 69 mais décalé de 25cm vers l'avant pendant {number-1} tours.",
    genre: 'importe',
    hard: 10
  },
  {
    id: 'A41',
    text: '{player}, embrasse {other} goulument pendant {number+4} secondes.',
    genre: 'importe',
    hard: 7
  },
  {
    id: 'A42',
    text: '{player}, embrasse {other} goulument en la carressant pendant {number+2} secondes.',
    genre: 'importe',
    hard: 8
  },
  {
    id: 'A43',
    text: '{player}, simule une position sexuelle avec {other}.',
    genre: 'importe',
    hard: 9
  },
  {
    id: 'A44',
    text: '{player}, guide {other} sa main sur ton corp pendant {number}0 secondes.',
    genre: 'importe',
    hard: 9
  },
  {
    id: 'A45',
    text: "{player}, lèche la nuque de {other} et descend jusqu'à ce qu'il te dise d'aretter.",
    genre: 'importe',
    hard: 7
  },
  {
    id: 'A46',
    text: '{player}, bois un verre, embrasse {other} pour lui faire passer le liquide.',
    genre: 'homme',
    hard: 10
  },
  {
    id: 'A47',
    text: '{player}, choisis une couleur. Les joueurs doivent retirer tous leurs vêtements/sous-vêtements de cette couleur.',
    genre: 'importe',
    hard: 6
  },
  {
    id: 'A48',
    text: '{player}, met un verre entre les seins de {otherf} et bois.',
    genre: 'homme',
    hard: 8
  },
  {
    id: 'A49',
    text: '{player}, laisse {other} poster une story sur ton compte avec une photo de ta galerie principale.',
    genre: 'importe',
    hard: 10
  }
];

// 3) Vérités
const verites = [
  {
    id: 'V1',
    text: "{player}, trouve tu exitant de faire l'amour à coté d'un couple qui fait de même?",
    genre: 'femme'
  },
  {
    id: 'V2',
    text: "{player}, d'après toi qui a la plus grosse?",
    genre: 'importe'
  },
  {
    id: 'V3',
    text: "{player}, d'après toi qui a la plus petite?",
    genre: 'importe'
  },
  {
    id: 'V4',
    text: '{player}, quels sont les positions sexuelles que tu connais en {number} minutes ?',
    genre: 'importe'
  },
  {
    id: 'V5',
    text: "{player}, que pense tu de l'idée que ta partenaire termine en solo si elle n'a pas eu d'orgasme?",
    genre: 'importe'
  },
  {
    id: 'V6',
    text: '{player}, préfère tu que {other} te baise dans une fôret, un ascenseur, une plage ou un cinema?',
    genre: 'importe'
  },
  {
    id: 'V7',
    text: "{player}, accepterait tu d'apparaitre dans un film pour adulte si on ne voyait jamais ton visage?",
    genre: 'importe'
  },
  {
    id: 'V8',
    text: "{player}, aimerais tu que ton partenaire te saisisse le cou quand tu fais l'amour?",
    genre: 'importe'
  },
  {
    id: 'V9',
    text: "{player}, si quelqu’un t’offrait 1 000 000 €, que ferais-tu avec ?",
    genre: 'importe'
  },
  {
    id: 'V10',
    text: '{player}, en faisant le 69 tu préfère être en haut ou en bas?',
    genre: 'importe'
  },
  {
    id: 'V11',
    text: '{player}, quel est le pire mensonge que tu aies dit à {other} ?',
    genre: 'importe'
  },
  {
    id: 'V12',
    text: "{player}, est-ce que tu as déjà essayé de ruiner la relation amoureuse de l’un ou l’une de tes ami(e)s ?",
    genre: 'importe'
  },
  {
    id: 'V13',
    text: "{player}, est-ce que tu as déjà fait quelque chose de bizarre seulement pour te faire remarquer par quelqu’un ?",
    genre: 'importe'
  },
  {
    id: 'V14',
    text: '{player}, préfère tu avaler ou recracher ?',
    genre: 'femme'
  },
  {
    id: 'V15',
    text: "{player}, si tu étais invisible pendant une journée, que ferais-tu ?",
    genre: 'importe'
  },
  {
    id: 'V16',
    text: '{other}, dis tout ce que tu sais sur {player} en 2 minutes ?',
    genre: 'importe'
  },
  {
    id: 'V17',
    text: '{player}, quelle est ta position sexuelle préférée ?',
    genre: 'importe'
  },
  {
    id: 'V18',
    text: '{player}, quelle est la chose illégale que tu ferais si tu pouvais ?',
    genre: 'importe'
  },
  {
    id: 'V19',
    text: "{player}, est-ce que tu as déjà espionné quelqu’un sur internet ?",
    genre: 'importe'
  },
  {
    id: 'V20',
    text: '{player}, est-ce que tu as déjà été infidèle ?',
    genre: 'importe'
  },
  {
    id: 'V21',
    text: '{player}, est-ce que tu as déjà envoyé des photos coquines ?',
    genre: 'importe'
  },
  {
    id: 'V22',
    text: '{player}, quand as-tu regardé des films x pour la dernière fois ?',
    genre: 'importe'
  },
  {
    id: 'V23',
    text: '{player}, combien de films x regardes-tu par semaine ?',
    genre: 'importe'
  },
  {
    id: 'V24',
    text: '{player}, quel est ton plus grand fantasme ?',
    genre: 'importe'
  },
  {
    id: 'V25',
    text: "{player}, aimerais tu voir un ton partenaire faire l'amour avec une autre personnne?",
    genre: 'importe'
  },
  {
    id: 'V26',
    text: "{player}, aimerais tu voir un ton partenaire faire l'amour avec {other}?",
    genre: 'importe'
  },
  {
    id: 'V27',
    text: "{player}, as tu déjà pratiqué l'autofellation?",
    genre: 'importe'
  },
  {
    id: 'V28',
    text: '{player}, avec lequel ou laquelle de tes proches pourrais-tu être en couple ?',
    genre: 'importe'
  },
  {
    id: 'V29',
    text: "{player}, quelle est la chose qui t'as le plus choqué(e)?",
    genre: 'importe'
  },
  {
    id: 'V30',
    text: '{player}, où est-ce que tu préfères être embrassé(e) ?',
    genre: 'importe'
  },
  {
    id: 'V31',
    text: '{player}, quel est ton moment le plus embarrassant ?',
    genre: 'importe'
  },
  {
    id: 'V32',
    text: '{player}, quelle est la chose que personne ne connaît à propos de toi ?',
    genre: 'importe'
  },
  {
    id: 'V33',
    text: '{player}, veux-tu avoir des enfants ? Si oui combien ?',
    genre: 'importe'
  },
  {
    id: 'V34',
    text: '{player}, est-ce que tu préfères dormir nu(e) ou en pyjamas ?',
    genre: 'importe'
  },
  {
    id: 'V35',
    text: "{player}, il te reste 24h à vivre, qu’est-ce que tu fais ?",
    genre: 'importe'
  },
  {
    id: 'V36',
    text: '{player}, raconte-nous un secret de ton enfance.',
    genre: 'importe'
  },
  {
    id: 'V37',
    text: '{player}, as-tu déjà commis un délit ou un crime ?',
    genre: 'importe'
  },
  {
    id: 'V39',
    text: '{player}, quelle est la partie du corps que tu préfères chez toi ?',
    genre: 'importe'
  },
  {
    id: 'V40',
    text: '{player}, as-tu déjà menti sur ton âge, si oui pourquoi ?',
    genre: 'importe'
  },
  {
    id: 'V41',
    text: '{player}, quelle est la première chose que tu regarde quand tu vois une personne du sexe opposé ?',
    genre: 'importe'
  },
  {
    id: 'V42',
    text: '{player}, quel est ton plus grand rêve ?',
    genre: 'importe'
  },
  {
    id: 'V43',
    text: '{player}, quel est ton plus grand regret ?',
    genre: 'importe'
  },
  {
    id: 'V44',
    text: '{player}, quel est ton plus grand accomplissement ?',
    genre: 'importe'
  },
  {
    id: 'V45',
    text: "{player}, quel est le lieu le plus insolite où tu as embrassé quelqu'un ?",
    genre: 'importe'
  },
  {
    id: 'V46',
    text: '{player}, quel est la taille de ton pénis ?',
    genre: 'homme'
  },
  {
    id: 'V47',
    text: '{player}, quel est ton plus grand complexe ?',
    genre: 'homme'
  },
  {
    id: 'V48',
    text: '{player}, veux-tu avoir des enfants ? Combien ?',
    genre: 'importe'
  },
  {
    id: 'V49',
    text: '{player}, quel est le compliment le plus sexy que tu as reçu ?',
    genre: 'importe'
  },
  {
    id: 'V50',
    text: '{player}, as-tu déjà envoyé un sexto ?',
    genre: 'importe'
  },
  {
    id: 'V51',
    text: "{player}, quel est la célébritée avec laquelle tu veux le plus faire l'amour ?",
    genre: 'importe'
  },
  {
    id: 'V52',
    text: "{player}, as tu déjà révé de faire l'amour avec {other} ?",
    genre: 'importe'
  },
  {
    id: 'V53',
    text: "{player}, as tu déjà révé de faire l'amour avec une personne de cette pièce ?",
    genre: 'importe'
  },
  {
    id: 'V54',
    text: "{player}, jusqu'avec combien de personnes pourrais tu faire l'amour?",
    genre: 'importe'
  },
  {
    id: 'V55',
    text: '{player}, possède tu des capotes ?',
    genre: 'importe'
  },
  {
    id: 'V56',
    text: '{player}, quelle est la pire chose que tu as déjà utilisé comme sextoy ?',
    genre: 'importe'
  },
  {
    id: 'V57',
    text: "{player}, as tu ou pourrais tu faire l'amour avec {number+6} personnes?",
    genre: 'importe'
  },
  {
    id: 'V58',
    text: '{player}, pour combien d’argent minimum pourrais tu jouer dans un film x où on voit ta tête?',
    genre: 'importe'
  },
  {
    id: 'V59',
    text: '{player}, dans ce groupe avec qui ferait tu un plan à trois?',
    genre: 'importe'
  },
  {
    id: 'V60',
    text: '{player}, quelle note sur 10 mettrait tu à {other}?',
    genre: 'importe'
  },
  {
    id: 'V61',
    text: '{player}, tu préfère être dominant ou dominé?',
    genre: 'importe'
  },
  {
    id: 'V62',
    text: '{player}, as tu déjà ri du malheur de {other}?',
    genre: 'importe'
  },
  {
    id: 'V63',
    text: '{player}, as tu déjà été ivre?',
    genre: 'importe'
  },
  {
    id: 'V64',
    text: '{player}, as tu déjà participé à des jeu à boire?',
    genre: 'importe'
  },
  {
    id: 'V65',
    text: '{player}, as tu déjà fait un plan à trois?',
    genre: 'importe'
  },
  {
    id: 'V66',
    text: '{player}, es tu déjà allé en boite de nuit?',
    genre: 'importe'
  },
  {
    id: 'V67',
    text: '{player}, as tu déjà pris de la drogue?',
    genre: 'importe'
  },
  {
    id: 'V68',
    text: '{player}, as tu déjà répondu à un appel pendant une masturbation ou un acte sexuel?',
    genre: 'importe'
  },
  {
    id: 'V69',
    text: "{player}, avec combien de personnes maximum as tu déjà fait l'amour?",
    genre: 'importe'
  },
  {
    id: 'V70',
    text: "{player}, avec combien de personnes as tu déjà fait l'amour?",
    genre: 'importe'
  },
  {
    id: 'V71',
    text: "{player}, avec combien de personnes as tu déjà fait l'amour en une semaine?",
    genre: 'importe'
  }, 
  {
    id: 'V72',
    text: "{player}, entre la zoophilie, la nécrophilie et la pédophilie ; lequel t'exite le plus?",
    genre: 'importe'
  },
  {
    id: 'V73',
    text: "{player}, as tu déjà dragué, fais l'amour, ou est tu déjà sorti avec un(e) ami(e) de votre partenaire officiel?",
    genre: 'importe'
  },
  {
    id: 'V74',
    text: "{player}, as tu déjà dragué, fais l'amour, ou est tu déjà sorti avec un(e) ami(e) d'un membre de votre famille?",
    genre: 'importe'
  },
  {
    id: 'V75',
    text: "{player}, as tu déjà proposé ou t'as ton déjà proposé de vendre ton corps?",
    genre: 'importe'
  },
  {
    id: 'V76',
    text: "{player}, as tu déjà vendu ton corps?",
    genre: 'importe'
  },
  {
    id: 'V77',
    text: "{player}, as tu déjà été voyeur?",
    genre: 'importe'
  },
  {
    id: 'V78',
    text: "{player}, as tu déjà posé un lapin?",
    genre: 'importe'
  },
  {
    id: 'V79',
    text: "{player}, quand as tu été le plus proche de te faire choper en te masturbant?",
    genre: 'importe'
  },
  {
    id: 'V80',
    text: "{{player}, consomme tu du hentai?,",
    genre: 'importe'
  },
  {
    id: 'V81',
    text: "{player}, consomme tu du rule 34?",
    genre: 'importe'
  },
  {
    id: 'V82',
    text: "{player}, te pose tu des questions sur la vie sexuelle des personnages de dessins animés?",
    genre: 'importe'
  },
  {
    id: 'V83',
    text: "{player},comment imagine tu ou as tu fais ta première fois ?",
    genre: 'importe'
  },
  {
    id: 'V83',
    text: "{player}, quelle est la chause que tu aime le moins chez {other}?",
    genre: 'importe'
  },
  {
    id: 'V84',
    text: "{player}, pardonnerait tu ton partenaire s'il t'annonce qu'il t'a trompé en soirée parce qu'il avait un peut trop bu?",
    genre: 'importe'
  },
  {
    id: 'V85',
    text: "{player}, combien de fois pense tu pouvoir faire l'amour en une journée?",
    genre: 'importe'
  },
  {
    id: 'V86',
    text: "{player}, de qui es tu amoureux?",
    genre: 'importe'
  },
  {
    id: 'V87',
    text: "{player}, que ferais tu si tu surprenais {other} en train de se masturber?",
    genre: 'importe'
  },
  {
    id: 'V88',
    text: "{player}, si tu devais choisir entre faire l'amour avec une personne de {number+4} ans du plus ou de moins?",
    genre: 'importe'
  },
  {
    id: 'V89',
    text: "{player}, as tu déjà fais un rêve érotique?",
    genre: 'importe'
  },
  {
    id: 'V90',
    text: "{player}, il y a le feu chez toi, tu n'es vêtu que d'une petite serviette; ta voisine {other} te propose de dormir chez toi, que répond tu?",
    genre: 'importe'
  },
  {
    id: 'V91',
    text: "{player}, partage à {otherh} la recette miracle pour donner à {otherf}",
    genre: 'importe'
  },
  {
    id: 'V92',
    text: "{player}, si tu changeais de genre prendrait tu du plaisir à faire l'amour avec une personne du même sexe?",
    genre: 'importe'
  },
  {
    id: 'V93',
    text: "{player}, si tu changeais de genre prendrait tu du plaisir à faire l'amour avec une personne de l'autre sexe?",
    genre: 'importe'
  },
  {
    id:'V94',
    text: "{player}, quelle est la chose la plus bizarre que tu pourrais utiliser comme lubrifiant?",
    genre: 'importe'
  },
  {
    id:'V95',
    text: "{player}, quelle est la chose la plus bizarre que tu pourrais utiliser comme sextoy?",
    genre: 'importe'
  }
];

// 4) Couleurs pour {color}
const colors = [
    "rouge",
    "bleu",
    "vert",
    "noir",
    "blanc",
    "jaune",
    "violet",
    "rose",
    "gris",
    "orange"
];

// 5) Vêtements pour {clothes}
const clothes = [
  'haut',
  'bas'
];

/**
 * Content of the Jouider Bay guide (exported from the published page).
 *
 * Edit texts here. Every text exists in French (fr) and English (en).
 * Asset paths are relative to the `assetBase` prop (default "/jouider-bay", i.e. public/jouider-bay).
 * "\u00a0" is a non-breaking space (French typography before ":", "?", "!" and after "n°").
 * Leave `whatsapp`, `wifi` or `welcome` empty to hide those blocks.
 */
import type { GuideContent } from './types';

export const guideContent: GuideContent = {
  hero: { src: 'photos/hero.jpg', width: 1206, height: 545 },
  logo: { src: 'logos/jouider-bay-couleur.png', width: 760, height: 520 },
  logoWhite: { src: 'logos/jouider-bay-blanc.png', width: 760, height: 520 },
  welcome: { fr: '', en: '' },
  whatsapp: '',
  wifi: {
    name: '',
    password: '',
  },
  arrival: {
    video: { src: 'videos/arrivee.mp4', duration: 25 },
    poster: { src: 'posters/arrivee.jpg', width: 360, height: 640 },
    steps: [
      {
        fr: 'Entrez dans la résidence Casabay par le petit portail n°\u00a01 (en orange sur le plan).',
        en: 'Enter the Casabay residence through the small gate no.\u00a01 (orange on the map).',
        photos: [
          { src: 'photos/portail-n1.jpg', width: 1206, height: 717 },
          { src: 'maps/plan-ilot-b.jpg', width: 1254, height: 1254 },
        ],
      },
      { fr: 'Présentez-vous au gardien.', en: 'Introduce yourself to the guard.' },
      {
        fr: "Rejoignez l'îlot B, immeuble B-15.",
        en: 'Go to block B, building B-15.',
        photos: [{ src: 'photos/entree-b15.jpg', width: 1206, height: 579 }],
      },
      {
        fr: 'Montez au 1er étage\u00a0: appartement n°\u00a03.',
        en: 'Go up to the 1st floor: flat no.\u00a03.',
        photos: [{ src: 'photos/porte-n3.jpg', width: 1206, height: 678 }],
      },
      {
        fr: 'Tapez le code reçu 24 h avant votre arrivée, puis #.',
        en: 'Enter the code you received 24 hours before arrival, then #.',
      },
    ],
    tips: [{ fr: 'Parking gratuit dans la résidence.', en: 'Free parking inside the residence.' }],
    maps: [
      {
        image: { src: 'maps/plan-ilot-b.jpg', width: 1254, height: 1254 },
        title: { fr: "L'îlot B et ses portails", en: 'Block B and its gates' },
        position: '50% 50%',
      },
      {
        image: { src: 'maps/plan-residence.jpg', width: 1186, height: 2576 },
        title: { fr: 'La résidence et la plage', en: 'The residence and the beach' },
        position: '50% 47%',
      },
    ],
  },
  items: [
    {
      id: 'plaque-induction',
      room: 'cuisine',
      title: { fr: 'Plaque induction', en: 'Induction hob' },
      video: { src: 'videos/plaque-induction.mp4', duration: 19 },
      poster: { src: 'posters/plaque-induction.jpg', width: 360, height: 640 },
      steps: [
        { fr: 'Touchez la touche marche, en bas à gauche.', en: 'Touch the power key, bottom left.' },
        {
          fr: 'Choisissez la zone de cuisson avec les touches à 4 points.',
          en: 'Pick the cooking zone with the 4-dot keys.',
        },
        { fr: 'Réglez la puissance avec + et –.', en: 'Set the power with + and –.' },
        { fr: 'Posez la casserole sur la zone.', en: 'Put the pan on the zone.' },
        { fr: 'Pour éteindre, touchez de nouveau la touche marche.', en: 'To switch off, touch the power key again.' },
      ],
      tips: [
        {
          fr: 'Uniquement des casseroles compatibles induction (fond aimanté).',
          en: 'Induction-compatible pans only (magnetic base).',
        },
      ],
    },
    {
      id: 'four',
      room: 'cuisine',
      title: { fr: 'Four', en: 'Oven' },
      video: { src: 'videos/four.mp4', duration: 15 },
      poster: { src: 'posters/four.jpg', width: 360, height: 640 },
      steps: [
        { fr: 'Bouton de gauche\u00a0: choisissez le mode de cuisson.', en: 'Left knob: choose the cooking mode.' },
        { fr: 'Bouton de droite\u00a0: réglez la température.', en: 'Right knob: set the temperature.' },
        { fr: 'Ouvrez la porte et enfournez.', en: 'Open the door and slide your dish in.' },
        { fr: 'Après usage, remettez les deux boutons sur 0.', en: 'When done, turn both knobs back to 0.' },
      ],
      tips: [],
    },
    {
      id: 'lave-linge',
      room: 'cuisine',
      title: { fr: 'Lave-linge', en: 'Washing machine' },
      video: { src: 'videos/lave-linge.mp4', duration: 21 },
      poster: { src: 'posters/lave-linge.jpg', width: 360, height: 640 },
      steps: [
        { fr: 'Ouvrez le hublot et mettez le linge.', en: 'Open the door and load your laundry.' },
        { fr: 'Tirez le bac à lessive, en haut à gauche.', en: 'Pull out the detergent drawer, top left.' },
        { fr: 'Versez la lessive dans le bac, puis refermez-le.', en: 'Pour the detergent in, then close the drawer.' },
        {
          fr: "Tournez le bouton pour choisir le programme (par exemple Quotidien 60').",
          en: "Turn the dial to choose a program (for example Daily 60').",
        },
        { fr: 'Appuyez sur Départ/Pause.', en: 'Press Start/Pause.' },
      ],
      tips: [
        {
          fr: "«\u00a0End\u00a0» s'affiche\u00a0: le lavage est terminé.",
          en: '“End” on the display: the wash is done.',
        },
        { fr: "Rapide 15' convient au linge peu sale.", en: "Quick 15' suits lightly soiled laundry." },
      ],
    },
    {
      id: 'vaisselle',
      room: 'cuisine',
      title: { fr: 'Vaisselle', en: 'Dishes' },
      video: { src: 'videos/vaisselle.mp4', duration: 23 },
      poster: { src: 'posters/vaisselle.jpg', width: 360, height: 640 },
      steps: [
        { fr: 'Les verres\u00a0: étagère du haut.', en: 'Glasses: top shelf.' },
        { fr: 'Théière et verres à thé.', en: 'Teapot and tea glasses.' },
        { fr: 'Saladiers, bols et coupes en verre.', en: 'Glass salad bowls, bowls and cups.' },
        { fr: 'Assiettes, bols et carafe.', en: 'Plates, bowls and carafe.' },
        { fr: 'Grandes assiettes, tasses et mugs.', en: 'Large plates, cups and mugs.' },
        {
          fr: 'Au-dessus de la hotte\u00a0: essoreuse à salade et passoire.',
          en: 'Above the cooker hood: salad spinner and colander.',
        },
        {
          fr: 'Juste en dessous\u00a0: thermos, théières et presse-agrumes.',
          en: 'Just below: thermos, teapots and juicer.',
        },
      ],
      tips: [],
    },
    {
      id: 'barre-de-son',
      room: 'salon',
      title: { fr: 'Barre de son', en: 'Soundbar' },
      video: { src: 'videos/barre-de-son.mp4', duration: 13 },
      poster: { src: 'posters/barre-de-son.jpg', width: 360, height: 640 },
      steps: [
        { fr: 'Touche marche/arrêt\u00a0: allume ou éteint la barre.', en: 'Power key: switches the bar on or off.' },
        { fr: 'Touches – et +\u00a0: le volume.', en: '– and + keys: volume.' },
        {
          fr: 'Pas de son\u00a0? Touche source pour revenir sur la télé.',
          en: 'No sound? Use the source key to switch back to the TV.',
        },
      ],
      tips: [],
    },
    {
      id: 'platine-vinyle',
      room: 'salon',
      title: { fr: 'Platine vinyle', en: 'Record player' },
      video: { src: 'videos/platine-vinyle.mp4', duration: 16 },
      poster: { src: 'posters/platine-vinyle.jpg', width: 360, height: 640 },
      steps: [
        { fr: 'Allumez la platine et réglez le volume.', en: 'Switch the player on and set the volume.' },
        { fr: 'Posez un vinyle sur le plateau.', en: 'Place a record on the platter.' },
        { fr: 'Choisissez la vitesse\u00a0: 33 ou 45 tours.', en: 'Select the speed: 33 or 45 rpm.' },
        {
          fr: 'Soulevez le bras et posez-le doucement au bord du disque.',
          en: 'Lift the arm and gently set it on the edge of the record.',
        },
      ],
      tips: [
        { fr: "Après l'écoute, reposez le bras sur son support.", en: 'When done, put the arm back on its rest.' },
      ],
    },
    {
      id: 'rideaux',
      room: 'salon',
      title: { fr: 'Rideaux', en: 'Curtains' },
      video: { src: 'videos/rideaux.mp4', duration: 13 },
      poster: { src: 'posters/rideaux.jpg', width: 360, height: 640 },
      steps: [
        { fr: 'Le cordon pend sur le côté droit du rideau.', en: 'The cord hangs on the right side of the curtain.' },
        { fr: "Tirez-le vers le bas\u00a0: le rideau s'ouvre.", en: 'Pull it down: the curtain opens.' },
      ],
      tips: [{ fr: "Pour refermer, tirez l'autre brin du cordon.", en: 'To close, pull the other side of the cord.' }],
    },
    {
      id: 'stores-balcon',
      room: 'balcon',
      title: { fr: 'Stores du balcon', en: 'Balcony blinds' },
      video: { src: 'videos/stores-balcon.mp4', duration: 27 },
      poster: { src: 'posters/stores-balcon.jpg', width: 360, height: 640 },
      steps: [
        {
          fr: 'Prenez la télécommande Proteo. Petit bouton de gauche\u00a0: choisissez le canal 1 ou 2.',
          en: 'Take the Proteo remote. Small left button: select channel 1 or 2.',
        },
        { fr: 'Bouton du bas\u00a0: le store descend.', en: 'Bottom button: the blind comes down.' },
        { fr: 'Bouton du milieu\u00a0: stop.', en: 'Middle button: stop.' },
        { fr: 'Bouton du haut\u00a0: le store remonte.', en: 'Top button: the blind goes up.' },
      ],
      tips: [
        {
          fr: 'Le canal 1 et le canal 2 commandent chacun un store.',
          en: 'Channel 1 and channel 2 each control one blind.',
        },
        { fr: 'Vent fort\u00a0? Remontez les stores.', en: 'Strong wind? Retract the blinds.' },
      ],
    },
    {
      id: 'coffre-fort',
      room: 'pratique',
      title: { fr: 'Coffre-fort', en: 'Safe' },
      video: { src: 'videos/coffre-fort.mp4', duration: 23 },
      poster: { src: 'posters/coffre-fort.jpg', width: 360, height: 640 },
      steps: [
        { fr: 'Tapez votre code personnel, puis # (ENTER).', en: 'Enter your personal code, then # (ENTER).' },
        {
          fr: "Le voyant vert s'allume\u00a0: tournez la poignée dans les 5 secondes et ouvrez.",
          en: 'The green light comes on: turn the knob within 5 seconds and open.',
        },
        {
          fr: "Pour fermer\u00a0: porte bien fermée, tournez la poignée jusqu'au verrouillage.",
          en: 'To lock: close the door fully, turn the knob until it locks.',
        },
        {
          fr: "Nouveau code\u00a0: porte ouverte, appuyez sur le bouton rouge RESET (à l'intérieur de la porte). Un bip retentit.",
          en: 'New code: with the door open, press the red RESET button (inside the door). You hear a beep.',
        },
        {
          fr: 'Tapez 3 à 8 chiffres puis #\u00a0: deux bips confirment le nouveau code.',
          en: 'Enter 3 to 8 digits then #: two beeps confirm the new code.',
        },
      ],
      tips: [
        {
          fr: 'Testez plusieurs fois le nouveau code porte ouverte avant de fermer.',
          en: 'Test the new code several times with the door open before closing.',
        },
        {
          fr: 'Au départ\u00a0: videz le coffre et laissez la porte ouverte.',
          en: 'When you leave: empty the safe and leave the door open.',
        },
      ],
    },
    {
      id: 'aspirateur',
      room: 'pratique',
      title: { fr: 'Aspirateur', en: 'Vacuum cleaner' },
      video: { src: 'videos/aspirateur.mp4', duration: 15 },
      poster: { src: 'posters/aspirateur.jpg', width: 360, height: 640 },
      steps: [
        { fr: "Décrochez l'aspirateur de son support mural.", en: 'Lift the vacuum off its wall mount.' },
        { fr: 'Allumez avec le bouton de la poignée.', en: 'Switch on with the button on the handle.' },
        { fr: 'Après usage, videz le réservoir transparent.', en: 'After use, empty the clear dust bin.' },
        {
          fr: "Raccrochez-le sur son support\u00a0: il s'y recharge.",
          en: 'Hang it back on the mount: it charges there.',
        },
      ],
      tips: [],
    },
    {
      id: 'carte-acces',
      room: 'pratique',
      title: { fr: "Carte d'accès", en: 'Access card' },
      video: { src: 'videos/carte-acces.mp4', duration: 15 },
      poster: { src: 'posters/carte-acces.jpg', width: 360, height: 640 },
      steps: [
        {
          fr: "La carte d'accès de la porte extérieure est rangée dans le porte-carte noir, sur le mur à côté du porte-clés.",
          en: 'The access card for the outside door is kept in the black card holder on the wall, next to the key rack.',
        },
        {
          fr: 'Prenez-la avec vous à chaque sortie\u00a0: elle ouvre la porte extérieure.',
          en: 'Take it with you whenever you go out: it opens the outside door.',
        },
      ],
      tips: [{ fr: 'Au départ, remettez-la dans son porte-carte.', en: 'When you leave, put it back in its holder.' }],
    },
  ],
  departure: {
    steps: [
      { fr: 'Videz le coffre-fort et laissez sa porte ouverte.', en: 'Empty the safe and leave its door open.' },
      { fr: "Remettez la carte d'accès dans son porte-carte.", en: 'Put the access card back in its holder.' },
      {
        fr: 'Vérifiez que la plaque et le four sont éteints, boutons sur 0.',
        en: 'Check that the hob and oven are off, knobs at 0.',
      },
      { fr: "Raccrochez l'aspirateur sur son support.", en: 'Hang the vacuum back on its wall mount.' },
    ],
  },
};

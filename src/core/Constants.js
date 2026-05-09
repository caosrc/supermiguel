const GAME_W = 960;
const GAME_H = 540;

const WORLDS = [
    { id: 'cidade',   name: 'Cidade Viva',        color: 0x4A90D9, darkColor: 0x1a3a5c, levels: 10, unlocked: true },
    { id: 'floresta', name: 'Floresta Mágica',     color: 0x2d8a3e, darkColor: 0x0d2a12, levels: 10, unlocked: false },
    { id: 'fazenda',  name: 'Fazenda Feliz',       color: 0xc8a83a, darkColor: 0x5a3a0a, levels: 10, unlocked: false },
    { id: 'cachoeira',name: 'Cachoeira Cristal',   color: 0x00bcd4, darkColor: 0x003a4a, levels: 10, unlocked: false },
    { id: 'escola',   name: 'Escola Aventura',     color: 0xe91e63, darkColor: 0x5a0a1e, levels: 10, unlocked: false },
    { id: 'praia',    name: 'Praia Dourada',       color: 0xf5a623, darkColor: 0x7a3a00, levels: 10, unlocked: false },
    { id: 'espaco',   name: 'Espaço Sideral',      color: 0x7c4dff, darkColor: 0x1a0050, levels: 10, unlocked: false },
    { id: 'doces',    name: 'Terra dos Doces',     color: 0xff4081, darkColor: 0x5a0020, levels: 10, unlocked: false },
    { id: 'medieval', name: 'Reino Medieval',      color: 0x8d6e63, darkColor: 0x2a1a0a, levels: 10, unlocked: false },
    { id: 'sonhos',   name: 'Mundo dos Sonhos',    color: 0xab47bc, darkColor: 0x2a0040, levels: 10, unlocked: false },
];

const KEYS = {
    LEFT:   ['LEFT',  'A'],
    RIGHT:  ['RIGHT', 'D'],
    JUMP:   ['UP',    'W', 'SPACE'],
    ACTION: ['Z',     'ENTER'],
    REWIND: ['R'],
    PAUSE:  ['ESC',   'P'],
    RUN:    ['SHIFT'],
};

const MIGUEL_STATES = {
    IDLE:    'idle',
    WALK:    'walk',
    RUN:     'run',
    JUMP:    'jump',
    FALL:    'fall',
    CROUCH:  'crouch',
    ACTION:  'action',
    REWIND:  'rewind',
    HURT:    'hurt',
    WIN:     'win',
};

const GRAVITY = 900;
const WALK_SPEED  = 200;
const RUN_SPEED   = 340;
const JUMP_FORCE  = -560;
const MAX_REWIND_SECONDS = 5;

const COLORS = {
    SKY_TOP:    0x87ceeb,
    SKY_BOT:    0xc9e8f7,
    GROUND:     0x5a3a1a,
    GRASS:      0x4caf50,
    PLATFORM:   0x795548,
    GOLD:       0xffd700,
    HEART:      0xff4444,
    STAR:       0xffeb3b,
    DIALOG_BG:  0x1a1a2e,
    DIALOG_BD:  0xffd700,
    HUD_BG:     0x000000,
    WHITE:      0xffffff,
    BLACK:      0x000000,
};

const NPC_DIALOGS = {
    pai: [
        "Miguel, lembre-se de sempre beber água!",
        "Filho, comer frutas te deixa mais forte!",
        "Eu te amo, Miguel! Vai com tudo!",
        "Cuide-se, meu herói! O mundo precisa de você!",
    ],
    mae: [
        "Miguel, escove os dentes todos os dias!",
        "Dormir cedo te faz crescer forte e saudável!",
        "Já comeu hoje? A mamãe fez arroz, feijão e fruta!",
        "Você é incrível, meu filho! Sempre acredite em você!",
    ],
    avo: [
        "Na minha época, brincávamos na rua o dia todo!",
        "Respeite os mais velhos, Miguel. A sabedoria vem com os anos.",
        "Uma história antes de dormir deixa os sonhos mais bonitos!",
    ],
    professora: [
        "Muito bem, Miguel! Você está aprendendo rápido!",
        "A educação é o maior tesouro que existe!",
        "Nunca pare de aprender, jovem aventureiro!",
    ],
    amigo: [
        "Vamos jogar bola depois, Miguel?",
        "Você é o melhor jogador que eu conheço!",
        "Amizade é o poder mais forte do mundo!",
    ],
    cachorro: [
        "Au au! (Obrigado por brincar comigo, Miguel!)",
        "Au au au! (Você é meu melhor amigo!)",
    ],
};

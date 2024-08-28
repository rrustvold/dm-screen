import {worg} from "./orcs";


export const goblin = {
    key: "goblin",
    name: "Goblin",
    xp: 50,
    link: "https://www.dndbeyond.com/monsters/16907-goblin"
}

export const goblin_boss = {
    key: "goblin-boss",
    name: "Goblin Boss",
    xp: 200,
    link: "https://www.dndbeyond.com/monsters/17155-goblin-boss",
}

export const hobgoblin = {
    key: "hobgoblin",
    name: "Hobgoblin",
    xp: 100,
    link: "https://www.dndbeyond.com/monsters/16925-hobgoblin"
}

export const hobgoblin_captain ={
    key: "hobgoblin-captain",
    name: "Hobgoblin Captain",
    xp: 700,
    link: "https://www.dndbeyond.com/monsters/17160-hobgoblin-captain",
}

export const bugbear = {
    key: "bugbear",
    name: "Bugbear",
    xp: 200,
    link: "https://www.dndbeyond.com/monsters/16817-bugbear"
}

export const bugbear_chief = {
    key: "bugbear-chief",
    name: "Bugbear Chief",
    xp: 700,
    link: "https://www.dndbeyond.com/monsters/17119-bugbear-chief"
}

export const gnoll = {
    key: "gnoll",
    name: "Gnoll",
    xp: 100
}

export const gnoll_packlord = {
    key: "gnoll-pack-lord",
    name: "Gnoll Pack Lord",
    xp: 450
}

export const gnoll_fang_of_yeenoghu = {
    key: "gnoll-fang-of-yeenoghu",
    name: "Gnoll Fang of Yeenoghu",
    xp: 1100
}

export const hyena = {
    key: "hyena",
    name: "Hyena",
    xp: 10
}

export const gnolls = {
    name: "Gnolls",
    list: [
        gnoll, gnoll, gnoll, gnoll_packlord, gnoll_fang_of_yeenoghu, hyena,
    ]
}
export const goblins = {
    name: "Goblins",
    list: [
        goblin, goblin, goblin, goblin, goblin, goblin_boss, hobgoblin, hobgoblin, hobgoblin, hobgoblin_captain,
        bugbear, bugbear, bugbear_chief, worg, gnoll, gnoll_packlord
    ]
}

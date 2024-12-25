import {ctx} from "./config.js"

export let tree_img = new Image();
tree_img.src = "/pixel-art/PNG/assets/Trees_shadow/Autumn_tree1.png";

export let treeStump = new Image();
treeStump.src = "/pixel-art/PNG/assets/Trees_texture_shadow/Broken_tree3.png"

let myGrass = new Image();
myGrass.src = "/mygrass3.png";
export let grassPattern;
myGrass.onload = () => {grassPattern = ctx.createPattern(myGrass, "no-repeat")};

let dungeonFloor = new Image();
dungeonFloor.src = "/dungeon.jpg";
export let dungeonFloorPattern;
dungeonFloor.onload = () => {dungeonFloorPattern = ctx.createPattern(dungeonFloor, "repeat")};

let badlandsImg = new Image();
badlandsImg.src = "/badlands.png";
export let badlandsPattern;
badlandsImg.onload = () => {badlandsPattern = ctx.createPattern(badlandsImg, "repeat")};

let swampImg = new Image();
swampImg.src = "/swamp.png";
export let swampPattern;
swampImg.onload = () => {swampPattern = ctx.createPattern(swampImg, "repeat")};

let snowyPlanesImg = new Image();
snowyPlanesImg.src = "/snowy-planes.png";
export let snowyPlanesPattern;
snowyPlanesImg.onload = () => {snowyPlanesPattern = ctx.createPattern(snowyPlanesImg, "repeat")};

let arcticImg = new Image();
arcticImg.src = "/arctic.png";
export let arcticPattern;
arcticImg.onload = () => {arcticPattern = ctx.createPattern(arcticImg, "repeat")};

let forestImg = new Image();
forestImg.src = "/forest.png";
export let forestPattern;
forestImg.onload = () => {forestPattern = ctx.createPattern(forestImg, "repeat")};


let cliff = new Image();
cliff.src = "/cliff.png";
export let cliffPattern;
cliff.onload = () => {cliffPattern = ctx.createPattern(cliff, "repeat")};

let cliffHilight = new Image();
cliffHilight.src = "/cliff-hilight.png";
export let cliffHilightPattern;
cliffHilight.onload = () => {cliffHilightPattern = ctx.createPattern(cliffHilight, "repeat")};

let cliffShadow = new Image();
cliffShadow.src = "/cliff-shadow.png";
export let cliffShadowPattern;
cliffShadow.onload = () => {cliffShadowPattern = ctx.createPattern(cliffShadow, "repeat")};

let waterImg = new Image();
waterImg.src = "/water.png";
export let waterPattern;
waterImg.onload = () => {waterPattern = ctx.createPattern(waterImg, "repeat")};

let lavaImg = new Image();
lavaImg.src = "/lava.png";
export let lavaPattern;
lavaImg.onload = () => {lavaPattern = ctx.createPattern(lavaImg, "repeat")};

let northWallImg = new Image();
northWallImg.src = "/north-wall.png";
export let northWallPattern;
northWallImg.onload = () => {northWallPattern = ctx.createPattern(northWallImg, "repeat")};

let eastWallImg = new Image();
eastWallImg.src = "/east-wall.png";
export let eastWallPattern;
eastWallImg.onload = () => {eastWallPattern = ctx.createPattern(eastWallImg, "repeat")};

let southWallImg = new Image();
southWallImg.src = "/south-wall.png";
export let southWallPattern;
southWallImg.onload = () => {southWallPattern = ctx.createPattern(southWallImg, "repeat")};

let westWallImg = new Image();
westWallImg.src = "/west-wall.png";
export let westWallPattern;
westWallImg.onload = () => {westWallPattern = ctx.createPattern(westWallImg, "repeat")};

let treeEdgesImg = new Image();
treeEdgesImg.src = "/tree-sides.png";
export let treeEdgesPattern;
treeEdgesImg.onload = () => {treeEdgesPattern = ctx.createPattern(treeEdgesImg, "repeat")};

export let webImg = new Image();
webImg.src = "/web.png";

export let shieldImg = new Image();
shieldImg.src = "/shield.png";

let dirtImg = new Image();
dirtImg.src = "/dirt.png";
export let dirtPattern;
dirtImg.onload = () => {dirtPattern = ctx.createPattern(dirtImg, "repeat")};

let bridgeDeckImg = new Image();
bridgeDeckImg.src = "/bridge-deck.png";
export let bridgeDeckPattern;
bridgeDeckImg.onload = () =>{bridgeDeckPattern = ctx.createPattern(bridgeDeckImg, "repeat")};

let bivWallImg = new Image();
bivWallImg.src = "/biv-wall.png";
export let bivWallPattern;
bivWallImg.onload = () => {bivWallPattern = ctx.createPattern(bivWallImg, "repeat")};

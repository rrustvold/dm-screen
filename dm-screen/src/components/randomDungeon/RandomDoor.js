import { getRandomThingFromList } from "../../utils";

const hiddenDoors = [
  "The door is hidden in the rectangular wooden panelling covering the walls.",
  "The wainscoting in the room conceals a small door, about halfling- or kobold-sized.",
  "The door is concealed behind one of a number of floor-to-ceiling mirrors fixed to the walls.",
  "A large hanging painting of a pastoral landscape, in a gilded frame, covers the door.",
  "An intricate and allegorical tapestry covers the door.",
  "An image upon the door or whatever conceals it depicts a stylized tiger.",
  "A rotating bookshelf allows access to a secret exit.",
  "A dumbwaiter is concealed behind a sliding panel, opening to a dark shaft.",
  "A narrow opening is revealed when a loose part of the baseboard is removed. Anyone entering the space must crawl to enter.",
  "The walls of this room contain inset pictures, framed by moulding; one slides aside.",
  "The door is hidden by an alternating series of plain and decorative tiles covering the walls.",
  "A large wardrobe, flush to the wall, contains a hidden panel in the back.",
  "The walls of this room are papered with a complex geometrical design, the door fitting unobtrusively in their midst.",
  "The wood panelling along one wall can be opened like an accordion.",
  "A wide section of wall slides freely along a slender, well-oiled track.",
  "A portion of one wall is crudely and messily bricked off, but the masonry is easily broken away.",
  "A ruined and collapsing canopy bed is shoved against the hidden door.",
  "A hole into the room through the back of the fireplace has been clawed out, leading to an adjacent hearth sharing the same chimney.",
  "Though painted to resemble the other walls, this wall is made of canvas stretched on a wooden frame. It is easily cut.",
  "A huge and rusty iron maiden stands here, but has a trick back flush against a gap in the wall, opening once it is closed.",
  "The door is weighted and balanced so even a light tap on it makes it swing open.",
  "The door is concealed behind the hide of a huge predatory cat pinned to the wall.",
  "A panel opens on one of the pilasters framing the room.",
  "A mural of a ruinous and overgrown garden hides a door, cunningly incorporated as an opening under the boughs of two trees.",
  "The trigger for opening the door is a moveable floorboard or tile.",
  "The door fits into the brickwork; only the gaps between the mortaring give away its presence.",
  "The walls of this room are lined with false doors. Two, however, are real.",
  "The door will not remain open unless a heavy counterweight is left on a piece of furniture fixed on the far side of the room.",
  "The door, which slides up, possesses a razor-sharp blade on the opening edge.",
  "By design, constant pressure must be exerted on the trigger for opening the door, or it slams shut.",
  "Built into, or even forming, the concealed door is an enormous, ornate clock. The door only opens at specific times.",
  "Hidden on the side of an ascending staircase is a small triangular door.",
  "The door is concealed in the vaulted ceiling.",
  "The front of a false chest of drawers comes off, revealing a cramped tunnel.",
  "The bookshelf slides backwards from the top, forming a cluttered set of steps.",
  "Moving the rug on the floor reveals a trapdoor.",
  "A cylindrical hole has been cut away behind a large wood settle.",
  "The mechanism opening the hidden door is a complex numerical puzzle or rebus-based riddle that must be physically solved.",
  "The seat of a stone bench set into the wall rises, allowing access to a child-sized passage.",
  "An enormous grotesque mask takes up a large portion of the wall, with a passage revealed through its grinning maw.",
  "A peephole is hidden in the portal.",
  "The door is hidden in the upper part of a floor-to-ceiling bookshelf. A rolling ladder lies broken on the ground.",
  "The enormous and off-key pipe organ here slides to one side if the correct keys are played.",
  "A permanent darkness envelops the door.",
  "By some dweomer, the door is only visible and accessible when one averts one’s eyes. Looking directly causes it to be a blank wall.",
  "The chamber itself – by magic or cunning – changes orientation when the proper actions occur, transposing any doors to different sides of the room."
];


export function randomDoor() {
    function state(){
      let roll = Math.floor(Math.random() * 20) + 1;
      if (roll <= 12){
        return "ajar"
      } else if (roll <= 18) {
        return "closed"
      } else {
        return "closed and stuck"
      }
    }
  
    function barred(){
      let roll = Math.floor(Math.random() * 20) + 1;
      if (roll <= 10){
        return "barred from this side"
      } else {
        return "barred from opposite side"
      }
    }
  
    function barredOrLocked() {
      let roll = Math.floor(Math.random() * 20) + 1;
      if (roll <= 10) {
        return barred()
      } else {
        return "locked"
      }
    }
  
  
    let roll = Math.floor(Math.random() * 20) + 1;
    if (roll <= 10) {
      return `Wooden, ${state()}`;
    } else if (roll <= 12) {
        return `Wooden, ${barredOrLocked()}`;
    } else if (roll == 13) {
        return `Stone, ${state()}`;
    } else if (roll == 14) {
        return `Stone, ${barredOrLocked()}`;
    } else if (roll == 15) {
        return `Iron, ${state()}`;
    } else if (roll == 16) {
        return `Iron, ${state()}`;
    } else if (roll == 17) {
        return `Portcullis, ${state()}`;
    } else if (roll == 18) {
        return "Portcullis, locked in place";
    } else if (roll == 19) {
        return `Secret door, ${getRandomThingFromList(hiddenDoors)}`;
    } else if (roll == 20) {
        return `Secret door, ${barredOrLocked()}, ${getRandomThingFromList(hiddenDoors)}`;
    }
  }
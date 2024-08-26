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
        return "Secret door";
    } else if (roll == 20) {
        return `Secret door, ${barredOrLocked()}`;
    }
  }
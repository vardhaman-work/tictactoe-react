
export const NoneEmpty = (arr) => {
    for(var i=0; i<arr.length; i++) {
      if(arr[i] === "") return false;
    }
    return true;
  }
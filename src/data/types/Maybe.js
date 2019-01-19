class Maybe{
  constructor(val){
    this.value = val;
  }
  of(val){
    return new Maybe(val)
  }
  isNothing(){
    return this.value === null || this.value === undefined;
  }
  map(fn){
    return this.isNothing() ? new Maybe(null) : new Maybe(fn(this.value))
  }
  val(){
    return this.isNothing() ? "" : this.value;
  }
}

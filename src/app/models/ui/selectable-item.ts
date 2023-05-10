export class SelectableItem<Type> {
  selected: boolean = false;
  value: Type;

  constructor(value: Type) {
    this.value = value;
  }
}

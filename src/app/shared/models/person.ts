export class Person {
    private nickname?: string;
  
    public getNickname(): string {
      return this.nickname!;
    }
  
    public setNickname(value: string) {
      this.nickname = value;
    }
  }
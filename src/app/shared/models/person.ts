export class Person {
    private static nickname: string;
  
    public static get Nickname(): string {
      return this.nickname;
    }
  
    public static set Nickname(value: string) {
      this.nickname = value;
    }
  }
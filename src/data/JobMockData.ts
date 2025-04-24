import { faker } from "@faker-js/faker";

export type Job = {
  name: string;
  age: number;
  nickname: string;
  employee: boolean;
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Job => {
  return {
    name: faker.person.jobTitle(),
    age: faker.number.int(40),
    nickname: faker.person.fullName(),
    employee: faker.datatype.boolean(),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Job[] => {
    const len = lens[depth]!;
    return range(len).map((): Job => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}

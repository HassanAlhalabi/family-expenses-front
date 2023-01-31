import { ReactNode } from "react";

interface ITable<TItem> {
  items: TItem[],
  renderItem: (item: TItem ) => ReactNode;
}

const Table = <TItem,>(props: ITable<TItem>) => {
  return <>
          {props.items.map(item => {
            return props.renderItem(item);
          })}
        </>
}
const getDeepValue = <
                      TObj,
                      TFKEy extends keyof TObj,
                      TLKey extends keyof TObj[TFKEy] >(
  obj: TObj,
  firstKey: TFKEy ,
  lastKey: TLKey
) => {
  return obj[firstKey][lastKey];
}

const o = {
  foo: {
    a: true,
    b: 2
  }, 
  bar: {
    c: "12",
    d: 18
  }
}

const value = getDeepValue(o,"foo",'a');

type Animal = {
  name: string
}

type Human = {
  fName: string,
  lName: string
}

type GetRequiredInformation<TType> = TType extends Animal ? string : number;

export type RequiredInformationForAnimal = GetRequiredInformation<Animal>;

export type RequiredInformationForHuman = GetRequiredInformation<Human>;

const Footer = () => {
  return (
    <div>
      
    </div>
  )
}

export default Footer

import fs from "fs";
import path from "path";
import inquirer from "inquirer";

const componentString = `import style from "./PrimaryTest.scss";

// 컴포넌트 사용시 받아올 값을 여기에 명시합니다.
export interface IPrimaryTestProps {
  // 문자열 예시
  name: string;

  // 숫자 예시
  // age: number;
}

// 리액트 컴포넌트 코드를 여기에 입력합니다.
const PrimaryTest = (props: IPrimaryTestProps) => {
  // 자바스크립트 코드가 여기에 입력됩니다.

  // HTML + React 코드가 여기 입력됩니다.
  return (
    <>
      <div className="primaryTest">
        <div>{props.name}</div>
      </div>

      {/* SCSS 스타일 파일 주입을 위한 코드입니다. 수정 X */}
      <style jsx>{style}</style>
    </>
  );
};

export default PrimaryTest;
`;

const styleString = `.primaryTest {
  background-color: white;
  border-radius: 3px;
  padding: 12px;
  color: black;
}
`;

const demoString = `import { demo } from "frontbook-react";

export default demo({
  // * 컴포넌트가 패널로 보여질 가로 크기입니다. (최대 크기는 12입니다.)
  w: 6,

  // * 컴포넌트가 패널로 보여질 세로크기입니다.
  h: 6,

  // * 컴포넌트 Props 들을 명시하는 공간입니다.
  controls: {
    // * 문자열 예시
    name: {
      type: "string",
      defaultValue: "default name?",
    },

    // * 숫자 예시
    // age: {
    //   type: "number",
    //   defaultValue: 0,
    // }

    // * 선택 가능한 문자열 예시
    // language: {
    //   type: "select",
    //   defaultValue: {
    //     defaultValue: "English",
    //     selectableValues: ["English", "Korean"],
    //   },
    // },
  },

  renderProps: (props) => {
    // (고급) 여기서 Props 를 중간에 자바스크립트로 바꿀 수 있습니다.
    return props;
  },
});
`;

const createNewComponent = async () => {
  // request user input of component name
  const { componentName } = await inquirer.prompt([
    {
      type: "input",
      name: "componentName",
      message: "생성할 컴포넌트 명을 입력해주세요. (예: PrimaryButton)",
    },
  ]);

  const componentFilePath = path.resolve(
    process.cwd(),
    "component",
    `${componentName}.tsx`
  );
  const styleFilePath = path.resolve(
    process.cwd(),
    "component",
    `${componentName}.scss`
  );
  const demoFilePath = path.resolve(
    process.cwd(),
    "component",
    `${componentName}.demo.tsx`
  );

  fs.writeFileSync(
    componentFilePath,
    componentString
      .replace(/PrimaryTest/g, componentName)
      .replace(/primaryTest/g, toCamelCase(componentName))
  );

  fs.writeFileSync(
    styleFilePath,
    styleString
      .replace(/PrimaryTest/g, componentName)
      .replace(/primaryTest/g, toCamelCase(componentName))
  );

  fs.writeFileSync(
    demoFilePath,
    demoString
      .replace(/PrimaryTest/g, componentName)
      .replace(/primaryTest/g, toCamelCase(componentName))
  );
};

const toCamelCase = (str: string) => str[0].toLowerCase() + str.substring(1);

createNewComponent();

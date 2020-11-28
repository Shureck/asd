import React from 'react';
import {Button, ConfigProvider, DatePicker, Divider, Form, Checkbox, InputNumber} from 'antd';
import CitySelector from "@/components/CitySelector";
import ruRU from 'antd/lib/locale/ru_RU';
import moment from "moment";
import {mutate} from "@/gqlWrapper";
import {default as _fieldMap} from "../fieldMap.json";
interface IFieldMap {
  subIndexName: string,
  indicators: {
    name: string,
    params: {
      key: number,
      name: string,
      type: "binary" | "number",
      max?: number,
      step?: number
    }[]
  }[]
}

const fieldMap: IFieldMap[] = _fieldMap;

console.log("fieldMap", fieldMap);

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};
const format = (values: any) => {
  values["profilingDate"] = values["profilingDate"]?.format(moment.HTML5_FMT.DATE)
  let ret = '{';
  ret += Object.keys(values).filter(it => values[it] !== undefined).map(it => {
    if (values[it] === true) {
      values[it] = 1;
    } else if (values[it] === false) {
      values[it] = 0;
    }
    return `${it}: ${JSON.stringify(values[it])}`;
  }).join(",\n");
  ret += '}';
  return ret;
}
const onFinish = (values: any) => {
  console.log('Success:', values);
  mutate(`mutation {
    createDatum(input: {datum: ${format(values)}) {
      datum {
        id
      }
    }
  }`);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
  // mutate(`mutation {
  //   createDatum(input: {datum: ${format(errorInfo.values)}}) {
  //     datum {
  //       id
  //     }
  //   }
  // }`);
};


export default class Profile extends React.Component {
  public render() {
    return (
      <div style={{margin: 24}}>
        <ConfigProvider locale={ruRU}>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{profilingDate: moment()}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Город"
              name="cityId"
              rules={[{required: true}]}
            >
              <CitySelector/>
            </Form.Item>
            <Form.Item
              label="Дата заполнения"
              name="profilingDate"
              rules={[{required: true}]}
            >
              <DatePicker/>
            </Form.Item>
            {fieldMap.map(subIndex => (<>
              <Divider>{subIndex.subIndexName}</Divider>
              {subIndex.indicators.map(indicator => (<>
                <Divider dashed={true} plain={true}>{indicator.name}</Divider>
                {indicator.params.map(param => (
                  <Form.Item
                    label={param.name}
                    name={`c${param.key}`}
                    rules={param.type == "binary" ? [] : [{required: true}]}
                    valuePropName={param.type == "binary" ? "checked" : "value"}
                  >
                    {param.type == "binary" ? <Checkbox/> : <InputNumber min={0} max={param.max} step={param.step}/>}
                  </Form.Item>
                ))}
              </>))}
            </>))}
            {/*<Form.Item {...tailLayout} name="remember" valuePropName="checked">*/}
            {/*  <Checkbox>Remember me</Checkbox>*/}
            {/*</Form.Item>*/}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>

          </Form>
        </ConfigProvider>
      </div>
    );
  }
}

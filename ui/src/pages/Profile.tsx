import React from 'react';
import {Button, ConfigProvider, DatePicker, Form, Input, Checkbox, InputNumber} from 'antd';
import CitySelector from "@/components/CitySelector";
import ruRU from 'antd/lib/locale/ru_RU';
import moment, {Moment} from "moment";
import {mutate} from "@/gqlWrapper";

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
    if(values[it] === true) {
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
            <Form.Item
              label="Наличие цифровой платформы вовлечения граждан в решение вопросов городского развития"
              name="c1"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Количество уникальных активных пользователей цифровой платформы вовлечения граждан в решение вопросов городского развития (совершивших хотя бы 1 активное действие за последний год) на 10 тыс. человек населения города"
              name="c2"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие «цифрового двойника города»"
              name="c3"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Наличие интеллектуального центра городского управления"
              name="c4"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Доля городских служб, обладающих доступом к интеллектуальному центру городского управления"
              name="c5"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие энергоэффективного городского освещения, включая архитектурную и художественную подсветку"
              name="c6"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Отношение количества уличных опор освещения города, которые охвачены энергоэффективными интеллектуальными системами освещения, к общему количеству уличных опор освещения города"
              name="c7"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие автоматизированного контроля за выполнением работ дорожной и коммунальной техники"
              name="c8"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Наличие автоматизированной системы аренды и проката («шеринг»)"
              name="c9"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Наличие публичных Wi-Fi сетей"
              name="c10"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Доля мест массового скопления людей и социально-значимых объектов, оборудованных бесплатным доступом к сети Wi-Fi со скоростью не менее 1 Мбит/секунду на 1 пользователя"
              name="c11"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Число преступлений, совершенных на территории городских земель, на 10 тыс. человек населения города"
              name="c12"
              rules={[{required: true}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Наличие системы интеллектуального видеонаблюдения"
              name="c13"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Количество интеллектуальных камер видеонаблюдения, установленных в городе и интегрированных в единую систему, по отношению к площади городских земель"
              name="c14"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Доля преступлений, раскрытых с помощью систем интеллектуального видеонаблюдения с функциями биометрической идентификации и видеоаналитики"
              name="c15"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие системы оповещения граждан о возникновении чрезвычайных ситуаций через мобильные средства связи"
              name="c16"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Процент городского покрытия сетями связи 4G"
              name="c17"
              rules={[{required: true}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Наличие системы интеллектуального учета коммунальных ресурсов"
              name="c18"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Доля многоквартирных домов, оснащенных интеллектуальными системами учета всех типов коммунальных ресурсов"
              name="c19"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие автоматических систем мониторинга состояния зданий, в том числе, уровня шума, температуры, исправности лифтового оборудования, систем противопожарной безопасности и газового оборудования"
              name="c20"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Доля многоквартирных домов, оснащенных автоматическими системами мониторинга состояния зданий"
              name="c21"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Проведение общих собраний собственников помещений в многоквартирных домах (не менее 50%) посредством электронного голосования"
              name="c22"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Количество дорожно-транспортных происшествий в городе на 10 тыс. человек населения города"
              name="c23"
              rules={[{required: true}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Уровень загруженности дорог"
              name="c24"
              rules={[{required: true}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Наличие системы автоматической фото-видео-фиксации нарушений правил дорожного движения"
              name="c25"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Доля зафиксированных нарушений правил дорожного движения с применением камер видеонаблюдения высокой четкости"
              name="c26"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие системы администрирования городского парковочного пространства"
              name="c27"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Наличие интеллектуального управления городским общественным транспортом"
              name="c28"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Наличие системы интеллектуального управления движением"
              name="c29"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Доля светофоров, расположенных на территории городских земель и подключенных к системе интеллектуального управления движением"
              name="c30"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие безопасных и комфортных мест ожидания общественного транспорта"
              name="c31"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Доля «умных» мест ожидания общественного транспорта на территории городских земель"
              name="c32"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие системы мониторинга состояния дорожного полотна"
              name="c33"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Наличие автоматизированной системы управления обращения с твердыми коммунальными отходами"
              name="c34"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Наличие системы онлайн-мониторинга атмосферного воздуха"
              name="c35"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Число станций мониторинга атмосферного воздуха, интегрированных в единую систему онлайн-мониторинга в режиме реального времени, относительно площади городских земель"
              name="c36"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие системы онлайн-мониторинга воды"
              name="c37"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Наличие электронных карт жителя города и гостя города"
              name="c38"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Количество уникальных активных пользователей электронных карт жителя города (совершивших хотя бы 1 действие) на 10 тыс. человек населения города"
              name="c39"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие комплексной системы информирования туристов и жителей города"
              name="c40"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Количество просмотров онлайн-портала города на 10 тыс. человек населения города"
              name="c41"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие цифровых услуг в школах, предоставляемых учащимся и их родителям"
              name="c42"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Доля школ города, использующих систему электронных карт школьников и/ или интеллектуальных систем для прохода в учебное заведение и/ или оплаты питания"
              name="c43"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Наличие цифровых сервисов, упрощающих процесс обращения в медицинские учреждения"
              name="c44"
              rules={[{required: true}]}
              valuePropName="checked"
            >
              <Checkbox/>
            </Form.Item>
            <Form.Item
              label="Доля медицинских учреждений в черте города, предоставляющих услуги по электронной записи и ведению цифровых карточек пациентов"
              name="c45"
              rules={[{required: true}]}
            >
              <InputNumber min={0} step={0.1}/>
            </Form.Item>
            <Form.Item
              label="Количество товаров и услуг, доступных через электронные торговые площадки на 10 тыс. человек населения города"
              name="c46"
              rules={[{required: true}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Количество товаров и услуг, доступных через электронные торговые площадки на 10 тыс. человек населения города"
              name="c47"
              rules={[{required: true}]}
            >
              <Input/>
            </Form.Item>
            {/*<Form.Item {...tailLayout} name="remember" valuePropName="checked">*/}
            {/*  <Checkbox>Remember me</Checkbox>*/}
            {/*</Form.Item>*/}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>
        </ConfigProvider>
      </div>
    );
  }
}

import React from "react";
import {ICity} from "@/types";
import {query} from "@/gqlWrapper";
import {Select} from "antd";

export default class CitySelector extends React.Component<{
  value?: string,
  onChange?(value: string): void
}, {
  allCities: ICity[]
}> {
  public async componentDidMount() {
    const allCities = await query<ICity[]>(`{
      allCities {
        nodes {
          id
          name
        }
      }
    }`, 2);

    this.setState({allCities});
  }

  public render() {
    return (
      <Select {...this.props}>
        {this.state?.allCities?.map(it => <Select.Option key={it.id} value={it.id}>{it.name}</Select.Option>)}
      </Select>
    );
  }
}

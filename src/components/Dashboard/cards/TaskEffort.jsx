import React, {useEffect, useState} from 'react';

import {ApiClient, useTranslation} from 'adminjs';
import {H5,Text} from '@adminjs/design-system';
import { Chart } from 'react-google-charts';

import _ from 'lodash';

import {Card} from '../styles';

/*const data = [
  [
    { 
      type: 'date',
      id: 'date',
    },
    { 
      type: 'number',
      id: 'Won/Loss',
    },
  ],
  [new Date(2022, 3, 13), 37032],
  [new Date(2022, 3, 14), 38024],
  [new Date(2022, 3, 15), 38024],
  [new Date(2022, 3, 16), 38108],
  [new Date(2022, 3, 17), 38229],
];*/

const api = new ApiClient();

const makeChartData = (records) => {
  if(records.length == 0) return; 
  
  const values = _.groupBy(records, (record) => {
    const dateParsed = new Date(record.params.due_date.toString());

    return new Date(
      dateParsed.getFullYear(),
      dateParsed.getMonth(),
      dateParsed.getDate(),
    );
  });
  
  const data = _.map(values, (value, key) => {
    const sum = _.sumBy(value, (v)=> v.params.effort || 0
    );
    return [new Date(key), sum]
  });
  const result = [
    [
      { 
        type: 'date',
        id: 'Data',
      },
      { 
        type: 'number',
        id: 'Esforço',
      },
    ],
    ...data,
  ]; 

  return result;
}

export default function TaskEffort(){
  const { translateMessage } = useTranslation();

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await api.resourceAction(
        {
          resourceId: "tasks",
          actionName: "list",
        }
      );
      
      setChartData(makeChartData(response.data.records));
      setIsEmpty(response.data.records.lenght == 0);
      setLoading(false);
    })();
  }, [])

  if(loading) {
    return (<></>);
  }

  return(
    <Card as="a" href="admin/resources/tasks">
      <Text textAlign="center">
        <H5 mt="lg">{translateMessage("taskEffortCardTitle")}</H5>
        {isEmpty ? (<Text>Sem Tarefas</Text>) : (
          <Chart 
          chartType="Calendar"
          data={chartData}
          width="100%"
          height="100%"
        />
        )}  
      </Text>
    </Card>
  );
};
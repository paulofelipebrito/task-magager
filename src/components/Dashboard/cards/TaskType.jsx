import React, {useEffect, useState} from 'react';
import {ApiClient, useTranslation} from 'adminjs';
import {H5,Text} from '@adminjs/design-system';
import { Chart } from 'react-google-charts';
import _ from 'lodash';

import {Card} from '../styles';

//[Backlog, 1]
//[Doing, 10]
//[Approved, 2]

/*const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Sleep", 7],
];*/

const api = new ApiClient();

const makeChartData = (records) => {
  if(records.length == 0) return; 
  const status = {
    backlog: "Backlog",
    doing: "Em Execução",
    done: "Pronto",
    approved: "Aprovado",
    rejected: "Rejeitado",
  };
  
  const values = _.groupBy(records, (record) => record.params.status);
  
  const data = _.map(status, (value, key) => [
    value,
    values[key]?.length || 0
  ]);
  
  return [
    ['Tipo de tarefa', "Quantidade"],
    ...data
  ]
}

export default function TaskType(){
  const { translateMessage } = useTranslation();

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(()=>{
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
  },[]);

  if(loading) {
    return (<></>);
  }

  return(
    <Card as="a" href="admin/resources/tasks">
      <Text textAlign="center">
        <H5 mt="lg">{translateMessage("taskTypeCardTitle")}</H5>
        {isEmpty ? (<Text>Sem Tarefas</Text>) : (
          <Chart
          chartType="PieChart"
          data={chartData}
          width={"100%"}
          height={"100%"}
        />
        )}     
        
      </Text>
    </Card>
  );
};
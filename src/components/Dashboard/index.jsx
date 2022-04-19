import { ApiClient } from "adminjs";
import React, {useEffect, useState} from 'react';
import {Box,H2,Text} from '@adminjs/design-system';

const api = new ApiClient();

export default function Dashboard(){
  const[data, setData] = useState({});

  useEffect(() => {
    api.getDashboard().then((response) => {
      setData(response.data);
    });
  }, []);

  return(
    <Box>
      <Text>Dashboard</Text>
    </Box>
  );
}
import React, { useEffect } from 'react'
import { Space } from 'antd';
import { useDebounceValue } from 'usehooks-ts';
import ninjaFetch from '../../utils/ninjaFetch';
import weatherFetch from '../../utils/weatherFetch';
import SearchBar from '../features/SearchBar';
import { useGlobalSearch } from '../../stores/globalStore';
import DContainer from '../ui/DContainer';
import CurrentPlaceInfo from '../features/CurrentPlaceInfo';

export default function Home(): JSX.Element {

  const [search, setSearch] = useGlobalSearch();
  const searchDebounced = useDebounceValue(search, 500);

  useEffect(() => {

  }, [searchDebounced])

  useEffect(() => {
    ninjaFetch('/geocoding?city=London')
      .then((res) => res.json())
      .then(console.log)
      .catch(console.log);

    weatherFetch('/marine.json?q=40.71,-74.01&days=1')
      .then((res) => res.json())
      .then(console.log)
      .catch(console.log);
  }, []);

  return (
    <DContainer className="home-page">
      <SearchBar />
      <CurrentPlaceInfo />
    </DContainer>
  )
}

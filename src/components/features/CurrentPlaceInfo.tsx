import React from 'react';
import { Carousel } from 'antd';
import { useGlobalCurrentPlaceInfo } from '../../stores/globalStore';
import chunkBy from '../../utils/chunkBy';

export default function CurrentPlaceInfo(): JSX.Element {
  const [currentPlaceInfo] = useGlobalCurrentPlaceInfo();

  const forecast = currentPlaceInfo?.forecast.forecastday[0] ?? null;

  return (
    <div>
      <pre>
        {!currentPlaceInfo && <div className="text-center">Search place to see information about weather</div>}
        {currentPlaceInfo && (
          <>
            <div>
              <div className='current-place-info-condition'>
                <img className="current-place-info-condition-image" src={currentPlaceInfo.current.condition.icon} alt={currentPlaceInfo.current.condition.text} />
                <div>condition: {currentPlaceInfo.current.condition.text}</div>
                <div>last updated: {currentPlaceInfo.current.last_updated}</div>
              </div>
              <div>Country: {currentPlaceInfo.location.name}</div>
              <div>Region: {currentPlaceInfo.location.region}</div>
              <div>Country: {currentPlaceInfo.location.country}</div>
              <div>[lat, lon]: [{currentPlaceInfo.location.lat},{currentPlaceInfo.location.lon}]</div>
              <div>Local time: {currentPlaceInfo.location.localtime}</div>
              <div>Wind: {currentPlaceInfo.current.wind_mph} m/s</div>
              <div>Temperature: {currentPlaceInfo.current.temp_c} °C</div>
              <div>Humidity: {currentPlaceInfo.current.humidity} %</div>
              <div>Pressure: {currentPlaceInfo.current.pressure_mb} millibars</div>
              <div>Ultra violet: {currentPlaceInfo.current.uv}</div>
              <div>Is Day: {currentPlaceInfo.current.is_day ? 'Yes' : 'No'}</div>
            </div>

            {forecast && (
              <Carousel dotPosition="bottom" className="current-place-info-hours-carousel" arrows>
                {chunkBy(forecast.hour, 3).map((hourSlice) => (
                  <div key={hourSlice[0].time_epoch} className="current-place-info-hours-carousel-chunk">
                    {hourSlice.map((hour) => (
                      <div className="current-place-carousel-chunk-item">
                        <img style={{ margin: 'auto' }} src={hour.condition.icon} alt={hour.condition.text} />
                        <div className="current-place-time">
                          {hour.time.replace(/^.*\s/, '')}
                        </div>
                        <div className="text-center text-bold">{hour.condition.text}</div>
                        <div>Humidity: {hour.humidity} %</div>
                        <div>Temperature: {hour.temp_c} °C</div>
                        <div>Heat index: {hour.heatindex_c} °C</div>
                        <div>Pressure: {hour.pressure_mb} mb</div>
                        <div>Change of rain: {hour.chance_of_rain} %</div>
                        <div>Change of snow: {hour.chance_of_snow} %</div>
                      </div>
                    ))}
                  </div>
                ))}
              </Carousel>
            )}
          </>
        )}

      </pre>
    </div>
  );
}
